const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

async function createAdmin() {
  const db = new sqlite3.Database('./database.sqlite');
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const sql = `
    INSERT INTO user (name, email, password, role, emailVerified, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `;
  
  db.run(sql, ['Admin User', 'admin@example.com', hashedPassword, 'ADMIN', true], function(err) {
    if (err) {
      console.error('Error creating admin:', err);
    } else {
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    }
    db.close();
  });
}

createAdmin(); 