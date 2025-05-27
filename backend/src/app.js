const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Importação de rotas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const stockRoutes = require('./routes/stock.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const profileRoutes = require('./routes/profile.routes');
const recommendationRoutes = require('./routes/recommendations.routes');

// Inicialização do app
const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());

// Configuração do rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Algo deu errado!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Endpoint padrão
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API do Sistema de Recomendação de Ações funcionando!'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;