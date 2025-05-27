const InvestorProfile = require('../models/investorProfileModel');
const InvestorProfileService = require('../services/investorProfileService');

class ProfileController {
  static async getProfile(req, res) {
    try {
      const { userId } = req.user;
      
      const profile = await InvestorProfile.getByUserId(userId);
      
      if (!profile) {
        return res.status(404).json({
          status: 'error',
          message: 'Perfil de investidor não encontrado'
        });
      }
      
      res.json({
        status: 'success',
        data: profile
      });
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
  
  static async saveProfile(req, res) {
    try {
      const { userId } = req.user;
      const { 
        risk_tolerance, 
        investment_horizon, 
        investment_experience, 
        monthly_income 
      } = req.body;
      
      // Validação básica
      if (risk_tolerance === undefined || investment_horizon === undefined || 
          investment_experience === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Todos os campos obrigatórios devem ser fornecidos'
        });
      }
      
      // Calcular o tipo de perfil usando o serviço
      const profileService = new InvestorProfileService();
      const profile_type = profileService.calculateProfileType({
        risk_tolerance,
        investment_horizon,
        investment_experience
      });
      
      // Salvar ou atualizar o perfil
      const profile = await InvestorProfile.update(userId, {
        profile_type,
        risk_tolerance,
        investment_horizon,
        investment_experience,
        monthly_income
      });
      
      res.json({
        status: 'success',
        message: 'Perfil de investidor salvo com sucesso',
        data: profile
      });
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
}

module.exports = ProfileController;