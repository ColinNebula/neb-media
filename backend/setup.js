#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🚀 NEB Media Backend Setup\n');
  console.log('This script will help you configure your backend API server.\n');

  try {
    // Check if .env already exists
    const envPath = path.join(__dirname, '.env');
    let updateEnv = true;
    
    if (fs.existsSync(envPath)) {
      const update = await question('❓ .env file already exists. Do you want to update it? (y/N): ');
      updateEnv = update.toLowerCase().startsWith('y');
    }

    if (updateEnv) {
      console.log('\n📝 Database Configuration:');
      const dbHost = await question('Database Host (localhost): ') || 'localhost';
      const dbPort = await question('Database Port (3306): ') || '3306';
      const dbUser = await question('Database User (root): ') || 'root';
      const dbPassword = await question('Database Password: ');
      const dbName = await question('Database Name (neb_media_db): ') || 'neb_media_db';

      console.log('\n🔐 Security Configuration:');
      const jwtSecret = await question('JWT Secret (press Enter to generate random): ') || 
                       require('crypto').randomBytes(64).toString('hex');
      
      console.log('\n🌐 Server Configuration:');
      const port = await question('Server Port (5000): ') || '5000';
      const frontendUrl = await question('Frontend URL (http://localhost:3002): ') || 'http://localhost:3002';

      // Create .env file
      const envContent = `# Environment Configuration
NODE_ENV=development
PORT=${port}

# Database Configuration
DB_HOST=${dbHost}
DB_USER=${dbUser}
DB_PASSWORD=${dbPassword}
DB_NAME=${dbName}
DB_PORT=${dbPort}

# JWT Secret
JWT_SECRET=${jwtSecret}

# CORS Configuration
FRONTEND_URL=${frontendUrl}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100`;

      fs.writeFileSync(envPath, envContent);
      console.log('\n✅ .env file created successfully!');
    }

    // Ask about database initialization
    console.log('\n🗄️ Database Setup:');
    const initDb = await question('Do you want to initialize the database now? (Y/n): ');
    
    if (!initDb.toLowerCase().startsWith('n')) {
      console.log('\n📊 Initializing database...');
      
      try {
        const initDb = require('./scripts/initDatabase');
        await initDb();
        console.log('\n✅ Database initialized successfully!');
      } catch (error) {
        console.error('\n❌ Database initialization failed:', error.message);
        console.log('\n💡 Make sure MySQL is running and credentials are correct.');
        console.log('   You can run "npm run init-db" later to initialize the database.');
      }
    }

    console.log('\n🎉 Setup completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Make sure MySQL is running');
    console.log('   2. Run "npm run dev" to start the development server');
    console.log('   3. The API will be available at http://localhost:' + (process.env.PORT || '5000'));
    console.log('   4. Check the README.md for API documentation');
    console.log('\n🔗 Integration with React:');
    console.log('   - Install axios in your React app: npm install axios');
    console.log('   - Use the API endpoints to add user management to your video player');
    console.log('   - See README.md for code examples');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setup();
}

module.exports = setup;