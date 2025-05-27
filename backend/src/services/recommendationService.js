const Stock = require('../models/stockModel');
const InvestorProfile = require('../models/investorProfileModel');
const InvestorProfileService = require('./investorProfileService');

class RecommendationService {
  async getRecommendationsForUser(userId) {
    try {
      // Obter o perfil do investidor
      const profile = await InvestorProfile.getByUserId(userId);
      
      if (!profile) {
        throw new Error('Perfil de investidor não encontrado');
      }
      
      // Obter recomendações baseadas no perfil
      const profileService = new InvestorProfileService();
      const riskLevels = profileService.getRecommendedRiskLevels(profile.profile_type);
      
      // Buscar ações recomendadas conforme os níveis de risco
      let recommendations = {};
      
      // Obter ações para cada nível de risco recomendado
      for (const [category, level] of Object.entries(riskLevels)) {
        if (Array.isArray(level)) {
          const stocksForCategory = [];
          for (const riskLevel of level) {
            const stocks = await Stock.getByRiskLevel(riskLevel);
            stocksForCategory.push(...stocks);
          }
          recommendations[category] = stocksForCategory;
        }
      }
      
      // Formatar e filtrar as recomendações
      const result = {
        profile_type: profile.profile_type,
        recommendations: {}
      };
      
      // Processar cada categoria
      for (const [category, stocks] of Object.entries(recommendations)) {
        if (stocks && stocks.length > 0) {
          result.recommendations[category] = this._formatRecommendations(
            stocks, 
            category === 'primary' ? 1.0 : 0.7
          );
        }
      }
      
      return result;
    } catch (error) {
      console.error('Erro ao obter recomendações:', error);
      throw error;
    }
  }
  
  _formatRecommendations(stocks, weight) {
    // Limitar a quantidade e adicionar peso de recomendação
    return stocks
      .slice(0, 5)  // Limitar a 5 recomendações por categoria
      .map(stock => ({
        id: stock.id,
        symbol: stock.symbol,
        company_name: stock.company_name,
        risk_level: stock.risk_level,
        risk_description: stock.risk_description,
        volatility: stock.volatility,
        beta: stock.beta,
        recommendation_weight: weight
      }));
  }
}

module.exports = RecommendationService;