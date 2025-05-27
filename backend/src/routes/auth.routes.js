const express = require('express');
const router = express.Router();

// Rota de exemplo
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

module.exports = router;