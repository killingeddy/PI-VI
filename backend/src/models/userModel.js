const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(userData) {
    const { email, password, full_name } = userData;
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.query(
      `INSERT INTO users (email, password, full_name) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, full_name, created_at`,
      [email, hashedPassword, full_name]
    );
    
    return result.rows[0];
  }
  
  static async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    return result.rows[0];
  }
  
  static async findById(id) {
    const result = await db.query(
      'SELECT id, email, full_name, created_at FROM users WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  }
}

module.exports = User;
