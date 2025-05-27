const Portfolio = require('../models/portfolioModel');
const Stock = require('../models/stockModel');

class PortfolioController {
  static async getAllStocks(req, res) {
    try {
      const { userId } = req.user;
      
      const portfolio = await Portfolio.getUserPortfolio(userId);
      
      res.json({
        status: 'success',
        data: portfolio
      });
    } catch (error) {
      console.error('Erro ao obter portfólio:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
  
  static async getPortfolioSummary(req, res) {
    try {
      const { userId } = req.user;
      
      const portfolio = await Portfolio.getUserPortfolio(userId);
      
      // Calcular métricas totais
      let totalInvested = 0;
      let totalCurrentValue = 0;
      let weightedRisk = 0;
      let weightedBeta = 0;
      
      for (const item of portfolio) {
        const stockValue = item.quantity * item.purchase_price;
        totalInvested += stockValue;
        
        // Obter preço atual (só estou usando o preço de compra como exemplo)
        const currentValue = item.quantity * (item.current_price || item.purchase_price);
        totalCurrentValue += currentValue;
        
        // Calcular risco ponderado
        weightedRisk += (stockValue / totalInvested) * item.risk_level;
        weightedBeta += (stockValue / totalInvested) * item.beta;
      }
      
      // Calcular rentabilidade total
      const profitLoss = totalCurrentValue - totalInvested;
      const profitPercentage = totalInvested > 0 
        ? (profitLoss / totalInvested) * 100 
        : 0;
      
      // Calcular distribuição por nível de risco
      const riskDistribution = portfolio.reduce((acc, item) => {
        const riskDesc = item.risk_description || `Nível ${item.risk_level}`;
        if (!acc[riskDesc]) {
          acc[riskDesc] = 0;
        }
        acc[riskDesc] += item.quantity * item.purchase_price;
        return acc;
      }, {});
      
      // Converter para percentagens
      for (const [risk, value] of Object.entries(riskDistribution)) {
        riskDistribution[risk] = (value / totalInvested) * 100;
      }
      
      res.json({
        status: 'success',
        data: {
          totalInvested,
          totalCurrentValue,
          profitLoss,
          profitPercentage,
          stockCount: portfolio.length,
          averageRiskLevel: weightedRisk,
          averageBeta: weightedBeta,
          riskDistribution
        }
      });
    } catch (error) {
      console.error('Erro ao obter resumo do portfólio:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
  
  static async addStock(req, res) {
    try {
      const { userId } = req.user;
      const { stockId, symbol, quantity, purchasePrice, purchaseDate } = req.body;
      
      if (!purchasePrice || !quantity || quantity <= 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Dados inválidos. Verifique quantidade e preço de compra.'
        });
      }
      
      // Procurar pelo ID ou símbolo
      let stock;
      if (stockId) {
        stock = await Stock.getById(stockId);
      } else if (symbol) {
        stock = await Stock.getBySymbol(symbol);
      }
      
      if (!stock) {
        return res.status(404).json({
          status: 'error',
          message: 'Ação não encontrada'
        });
      }
      
      // Adicionar ao portfólio
      const result = await Portfolio.addStock(
        userId, 
        stock.id,
        quantity,
        purchasePrice,
        purchaseDate || new Date()
      );
      
      res.status(201).json({
        status: 'success',
        message: 'Ação adicionada ao portfólio',
        data: result
      });
    } catch (error) {
      console.error('Erro ao adicionar ação:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
  
  static async updateStock(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (quantity === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Quantidade não especificada'
        });
      }
      
      const result = await Portfolio.updateQuantity(userId, id, quantity);
      
      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Ação não encontrada no portfólio'
        });
      }
      
      res.json({
        status: 'success',
        message: 'Quantidade atualizada',
        data: result
      });
    } catch (error) {
      console.error('Erro ao atualizar ação:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
  
  static async removeStock(req, res) {
    try {
      const { userId } = req.user;
      const { id } = req.params;
      
      const result = await Portfolio.removeStock(userId, id);
      
      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Ação não encontrada no portfólio'
        });
      }
      
      res.json({
        status: 'success',
        message: 'Ação removida do portfólio'
      });
    } catch (error) {
      console.error('Erro ao remover ação:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
}

module.exports = PortfolioController;
