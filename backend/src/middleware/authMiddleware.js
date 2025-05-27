const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt';

module.exports = (req, res, next) => {
  try {
    // Obter token do cabeçalho
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'Token de autenticação não fornecido'
      });
    }
    
    // Verificar formato do token
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
      return res.status(401).json({
        status: 'error',
        message: 'Erro no formato do token'
      });
    }
    
    const [scheme, token] = parts;
    
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        status: 'error',
        message: 'Token mal formatado'
      });
    }
    
    // Verificar validade do token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          message: 'Token inválido ou expirado'
        });
      }
      
      // Adicionar informações do usuário à requisição
      req.user = decoded;
      
      return next();
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro interno na autenticação'
    });
  }
};