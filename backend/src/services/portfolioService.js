const db = require('../config/database');

class PortfolioService {
  /**
   * Adiciona uma ação ao portfólio do usuário
   * @param {Number} userId ID do usuário
   * @param {Object} stockData Dados da ação a ser adicionada
   * @returns {Object} Ação adicionada ao portfólio
   */
  async addStockToPortfolio(userId, stockData) {
    try {
      // Verificar se a ação existe
      const stockCheck = await db.query(
        'SELECT id FROM stocks WHERE symbol = $1',
        [stockData.symbol]
      );
      
      if (stockCheck.rows.length === 0) {
        throw new Error(`Ação com símbolo ${stockData.symbol} não encontrada`);
      }
      
      const stockId = stockCheck.rows[0].id;
      
      // Verificar se o usuário já tem essa ação no portfólio
      const existingStock = await db.query(
        'SELECT id FROM portfolios WHERE user_id = $1 AND stock_id = $2',
        [userId, stockId]
      );
      
      if (existingStock.rows.length > 0) {
        // Atualizar quantidade e preço médio
        const result = await db.query(
          `UPDATE portfolios
           SET quantity = quantity + $3,
               purchase_price = ((purchase_price * quantity) + ($4 * $3)) / (quantity + $3),
               updated_at = CURRENT_TIMESTAMP
           WHERE user_id = $1 AND stock_id = $2
           RETURNING *`,
          [userId, stockId, stockData.quantity, stockData.purchasePrice]
        );
        
        return result.rows[0];
      } else {
        // Adicionar nova ação ao portfólio
        const result = await db.query(
          `INSERT INTO portfolios
           (user_id, stock_id, quantity, purchase_price, purchase_date)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [
            userId,
            stockId,
            stockData.quantity,
            stockData.purchasePrice,
            stockData.purchaseDate || new Date()
          ]
        );
        
        return result.rows[0];
      }
    } catch (error) {
      console.error('Erro ao adicionar ação ao portfólio:', error);
      throw error;
    }
  }
  
  /**
   * Remove uma ação do portfólio do usuário
   * @param {Number} userId ID do usuário
   * @param {Number} portfolioId ID do item do portfólio
   * @returns {Boolean} Sucesso da operação
   */
  async removeStockFromPortfolio(userId, portfolioId) {
    try {
      const result = await db.query(
        'DELETE FROM portfolios WHERE id = $1 AND user_id = $2 RETURNING id',
        [portfolioId, userId]
      );
      
      return result.rows.length > 0;
    } catch (error) {
      console.error('Erro ao remover ação do portfólio:', error);
      throw error;
    }
  }
  
  /**
   * Atualiza a quantidade de uma ação no portfólio
   * @param {Number} userId ID do usuário
   * @param {Number} portfolioId ID do item do portfólio
   * @param {Number} quantity Nova quantidade
   * @returns {Object} Item atualizado do portfólio
   */
  async updateStockQuantity(userId, portfolioId, quantity) {
    try {
      if (quantity <= 0) {
        return await this.removeStockFromPortfolio(userId, portfolioId);
      }
      
      const result = await db.query(
        `UPDATE portfolios
         SET quantity = $3, updated_at = CURRENT_TIMESTAMP
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [portfolioId, userId, quantity]
      );
      
      if (result.rows.length === 0) {
        throw new Error('Item do portfólio não encontrado');
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar quantidade da ação:', error);
      throw error;
    }
  }
  
  /**
   * Obtém o portfólio completo do usuário
   * @param {Number} userId ID do usuário
   * @returns {Array} Lista de ações no portfólio
   */
  async getUserPortfolio(userId) {
    try {
      const result = await db.query(
        `SELECT p.id, p.quantity, p.purchase_price, p.purchase_date,
                s.symbol, s.company_name, s.sector, s.risk_category,
                sp.adj_close as current_price,
                sp.date as price_date,
                ((sp.adj_close - p.purchase_price) / p.purchase_price) * 100 as profit_percentage
         FROM portfolios p
         JOIN stocks s ON p.stock_id = s.id
         LEFT JOIN (
           SELECT DISTINCT ON (stock_id) stock_id, adj_close, date
           FROM stock_prices
           ORDER BY stock_id, date DESC
         ) sp ON s.id = sp.stock_id
         WHERE p.user_id = $1
         ORDER BY s.symbol ASC`,
        [userId]
      );
      
      // Calcular valores totais
      const portfolio = result.rows;
      
      let totalInvestment = 0;
      let totalCurrentValue = 0;
      
      portfolio.forEach(item => {
        const investmentValue = item.purchase_price * item.quantity;
        const currentValue = item.current_price * item.quantity;
        
        totalInvestment += investmentValue;
        totalCurrentValue += currentValue;
        
        // Adicionar valores calculados ao item
        item.investment_value = investmentValue;
        item.current_value = currentValue;
        item.profit_value = currentValue - investmentValue;
      });
      
      // Retornar portfólio com resumo
      return {
        stocks: portfolio,
        summary: {
          total_investment: totalInvestment,
          total_current_value: totalCurrentValue,
          total_profit_value: totalCurrentValue - totalInvestment,
          total_profit_percentage: totalInvestment > 0 
            ? ((totalCurrentValue - totalInvestment) / totalInvestment) * 100
            : 0
        }
      };
    } catch (error) {
      console.error('Erro ao obter portfólio do usuário:', error);
      throw error;
    }
  }
}

module.exports = new PortfolioService();