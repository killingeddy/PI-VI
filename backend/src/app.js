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
const pipelineRoutes = require('./routes/pipeline.routes');
const authRateLimiter = require('./middleware/rateLimiter');

// Inicialização do app
const app = express();

// Middleware de segurança
app.use(helmet());
app.use(cors());
app.use(express.json());


// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/pipeline', pipelineRoutes); 
app.use('/api/auth', authRateLimiter, authRoutes); 

// Middleware para rotas não encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint não encontrado'
  });
});

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
  if (process.env.NODE_ENV === 'development') {  
    res.json({  
      status: 'success',  
      message: 'API do Sistema de Recomendação de Ações funcionando!',  
      env: process.env.NODE_ENV  
    });  
  } else {  
    res.status(200).send('OK');  
  }  
});  

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;