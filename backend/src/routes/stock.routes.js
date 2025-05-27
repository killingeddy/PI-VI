const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Rota para obter todas as ações
router.get('/', (req, res) => {
  res.json({ message: 'Lista de ações (a ser implementado)' });
});

// Rota para obter dados de uma ação específica
router.get('/:symbol', (req, res) => {
  res.json({ message: `Detalhes da ação ${req.params.symbol} (a ser implementado)` });
});

module.exports = router;