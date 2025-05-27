const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Rota para adicionar uma ação à carteira
router.post('/:userId/stocks', (req, res) => {
  res.json({ message: 'Adicionar ação à carteira (a ser implementado)' });
});

// Rota para obter a carteira do usuário
router.get('/:userId', (req, res) => {
  res.json({ message: `Carteira do usuário ${req.params.userId} (a ser implementado)` });
});

// Rota para remover uma ação da carteira
router.delete('/:userId/stocks/:symbol', (req, res) => {
  res.json({ message: `Remover ação ${req.params.symbol} da carteira (a ser implementado)` });
});

module.exports = router;