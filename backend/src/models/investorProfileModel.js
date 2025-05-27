const db = require('../config/database');

class InvestorProfile {
  static async getByUserId(userId) {
    const result = await db.query(
      'SELECT * FROM investor_profiles WHERE user_id = $1',
      [userId]
    );
    
    return result.rows[0];
  }
  
  static async create(profileData) {
    const { user_id, profile_type, risk_tolerance, investment_horizon, investment_experience, monthly_income } = profileData;
    
    const result = await db.query(
      `INSERT INTO investor_profiles 
       (user_id, profile_type, risk_tolerance, investment_horizon, investment_experience, monthly_income)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, profile_type, risk_tolerance, investment_horizon, investment_experience, monthly_income]
    );
    
    return result.rows[0];
  }
  
  static async update(userId, profileData) {
    const { profile_type, risk_tolerance, investment_horizon, investment_experience, monthly_income } = profileData;
    
    const result = await db.query(
      `UPDATE investor_profiles
       SET profile_type = $2, 
           risk_tolerance = $3, 
           investment_horizon = $4, 
           investment_experience = $5, 
           monthly_income = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1
       RETURNING *`,
      [userId, profile_type, risk_tolerance, investment_horizon, investment_experience, monthly_income]
    );
    
    // Se não existir, criar um novo
    if (result.rowCount === 0) {
      return this.create({
        user_id: userId,
        profile_type,
        risk_tolerance,
        investment_horizon,
        investment_experience,
        monthly_income
      });
    }
    
    return result.rows[0];
  }
}

module.exports = InvestorProfile;