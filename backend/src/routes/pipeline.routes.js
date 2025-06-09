const express = require('express');
const router = express.Router();
const PipelineController = require('../controllers/pipelineController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota protegida:
router.post('/run-classification', authMiddleware, PipelineController.runClassification);

module.exports = router;
