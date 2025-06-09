const db = require('../config/database');

class Asset {
  static async getAll(type = null) {
    let query = 'SELECT * FROM assets';
    const params = [];
    
    if (type) {
      query += ' WHERE type = $1';
      params.push(type);
    }
    
    query += ' ORDER BY symbol';
    
    const result = await db.query(query, params);
    return result.rows;
  }
  
  static async getBySymbol(symbol) {
    const result = await db.query(
      'SELECT * FROM assets WHERE symbol = $1',
      [symbol]
    );
    
    return result.rows[0];
  }
  
  static async getById(id) {
    const result = await db.query(
      'SELECT * FROM assets WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  }
  
  static async getByRiskLevel(riskLevel, type = null) {
    let query = 'SELECT * FROM assets WHERE risk_level = $1';
    const params = [riskLevel];
    
    if (type) {
      query += ' AND type = $2';
      params.push(type);
    }
    
    const result = await db.query(query, params);
    return result.rows;
  }
  
  static async importFromRiskProfile(riskProfile) {
    // Função para importar dados do notebook
    const assets = [];
    
    for (const item of riskProfile) {
      try {
        const { ticker, risk_level, volatility, max_drawdown, beta, liquidity } = item;
        
        // Verificar se o ativo já existe
        const existingAsset = await this.getBySymbol(ticker);
        
        if (existingAsset) {
          // Atualizar ativo existente
          const result = await db.query(
            `UPDATE assets 
             SET risk_level = $1, volatility = $2, max_drawdown = $3, beta = $4, liquidity = $5, updated_at = CURRENT_TIMESTAMP
             WHERE symbol = $6
             RETURNING *`,
            [risk_level, volatility, max_drawdown, beta, liquidity, ticker]
          );
          assets.push(result.rows[0]);
        } else {
          // Criar novo ativo
          const result = await db.query(
            `INSERT INTO assets (symbol, company_name, type, risk_level, volatility, max_drawdown, beta, liquidity)
             VALUES ($1, $1, 'ticker', $2, $3, $4, $5, $6)
             RETURNING *`,
            [ticker, risk_level, volatility, max_drawdown, beta, liquidity]
          );
          assets.push(result.rows[0]);
        }
      } catch (error) {
        console.error(`Erro ao importar ${item.ticker}:`, error);
      }
    }
    
    return assets;
  }
}

module.exports = Asset;
