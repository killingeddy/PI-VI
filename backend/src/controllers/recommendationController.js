const RecommendationService = require('../services/recommendationService');

class RecommendationController {
  static async getRecommendations(req, res) {
    try {
      const { userId } = req.user;
      
      const recommendationService = new RecommendationService();
      const recommendations = await recommendationService.getRecommendationsForUser(userId);
      
      res.json({
        status: 'success',
        data: recommendations
      });
    } catch (error) {
      console.error('Erro ao obter recomendações:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
        details: error.message
      });
    }
  }
}

module.exports = RecommendationController;