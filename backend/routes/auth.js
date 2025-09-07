const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { promisePool } = require('../config/database');

const router = express.Router();

// Register new user
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be 3-50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const [existingUsers] = await promisePool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        error: 'User already exists',
        message: 'Username or email is already taken' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await promisePool.execute(
      `INSERT INTO users (username, email, password_hash, first_name, last_name) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, passwordHash, firstName || null, lastName || null]
    );

    const userId = result.insertId;

    // Create default user preferences
    await promisePool.execute(
      `INSERT INTO user_preferences (user_id) VALUES (?)`,
      [userId]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId, username, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store session
    const tokenHash = await bcrypt.hash(token, 10);
    await promisePool.execute(
      `INSERT INTO user_sessions (user_id, token_hash, expires_at) 
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [userId, tokenHash]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userId,
        username,
        email,
        firstName,
        lastName
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      message: 'An error occurred during registration' 
    });
  }
});

// Login user
router.post('/login', [
  body('login')
    .notEmpty()
    .withMessage('Username or email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { login, password } = req.body;

    // Find user by username or email
    const [users] = await promisePool.execute(
      `SELECT id, username, email, password_hash, first_name, last_name, 
              is_verified, is_active 
       FROM users 
       WHERE (username = ? OR email = ?) AND is_active = true`,
      [login, login]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Username/email or password is incorrect' 
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        message: 'Username/email or password is incorrect' 
      });
    }

    // Update last login
    await promisePool.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store session
    const tokenHash = await bcrypt.hash(token, 10);
    await promisePool.execute(
      `INSERT INTO user_sessions (user_id, token_hash, expires_at) 
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [user.id, tokenHash]
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        isVerified: user.is_verified
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed',
      message: 'An error occurred during login' 
    });
  }
});

// Logout user
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      // Invalidate the session
      const tokenHash = await bcrypt.hash(token, 10);
      await promisePool.execute(
        'DELETE FROM user_sessions WHERE token_hash = ?',
        [tokenHash]
      );
    }

    res.json({ message: 'Logout successful' });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Logout failed',
      message: 'An error occurred during logout' 
    });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'No token provided',
        valid: false 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if session exists and is valid
    const tokenHash = await bcrypt.hash(token, 10);
    const [sessions] = await promisePool.execute(
      `SELECT user_id FROM user_sessions 
       WHERE token_hash = ? AND expires_at > NOW()`,
      [tokenHash]
    );

    if (sessions.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid or expired token',
        valid: false 
      });
    }

    // Get user data
    const [users] = await promisePool.execute(
      `SELECT id, username, email, first_name, last_name, is_verified 
       FROM users 
       WHERE id = ? AND is_active = true`,
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        error: 'User not found',
        valid: false 
      });
    }

    const user = users[0];

    res.json({
      valid: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        isVerified: user.is_verified
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      error: 'Token verification failed',
      valid: false 
    });
  }
});

module.exports = router;