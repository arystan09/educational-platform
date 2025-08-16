const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

// Connect to the database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

async function createTestUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    // Create test user
    const user = {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'STUDENT',
      emailVerified: true, // Skip email verification
      emailVerificationToken: null,
      emailVerificationExpires: null
    };

    // Insert the user
    db.run(`
      INSERT INTO user (name, email, password, role, emailVerified, emailVerificationToken, emailVerificationExpires, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `, [user.name, user.email, user.password, user.role, user.emailVerified, user.emailVerificationToken, user.emailVerificationExpires], function(err) {
      if (err) {
        console.error('Error creating user:', err);
      } else {
        console.log('✅ Test user created successfully!');
        console.log('📧 Email: test@example.com');
        console.log('🔑 Password: test123');
        console.log('👤 Role: STUDENT');
        console.log('🆔 User ID:', this.lastID);
        console.log('\nYou can now login with these credentials to test the enrollment system.');
      }
      db.close();
    });

  } catch (error) {
    console.error('Error:', error);
    db.close();
  }
}

createTestUser(); 