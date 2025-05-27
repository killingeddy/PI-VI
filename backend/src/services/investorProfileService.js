class InvestorProfileService {
  calculateProfileType(answers) {
    const { risk_tolerance, investment_horizon, investment_experience } = answers;
    
    // Pontuação ponderada (baseada nos pesos dos critérios)
    const weights = {
      risk_tolerance: 0.5,      // 50% - Tolerância ao risco
      investment_horizon: 0.3,  // 30% - Horizonte de investimento
      investment_experience: 0.2 // 20% - Experiência com investimentos
    };
    
    // Normalizar valores para uma escala de 0-1 (considerando escala de 1-5)
    const normalized = {
      risk_tolerance: (risk_tolerance - 1) / 4,
      investment_horizon: (investment_horizon - 1) / 4,
      investment_experience: (investment_experience - 1) / 4
    };
    
    // Calcular pontuação final (0-1)
    const finalScore = 
      normalized.risk_tolerance * weights.risk_tolerance +
      normalized.investment_horizon * weights.investment_horizon +
      normalized.investment_experience * weights.investment_experience;
    
    // Classificar o perfil conforme o notebook
    if (finalScore < 0.2) {
      return 'Muito Conservador';
    } else if (finalScore < 0.4) {
      return 'Conservador';
    } else if (finalScore < 0.6) {
      return 'Moderado';
    } else if (finalScore < 0.8) {
      return 'Arrojado';
    } else {
      return 'Agressivo';
    }
  }
  
  getRecommendedRiskLevels(profileType) {
    // Recomendações baseadas no perfil conforme a função match_investor_profile do notebook
    switch (profileType) {
      case 'Muito Conservador':
        return {
          primary: [1], // Risco Muito Baixo
          secondary: [2]  // Risco Baixo
        };
      case 'Conservador':
        return {
          primary: [2], // Risco Baixo
          secondary: [1, 3]  // Risco Muito Baixo e Médio
        };
      case 'Moderado':
        return {
          primary: [3], // Risco Médio
          secondary: [2, 4]  // Risco Baixo e Alto
        };
      case 'Arrojado':
        return {
          primary: [4], // Risco Alto
          secondary: [3, 5]  // Risco Médio e Muito Alto
        };
      case 'Agressivo':
        return {
          primary: [5], // Risco Muito Alto
          secondary: [4]  // Risco Alto
        };
      default:
        return {
          primary: [3], // Risco Médio
          secondary: [2]  // Risco Baixo
        };
    }
  }
}

module.exports = InvestorProfileService;
