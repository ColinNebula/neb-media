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

// Create new playlist
router.post('/', [
  authenticateToken,
  body('playlistName').isLength({ min: 1, max: 100 }).withMessage('Playlist name is required (max 100 characters)'),
  body('description').optional().isLength({ max: 1000 }),
  body('isPublic').optional().isBoolean(),
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

    const { playlistName, description, isPublic, thumbnailUrl } = req.body;

    const [result] = await promisePool.execute(
      `INSERT INTO user_playlists 
       (user_id, playlist_name, description, is_public, thumbnail_url) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        req.user.userId, 
        playlistName, 
        description || null, 
        isPublic || false, 
        thumbnailUrl || null
      ]
    );

    res.status(201).json({
      message: 'Playlist created successfully',
      playlistId: result.insertId
    });

  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Get user's playlists
router.get('/', [
  authenticateToken,
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional(),
  query('publicOnly').optional().isBoolean()
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
    const search = req.query.search;
    const publicOnly = req.query.publicOnly === 'true';

    // Build WHERE clause
    let whereConditions = ['user_id = ?'];
    let queryParams = [req.user.userId];

    if (publicOnly) {
      whereConditions.push('is_public = true');
    }

    if (search) {
      whereConditions.push('(playlist_name LIKE ? OR description LIKE ?)');
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const [countResult] = await promisePool.execute(
      `SELECT COUNT(*) as total FROM user_playlists WHERE ${whereClause}`,
      queryParams
    );

    const total = countResult[0].total;

    // Get playlists
    const [playlists] = await promisePool.execute(
      `SELECT id, playlist_name, description, is_public, thumbnail_url,
              video_count, total_duration, created_at, updated_at
       FROM user_playlists 
       WHERE ${whereClause}
       ORDER BY updated_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    res.json({
      playlists,
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
    console.error('Get playlists error:', error);
    res.status(500).json({ error: 'Failed to get playlists' });
  }
});

// Get specific playlist with videos
router.get('/:playlistId', authenticateToken, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    // Get playlist info
    const [playlists] = await promisePool.execute(
      `SELECT id, playlist_name, description, is_public, thumbnail_url,
              video_count, total_duration, created_at, updated_at
       FROM user_playlists 
       WHERE id = ? AND user_id = ?`,
      [playlistId, req.user.userId]
    );

    if (playlists.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const playlist = playlists[0];

    // Get playlist videos
    const [videos] = await promisePool.execute(
      `SELECT pv.id as playlist_video_id, pv.position, pv.added_at,
              uv.id, uv.video_url, uv.video_title, uv.video_description,
              uv.platform, uv.duration, uv.thumbnail_url, uv.watch_time,
              uv.watch_percentage, uv.is_favorite, uv.is_watched
       FROM playlist_videos pv
       JOIN user_videos uv ON pv.video_id = uv.id
       WHERE pv.playlist_id = ?
       ORDER BY pv.position ASC`,
      [playlistId]
    );

    res.json({
      playlist,
      videos
    });

  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({ error: 'Failed to get playlist' });
  }
});

// Update playlist
router.put('/:playlistId', [
  authenticateToken,
  body('playlistName').optional().isLength({ min: 1, max: 100 }),
  body('description').optional().isLength({ max: 1000 }),
  body('isPublic').optional().isBoolean(),
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

    const { playlistName, description, isPublic, thumbnailUrl } = req.body;
    const playlistId = req.params.playlistId;

    // Verify playlist belongs to user
    const [playlists] = await promisePool.execute(
      'SELECT id FROM user_playlists WHERE id = ? AND user_id = ?',
      [playlistId, req.user.userId]
    );

    if (playlists.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Update playlist
    await promisePool.execute(
      `UPDATE user_playlists 
       SET playlist_name = COALESCE(?, playlist_name),
           description = COALESCE(?, description),
           is_public = COALESCE(?, is_public),
           thumbnail_url = COALESCE(?, thumbnail_url),
           updated_at = NOW()
       WHERE id = ?`,
      [playlistName, description, isPublic, thumbnailUrl, playlistId]
    );

    res.json({ message: 'Playlist updated successfully' });

  } catch (error) {
    console.error('Update playlist error:', error);
    res.status(500).json({ error: 'Failed to update playlist' });
  }
});

// Add video to playlist
router.post('/:playlistId/videos', [
  authenticateToken,
  body('videoId').isInt().withMessage('Valid video ID is required'),
  body('position').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { videoId, position } = req.body;
    const playlistId = req.params.playlistId;

    // Verify playlist belongs to user
    const [playlists] = await promisePool.execute(
      'SELECT id FROM user_playlists WHERE id = ? AND user_id = ?',
      [playlistId, req.user.userId]
    );

    if (playlists.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Verify video belongs to user
    const [videos] = await promisePool.execute(
      'SELECT id FROM user_videos WHERE id = ? AND user_id = ?',
      [videoId, req.user.userId]
    );

    if (videos.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Check if video is already in playlist
    const [existingEntries] = await promisePool.execute(
      'SELECT id FROM playlist_videos WHERE playlist_id = ? AND video_id = ?',
      [playlistId, videoId]
    );

    if (existingEntries.length > 0) {
      return res.status(409).json({ 
        error: 'Video already in playlist',
        message: 'This video is already in the playlist' 
      });
    }

    // Get next position if not specified
    let videoPosition = position;
    if (videoPosition === undefined) {
      const [maxPosition] = await promisePool.execute(
        'SELECT COALESCE(MAX(position), -1) + 1 as next_position FROM playlist_videos WHERE playlist_id = ?',
        [playlistId]
      );
      videoPosition = maxPosition[0].next_position;
    }

    // Add video to playlist
    await promisePool.execute(
      `INSERT INTO playlist_videos (playlist_id, video_id, position) 
       VALUES (?, ?, ?)`,
      [playlistId, videoId, videoPosition]
    );

    // Update playlist video count and total duration
    await promisePool.execute(
      `UPDATE user_playlists p
       SET video_count = (
         SELECT COUNT(*) FROM playlist_videos WHERE playlist_id = p.id
       ),
       total_duration = (
         SELECT COALESCE(SUM(uv.duration), 0) 
         FROM playlist_videos pv 
         JOIN user_videos uv ON pv.video_id = uv.id 
         WHERE pv.playlist_id = p.id
       ),
       updated_at = NOW()
       WHERE id = ?`,
      [playlistId]
    );

    res.status(201).json({ message: 'Video added to playlist successfully' });

  } catch (error) {
    console.error('Add video to playlist error:', error);
    res.status(500).json({ error: 'Failed to add video to playlist' });
  }
});

// Remove video from playlist
router.delete('/:playlistId/videos/:videoId', authenticateToken, async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;

    // Verify playlist belongs to user
    const [playlists] = await promisePool.execute(
      'SELECT id FROM user_playlists WHERE id = ? AND user_id = ?',
      [playlistId, req.user.userId]
    );

    if (playlists.length === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Remove video from playlist
    const [result] = await promisePool.execute(
      'DELETE FROM playlist_videos WHERE playlist_id = ? AND video_id = ?',
      [playlistId, videoId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video not found in playlist' });
    }

    // Update playlist video count and total duration
    await promisePool.execute(
      `UPDATE user_playlists p
       SET video_count = (
         SELECT COUNT(*) FROM playlist_videos WHERE playlist_id = p.id
       ),
       total_duration = (
         SELECT COALESCE(SUM(uv.duration), 0) 
         FROM playlist_videos pv 
         JOIN user_videos uv ON pv.video_id = uv.id 
         WHERE pv.playlist_id = p.id
       ),
       updated_at = NOW()
       WHERE id = ?`,
      [playlistId]
    );

    res.json({ message: 'Video removed from playlist successfully' });

  } catch (error) {
    console.error('Remove video from playlist error:', error);
    res.status(500).json({ error: 'Failed to remove video from playlist' });
  }
});

// Delete playlist
router.delete('/:playlistId', authenticateToken, async (req, res) => {
  try {
    const playlistId = req.params.playlistId;

    // Verify playlist belongs to user and delete
    const [result] = await promisePool.execute(
      'DELETE FROM user_playlists WHERE id = ? AND user_id = ?',
      [playlistId, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json({ message: 'Playlist deleted successfully' });

  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
});

module.exports = router;