const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult, query } = require('express-validator');
const { promisePool } = require('../config/database');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Add video to user's collection
router.post('/', [
  authenticateToken,
  body('videoUrl').isURL().withMessage('Valid video URL is required'),
  body('videoTitle').optional().isLength({ max: 300 }),
  body('videoDescription').optional().isLength({ max: 1000 }),
  body('platform').optional().isLength({ max: 50 }),
  body('duration').optional().isInt({ min: 0 }),
  body('thumbnailUrl').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { 
      videoUrl, 
      videoTitle, 
      videoDescription, 
      platform, 
      duration, 
      thumbnailUrl 
    } = req.body;

    // Check if video already exists for this user
    const [existingVideos] = await promisePool.execute(
      'SELECT id FROM user_videos WHERE user_id = ? AND video_url = ?',
      [req.user.userId, videoUrl]
    );

    if (existingVideos.length > 0) {
      return res.status(409).json({ 
        error: 'Video already exists',
        message: 'This video is already in your collection' 
      });
    }

    // Insert new video
    const [result] = await promisePool.execute(
      `INSERT INTO user_videos 
       (user_id, video_url, video_title, video_description, platform, duration, thumbnail_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.userId, 
        videoUrl, 
        videoTitle || null, 
        videoDescription || null, 
        platform || null, 
        duration || 0, 
        thumbnailUrl || null
      ]
    );

    res.status(201).json({
      message: 'Video added successfully',
      videoId: result.insertId
    });

  } catch (error) {
    console.error('Add video error:', error);
    res.status(500).json({ error: 'Failed to add video' });
  }
});

// Get user's videos with filtering and pagination
router.get('/', [
  authenticateToken,
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('platform').optional(),
  query('favorites').optional().isBoolean(),
  query('search').optional(),
  query('sortBy').optional().isIn(['created_at', 'last_watched', 'video_title', 'watch_time']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const platform = req.query.platform;
    const favoritesOnly = req.query.favorites === 'true';
    const search = req.query.search;
    const sortBy = req.query.sortBy || 'created_at';
    const sortOrder = req.query.sortOrder || 'desc';

    // Build WHERE clause
    let whereConditions = ['user_id = ?'];
    let queryParams = [req.user.userId];

    if (platform) {
      whereConditions.push('platform = ?');
      queryParams.push(platform);
    }

    if (favoritesOnly) {
      whereConditions.push('is_favorite = true');
    }

    if (search) {
      whereConditions.push('(video_title LIKE ? OR video_description LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const [countResult] = await promisePool.execute(
      `SELECT COUNT(*) as total FROM user_videos WHERE ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;

    // Get videos
    const [videos] = await promisePool.execute(
      `SELECT id, video_url, video_title, video_description, platform, duration,
              watch_time, watch_percentage, is_favorite, is_watched, thumbnail_url,
              last_watched, created_at
       FROM user_videos 
       WHERE ${whereClause}
       ORDER BY ${sortBy} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    res.json({
      videos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Failed to get videos' });
  }
});

// Update video progress/status
router.put('/:videoId', [
  authenticateToken,
  body('watchTime').optional().isInt({ min: 0 }),
  body('watchPercentage').optional().isFloat({ min: 0, max: 100 }),
  body('isFavorite').optional().isBoolean(),
  body('isWatched').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { watchTime, watchPercentage, isFavorite, isWatched } = req.body;
    const videoId = req.params.videoId;

    // Verify video belongs to user
    const [videos] = await promisePool.execute(
      'SELECT id FROM user_videos WHERE id = ? AND user_id = ?',
      [videoId, req.user.userId]
    );

    if (videos.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Update video
    await promisePool.execute(
      `UPDATE user_videos 
       SET watch_time = COALESCE(?, watch_time),
           watch_percentage = COALESCE(?, watch_percentage),
           is_favorite = COALESCE(?, is_favorite),
           is_watched = COALESCE(?, is_watched),
           last_watched = CASE WHEN ? IS NOT NULL THEN NOW() ELSE last_watched END,
           updated_at = NOW()
       WHERE id = ?`,
      [watchTime, watchPercentage, isFavorite, isWatched, watchTime, videoId]
    );

    res.json({ message: 'Video updated successfully' });

  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// Delete video from user's collection
router.delete('/:videoId', authenticateToken, async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // Verify video belongs to user and delete
    const [result] = await promisePool.execute(
      'DELETE FROM user_videos WHERE id = ? AND user_id = ?',
      [videoId, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });

  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// Track video analytics
router.post('/analytics', [
  authenticateToken,
  body('videoUrl').isURL().withMessage('Valid video URL is required'),
  body('platform').optional().isLength({ max: 50 }),
  body('actionType').isIn(['play', 'pause', 'seek', 'complete', 'share']),
  body('timestampPosition').optional().isInt({ min: 0 }),
  body('sessionDuration').optional().isInt({ min: 0 }),
  body('deviceType').optional().isLength({ max: 50 }),
  body('browserInfo').optional().isLength({ max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { 
      videoUrl, 
      platform, 
      actionType, 
      timestampPosition, 
      sessionDuration, 
      deviceType, 
      browserInfo 
    } = req.body;

    await promisePool.execute(
      `INSERT INTO video_analytics 
       (user_id, video_url, platform, action_type, timestamp_position, 
        session_duration, device_type, browser_info) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.userId,
        videoUrl,
        platform || null,
        actionType,
        timestampPosition || 0,
        sessionDuration || 0,
        deviceType || null,
        browserInfo || null
      ]
    );

    res.status(201).json({ message: 'Analytics recorded successfully' });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to record analytics' });
  }
});

module.exports = router;