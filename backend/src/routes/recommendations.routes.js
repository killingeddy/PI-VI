const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Rota para obter recomendações personalizadas para o usuário
router.get('/', recommendationController.getRecommendations);

module.exports = router;
