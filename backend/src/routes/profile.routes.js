const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Rota para salvar o perfil do investidor
router.post('/', (req, res) => {
  res.json({ message: 'Salvar perfil de investidor (a ser implementado)' });
});

// Rota para obter o perfil do investidor
router.get('/:userId', (req, res) => {
  res.json({ message: `Perfil do investidor ${req.params.userId} (a ser implementado)` });
});

module.exports = router;