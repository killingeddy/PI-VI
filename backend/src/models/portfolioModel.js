const db = require('../config/database');

class Portfolio {
  static async getUserPortfolio(userId) {
    const result = await db.query(
      `SELECT p.id, p.quantity, p.purchase_price, p.purchase_date,
        s.id as stock_id, s.symbol, s.company_name, s.risk_level, 
        s.risk_description, s.volatility, s.max_drawdown, s.beta, s.liquidity
       FROM portfolios p
       JOIN stocks s ON p.stock_id = s.id
       WHERE p.user_id = $1`,
      [userId]
    );
    
    return result.rows;
  }
  
  static async addStock(userId, stockId, quantity, purchasePrice, purchaseDate) {
    // Verificar se já existe este ativo no portfólio
    const existingStock = await db.query(
      'SELECT id FROM portfolios WHERE user_id = $1 AND stock_id = $2',
      [userId, stockId]
    );
    
    if (existingStock.rows.length > 0) {
      // Atualizar quantidade
      const result = await db.query(
        `UPDATE portfolios 
         SET quantity = quantity + $3, 
             purchase_price = ((purchase_price * quantity) + ($3 * $4)) / (quantity + $3),
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $1 AND stock_id = $2
         RETURNING *`,
        [userId, stockId, quantity, purchasePrice]
      );
      
      return result.rows[0];
    } else {
      // Adicionar nova ação
      const result = await db.query(
        `INSERT INTO portfolios (user_id, stock_id, quantity, purchase_price, purchase_date)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [userId, stockId, quantity, purchasePrice, purchaseDate]
      );
      
      return result.rows[0];
    }
  }
  
  static async removeStock(userId, portfolioId) {
    const result = await db.query(
      `DELETE FROM portfolios 
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [portfolioId, userId]
    );
    
    return result.rows[0];
  }
  
  static async updateQuantity(userId, portfolioId, quantity) {
    if (quantity <= 0) {
      return this.removeStock(userId, portfolioId);
    }
    
    const result = await db.query(
      `UPDATE portfolios
       SET quantity = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [portfolioId, userId, quantity]
    );
    
    return result.rows[0];
  }
}

module.exports = Portfolio;