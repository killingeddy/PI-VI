const db = require('../src/config/database');

async function createTables() {
  try {
    console.log('Iniciando criação das tabelas...');
    
    // Criar tabela de usuários
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela users criada');
    
    // Criar tabela de perfis de investidor
    await db.query(`
      CREATE TABLE IF NOT EXISTS investor_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        profile_type VARCHAR(50) NOT NULL,
        risk_tolerance INTEGER NOT NULL,
        investment_horizon INTEGER NOT NULL,
        investment_experience INTEGER NOT NULL,
        monthly_income NUMERIC(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela investor_profiles criada');
    
    // Criar tabela de ações (específico para B3)
    await db.query(`
      CREATE TABLE IF NOT EXISTS stocks (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(20) UNIQUE NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        sector VARCHAR(100),
        risk_level INTEGER,
        risk_description VARCHAR(50),
        volatility NUMERIC(10,4),
        max_drawdown NUMERIC(5,4),
        beta NUMERIC(10,4),
        liquidity NUMERIC(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela stocks criada');
    
    // Criar tabela de preços históricos
    await db.query(`
      CREATE TABLE IF NOT EXISTS stock_prices (
        id SERIAL PRIMARY KEY,
        stock_id INTEGER REFERENCES stocks(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        open NUMERIC(10,2) NOT NULL,
        high NUMERIC(10,2) NOT NULL,
        low NUMERIC(10,2) NOT NULL,
        close NUMERIC(10,2) NOT NULL,
        volume BIGINT,
        UNIQUE(stock_id, date)
      )
    `);
    console.log('✅ Tabela stock_prices criada');
    
    // Criar tabela de portfólio
    await db.query(`
      CREATE TABLE IF NOT EXISTS portfolios (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        stock_id INTEGER REFERENCES stocks(id) ON DELETE CASCADE,
        quantity NUMERIC(10,2) NOT NULL,
        purchase_price NUMERIC(10,2) NOT NULL,
        purchase_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, stock_id)
      )
    `);
    console.log('✅ Tabela portfolios criada');
    
    console.log('✅ Todas as tabelas foram criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
  } finally {
    db.pool.end();
  }
}

createTables();