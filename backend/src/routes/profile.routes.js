const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Rota para salvar o perfil do investidor
router.post('/:userId', profileController.saveProfile);

// Rota para obter o perfil do investidor
router.get('/:userId', profileController.getProfile);

module.exports = router;