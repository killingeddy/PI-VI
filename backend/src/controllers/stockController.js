const stockAnalysisService = require('../services/stockAnalysisService');

class StockController {
  // Obtém a lista de todas as ações
  async getAllStocks(req, res) {
    try {
      const filters = {
        riskCategory: req.query.risk_category,
        sector: req.query.sector,
        search: req.query.search
      };

      const limit = parseInt(req.query.limit) || 100;
      const offset = parseInt(req.query.offset) || 0;
      
      const stocks = await stockAnalysisService.getStocksWithFilters(filters, limit, offset);
      
      res.json({
        status: 'success',
        message: 'Ações obtidas com sucesso',
        data: stocks
      });
    } catch (error) {
      console.error('Erro ao obter ações:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro ao obter ações',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
  
  // Obtém detalhes de uma ação específica
  async getStockBySymbol(req, res) {
    try {
      const symbol = req.params.symbol;
      
      // Obter análise da ação
      const stockAnalysis = await stockAnalysisService.analyzeStock(symbol);
      
      res.json({
        status: 'success',
        message: 'Ação obtida com sucesso',
        data: stockAnalysis
      });
    } catch (error) {
      console.error(`Erro ao obter ação ${req.params.symbol}:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Erro ao obter ação',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = new StockController();