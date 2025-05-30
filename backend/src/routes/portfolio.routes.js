const portfolioController = require('../controllers/portfolioController');
const express = require('express');
const router = express.Router();

// Rota para adicionar uma ação à carteira
router.post('/:userId/stocks', portfolioController.addStock);

// Rota para obter a carteira do usuário
router.get('/:userId', portfolioController.getPortfolioSummary);
router.get('/:userId/stocks', portfolioController.getAllStocks);

router.put('/:userId/stocks/:id', portfolioController.updateStock);

// Rota para remover uma ação da carteira
router.delete('/:userId/stocks/:id', portfolioController.removeStock);

module.exports = router;