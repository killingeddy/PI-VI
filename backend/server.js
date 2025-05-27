const app = require('./src/app');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});