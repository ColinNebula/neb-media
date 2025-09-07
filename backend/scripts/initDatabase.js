const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server (without specifying database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306
    });

    console.log('📊 Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'neb_media_db';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Close connection and reconnect to the specific database
    await connection.end();
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      database: dbName
    });

    console.log(`📊 Connected to database '${dbName}'`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        avatar_url VARCHAR(500),
        is_verified BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB
    `);
    console.log('✅ Users table created');

    // Create user_preferences table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_preferences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        theme VARCHAR(20) DEFAULT 'light',
        auto_play BOOLEAN DEFAULT false,
        auto_quality BOOLEAN DEFAULT true,
        default_quality VARCHAR(10) DEFAULT '720p',
        volume INT DEFAULT 50,
        playback_speed DECIMAL(3,2) DEFAULT 1.00,
        subtitle_enabled BOOLEAN DEFAULT false,
        subtitle_language VARCHAR(10) DEFAULT 'en',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_prefs (user_id)
      ) ENGINE=InnoDB
    `);
    console.log('✅ User preferences table created');

    // Create user_videos table (watch history/favorites)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        video_url VARCHAR(1000) NOT NULL,
        video_title VARCHAR(300),
        video_description TEXT,
        platform VARCHAR(50),
        duration INT DEFAULT 0,
        watch_time INT DEFAULT 0,
        watch_percentage DECIMAL(5,2) DEFAULT 0.00,
        is_favorite BOOLEAN DEFAULT false,
        is_watched BOOLEAN DEFAULT false,
        thumbnail_url VARCHAR(500),
        last_watched TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_videos (user_id),
        INDEX idx_platform (platform),
        INDEX idx_favorites (user_id, is_favorite),
        INDEX idx_last_watched (last_watched)
      ) ENGINE=InnoDB
    `);
    console.log('✅ User videos table created');

    // Create user_playlists table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_playlists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        playlist_name VARCHAR(100) NOT NULL,
        description TEXT,
        is_public BOOLEAN DEFAULT false,
        thumbnail_url VARCHAR(500),
        video_count INT DEFAULT 0,
        total_duration INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_playlists (user_id),
        INDEX idx_public_playlists (is_public),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB
    `);
    console.log('✅ User playlists table created');

    // Create playlist_videos table (many-to-many relationship)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS playlist_videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        playlist_id INT NOT NULL,
        video_id INT NOT NULL,
        position INT NOT NULL DEFAULT 0,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (playlist_id) REFERENCES user_playlists(id) ON DELETE CASCADE,
        FOREIGN KEY (video_id) REFERENCES user_videos(id) ON DELETE CASCADE,
        UNIQUE KEY unique_playlist_video (playlist_id, video_id),
        INDEX idx_playlist_position (playlist_id, position)
      ) ENGINE=InnoDB
    `);
    console.log('✅ Playlist videos table created');

    // Create user_sessions table for JWT token management
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token_hash VARCHAR(255) NOT NULL,
        device_info VARCHAR(200),
        ip_address VARCHAR(45),
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_sessions (user_id),
        INDEX idx_token_hash (token_hash),
        INDEX idx_expires_at (expires_at)
      ) ENGINE=InnoDB
    `);
    console.log('✅ User sessions table created');

    // Create video_analytics table for tracking
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS video_analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        video_url VARCHAR(1000) NOT NULL,
        platform VARCHAR(50),
        action_type ENUM('play', 'pause', 'seek', 'complete', 'share') NOT NULL,
        timestamp_position INT DEFAULT 0,
        session_duration INT DEFAULT 0,
        device_type VARCHAR(50),
        browser_info VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_analytics_user (user_id),
        INDEX idx_analytics_platform (platform),
        INDEX idx_analytics_action (action_type),
        INDEX idx_analytics_date (created_at)
      ) ENGINE=InnoDB
    `);
    console.log('✅ Video analytics table created');

    console.log('🎉 Database initialization completed successfully!');
    console.log('\n📋 Tables created:');
    console.log('   - users');
    console.log('   - user_preferences');
    console.log('   - user_videos');
    console.log('   - user_playlists');
    console.log('   - playlist_videos');
    console.log('   - user_sessions');
    console.log('   - video_analytics');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('📊 Database connection closed');
    }
  }
}

// Run initialization
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;