const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function createAdminUser() {
  let connection;
  
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'neb_media_db'
    });

    console.log('📊 Connected to database');

    // Admin user details
    const adminUser = {
      username: 'admin',
      email: 'admin@nebmedia.local',
      password: 'bT7@-0L&v-!@Le-fhx9',
      firstName: 'System',
      lastName: 'Administrator'
    };

    // Check if admin user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [adminUser.username, adminUser.email]
    );

    if (existingUsers.length > 0) {
      console.log('⚠️  Admin user already exists');
      console.log('\n📋 Admin Credentials:');
      console.log('   Username: admin');
      console.log('   Email: admin@nebmedia.local');
      console.log('   Password: bT7@-0L&v-!@Le-fhx9');
      return;
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(adminUser.password, saltRounds);

    // Insert admin user
    const [result] = await connection.execute(
      `INSERT INTO users (username, email, password_hash, first_name, last_name, is_verified) 
       VALUES (?, ?, ?, ?, ?, true)`,
      [adminUser.username, adminUser.email, passwordHash, adminUser.firstName, adminUser.lastName]
    );

    const userId = result.insertId;

    // Create admin preferences with admin-specific settings
    await connection.execute(
      `INSERT INTO user_preferences (user_id, theme, auto_play, auto_quality, default_quality, volume) 
       VALUES (?, 'dark', true, true, '1080p', 75)`,
      [userId]
    );

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('   Username: admin');
    console.log('   Email: admin@nebmedia.local');
    console.log('   Password: bT7@-0L&v-!@Le-fhx9');
    console.log('\n🔐 Login URL: http://localhost:3002/neb-media');
    console.log('🛡️  Note: Change the password after first login!');

  } catch (error) {
    console.error('❌ Admin user creation failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('📊 Database connection closed');
    }
  }
}

// Run creation
if (require.main === module) {
  createAdminUser();
}

module.exports = createAdminUser;