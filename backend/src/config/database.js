const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false }
    : false
});

// Tratamento de reconexão
pool.on('error', (err, client) => {
  console.error('❌ Erro inesperado no pool do PostgreSQL:', err);
});

// Teste inicial de conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('✅ Conectado com sucesso ao Supabase!', res.rows[0]);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
