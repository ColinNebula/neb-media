const mysql = require('mysql2/promise');
const readline = require('readline');

// Create readline interface for password input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function changeRootPassword() {
  try {
    console.log('🔐 MySQL Root Password Change Tool');
    console.log('=====================================\n');

    // Get new password from user
    const newPassword = await new Promise((resolve) => {
      rl.question('Enter new password for MySQL root user: ', (password) => {
        resolve(password);
      });
    });

    if (!newPassword.trim()) {
      console.log('❌ Password cannot be empty');
      rl.close();
      return;
    }

    console.log('\nAttempting to connect to MySQL...');

    // Try to connect without password first (current state)
    let connection;
    try {
      connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Current empty password
        port: 3306
      });
      console.log('✅ Connected to MySQL');
    } catch (error) {
      console.log('❌ Could not connect to MySQL. Error:', error.message);
      console.log('\nPossible solutions:');
      console.log('1. Make sure MySQL service is running');
      console.log('2. If you already have a password set, run: npm run reset-mysql-password');
      console.log('3. Check if MySQL is installed and accessible');
      rl.close();
      return;
    }

    // Change the password
    console.log('Setting new password...');
    await connection.execute(
      "ALTER USER 'root'@'localhost' IDENTIFIED BY ?",
      [newPassword]
    );

    // Flush privileges to ensure changes take effect
    await connection.execute('FLUSH PRIVILEGES');
    
    console.log('✅ Password changed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Update your .env file with the new password');
    console.log('2. Restart your backend server');
    console.log('3. Test the connection');

    await connection.end();
    rl.close();

  } catch (error) {
    console.error('❌ Error changing password:', error.message);
    rl.close();
  }
}

// Alternative method for when MySQL already has a password
async function changeExistingPassword() {
  try {
    console.log('🔐 MySQL Password Change (with existing password)');
    console.log('=================================================\n');

    const currentPassword = await new Promise((resolve) => {
      rl.question('Enter current MySQL root password: ', (password) => {
        resolve(password);
      });
    });

    const newPassword = await new Promise((resolve) => {
      rl.question('Enter new password: ', (password) => {
        resolve(password);
      });
    });

    console.log('\nConnecting to MySQL...');
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: currentPassword,
      port: 3306
    });

    console.log('✅ Connected to MySQL');

    await connection.execute(
      "ALTER USER 'root'@'localhost' IDENTIFIED BY ?",
      [newPassword]
    );

    await connection.execute('FLUSH PRIVILEGES');
    
    console.log('✅ Password changed successfully!');
    await connection.end();
    rl.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes('--existing')) {
  changeExistingPassword();
} else {
  changeRootPassword();
}