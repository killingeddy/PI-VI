const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Rota para obter todas as ações
router.get('/', stockController.getAllStocks);

// Rota para obter dados de uma ação específica
router.get('/:symbol', stockController.getStockBySymbol);

module.exports = router;