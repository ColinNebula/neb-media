const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
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

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await promisePool.execute(
      `SELECT u.id, u.username, u.email, u.first_name, u.last_name, 
              u.avatar_url, u.is_verified, u.created_at, u.last_login,
              p.theme, p.auto_play, p.default_quality, p.volume, 
              p.playback_speed, p.subtitle_enabled, p.subtitle_language
       FROM users u
       LEFT JOIN user_preferences p ON u.id = p.user_id
       WHERE u.id = ? AND u.is_active = true`,
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        avatarUrl: user.avatar_url,
        isVerified: user.is_verified,
        createdAt: user.created_at,
        lastLogin: user.last_login
      },
      preferences: {
        theme: user.theme,
        autoPlay: user.auto_play,
        defaultQuality: user.default_quality,
        volume: user.volume,
        playbackSpeed: user.playback_speed,
        subtitleEnabled: user.subtitle_enabled,
        subtitleLanguage: user.subtitle_language
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Update user profile
router.put('/profile', [
  authenticateToken,
  body('firstName').optional().isLength({ max: 50 }),
  body('lastName').optional().isLength({ max: 50 }),
  body('avatarUrl').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { firstName, lastName, avatarUrl } = req.body;

    await promisePool.execute(
      `UPDATE users 
       SET first_name = ?, last_name = ?, avatar_url = ?, updated_at = NOW()
       WHERE id = ?`,
      [firstName || null, lastName || null, avatarUrl || null, req.user.userId]
    );

    res.json({ message: 'Profile updated successfully' });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update user preferences
router.put('/preferences', [
  authenticateToken,
  body('theme').optional().isIn(['light', 'dark']),
  body('autoPlay').optional().isBoolean(),
  body('defaultQuality').optional().isIn(['360p', '480p', '720p', '1080p', '1440p', '2160p']),
  body('volume').optional().isInt({ min: 0, max: 100 }),
  body('playbackSpeed').optional().isFloat({ min: 0.25, max: 3.0 }),
  body('subtitleEnabled').optional().isBoolean(),
  body('subtitleLanguage').optional().isLength({ max: 10 })
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
      theme, 
      autoPlay, 
      defaultQuality, 
      volume, 
      playbackSpeed, 
      subtitleEnabled, 
      subtitleLanguage 
    } = req.body;

    await promisePool.execute(
      `UPDATE user_preferences 
       SET theme = COALESCE(?, theme),
           auto_play = COALESCE(?, auto_play),
           default_quality = COALESCE(?, default_quality),
           volume = COALESCE(?, volume),
           playback_speed = COALESCE(?, playback_speed),
           subtitle_enabled = COALESCE(?, subtitle_enabled),
           subtitle_language = COALESCE(?, subtitle_language),
           updated_at = NOW()
       WHERE user_id = ?`,
      [
        theme, 
        autoPlay, 
        defaultQuality, 
        volume, 
        playbackSpeed, 
        subtitleEnabled, 
        subtitleLanguage, 
        req.user.userId
      ]
    );

    res.json({ message: 'Preferences updated successfully' });

  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get video count and watch time
    const [videoStats] = await promisePool.execute(
      `SELECT 
         COUNT(*) as total_videos,
         SUM(watch_time) as total_watch_time,
         COUNT(CASE WHEN is_favorite = true THEN 1 END) as favorite_count,
         COUNT(CASE WHEN is_watched = true THEN 1 END) as completed_count
       FROM user_videos 
       WHERE user_id = ?`,
      [req.user.userId]
    );

    // Get playlist count
    const [playlistStats] = await promisePool.execute(
      `SELECT COUNT(*) as total_playlists 
       FROM user_playlists 
       WHERE user_id = ?`,
      [req.user.userId]
    );

    // Get platform breakdown
    const [platformStats] = await promisePool.execute(
      `SELECT platform, COUNT(*) as count 
       FROM user_videos 
       WHERE user_id = ? AND platform IS NOT NULL 
       GROUP BY platform`,
      [req.user.userId]
    );

    res.json({
      videos: {
        total: videoStats[0].total_videos || 0,
        favorites: videoStats[0].favorite_count || 0,
        completed: videoStats[0].completed_count || 0,
        totalWatchTime: videoStats[0].total_watch_time || 0
      },
      playlists: {
        total: playlistStats[0].total_playlists || 0
      },
      platforms: platformStats
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to get user statistics' });
  }
});

module.exports = router;