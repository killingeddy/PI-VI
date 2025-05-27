const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para registrar um novo usuário
router.post('/register', (req, res) => {
  res.json({ message: 'Registro de usuário (a ser implementado)' });
});

// Rota para login
router.post('/login', (req, res) => {
  res.json({ message: 'Login de usuário (a ser implementado)' });
});

module.exports = router;