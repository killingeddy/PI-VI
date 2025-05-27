const db = require('../config/database');

class Stock {
  static async getAll() {
    const result = await db.query(
      'SELECT * FROM stocks ORDER BY symbol',
      []
    );
    
    return result.rows;
  }
  
  static async getBySymbol(symbol) {
    const result = await db.query(
      'SELECT * FROM stocks WHERE symbol = $1',
      [symbol]
    );
    
    return result.rows[0];
  }
  
  static async getById(id) {
    const result = await db.query(
      'SELECT * FROM stocks WHERE id = $1',
      [id]
    );
    
    return result.rows[0];
  }
  
  static async getByRiskLevel(riskLevel) {
    const result = await db.query(
      'SELECT * FROM stocks WHERE risk_level = $1',
      [riskLevel]
    );
    
    return result.rows;
  }
  
  static async importFromRiskProfile(classifiedStocks) {
    // Função para importar dados do notebook Python
    const stocks = [];
    
    for (const item of classifiedStocks) {
      try {
        const { Ticker, Volatility, Max_Drawdown, Beta, Liquidity, Risk_Level, Risk_Description } = item;
        
        // Verificar se a ação já existe
        const existingStock = await this.getBySymbol(Ticker);
        
        if (existingStock) {
          // Atualizar ação existente
          const result = await db.query(
            `UPDATE stocks 
             SET risk_level = $1, risk_description = $2, volatility = $3, 
                 max_drawdown = $4, beta = $5, liquidity = $6, 
                 updated_at = CURRENT_TIMESTAMP
             WHERE symbol = $7
             RETURNING *`,
            [Risk_Level, Risk_Description, Volatility, Max_Drawdown, 
             Beta, Liquidity, Ticker]
          );
          stocks.push(result.rows[0]);
        } else {
          // Obter nome da empresa para a ação
          const companyName = Ticker;
          
          // Criar nova ação
          const result = await db.query(
            `INSERT INTO stocks 
             (symbol, company_name, risk_level, risk_description, 
              volatility, max_drawdown, beta, liquidity)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [Ticker, companyName, Risk_Level, Risk_Description, 
             Volatility, Max_Drawdown, Beta, Liquidity]
          );
          stocks.push(result.rows[0]);
        }
      } catch (error) {
        console.error(`Erro ao importar ${item.Ticker}:`, error);
      }
    }
    
    return stocks;
  }
}

module.exports = Stock;