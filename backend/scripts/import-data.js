const fs = require('fs');  
const path = require('path');  
const csv = require('csv-parser');  
const db = require('../src/config/database');  

// Caminhos para os arquivos CSV  
const stocksFilePath = path.join(__dirname, '../data/bovespa_stocks.csv');  
const economicIndicatorsFilePath = path.join(__dirname, '../data/economic_indicators.csv');  

// Lista para armazenar símbolos de ações únicos para mapeamento  
const stockSymbols = new Set();  

// Função principal para importar dados  
async function importData() {  
  try {  
    console.log('Iniciando importação de dados básicos...');
    
    // Certificando que as tabelas estão criadas  
    if (typeof db.initializeDatabase === 'function') {
      await db.initializeDatabase();
    } else {
      console.log('AVISO: Função initializeDatabase não encontrada, presumindo que as tabelas já existem.');
    }
    
    // Identificar todos os símbolos de ações únicos  
    await identifyUniqueStocks();  
    
    // Importar os símbolos de ações para a tabela stocks  
    await importStockSymbols();  
    
    // Importar os preços de ações  
    await importStockPrices();  
    
    // Importar indicadores econômicos  
    await importEconomicIndicators();  
    
    // Classificar ações por risco (básico - apenas para ações sem classificação avançada)  
    await classifyStocksByRiskBasic();  
    
    // Gerar recomendações iniciais  
    await generateInitialRecommendations();  
    
    console.log('Importação de dados básicos concluída com sucesso!');
    console.log('Para classificação de risco avançada, execute: node import-risk-data.js');
  } catch (error) {  
    console.error('Erro ao importar dados:', error);  
  } finally {  
    // Fechar pool de conexão  
    db.pool.end();  
  }  
}  

// Identifica símbolos únicos de ações
async function identifyUniqueStocks() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(stocksFilePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.Symbol) {
          stockSymbols.add(row.Symbol);
        }
      })
      .on('end', () => {
        console.log(`Identificados ${stockSymbols.size} símbolos de ações únicos.`);
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Importa símbolos de ações para a tabela stocks
async function importStockSymbols() {  
  console.log('Importando símbolos de ações...');  
  
  // Le o arquivo JSON com metadados das ações  
  let stocksMetadata = {};  
  try {  
    const metadataPath = path.join(__dirname, '../data/stocks_metadata.json');  
    stocksMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));  
    console.log(`Carregados metadados para ${Object.keys(stocksMetadata).length} ações`);  
  } catch (error) {  
    console.error('Erro ao carregar metadados das ações:', error);  
    console.log('Usando dados fictícios como fallback...');  
    
    // Fallback para dados fictícios  
    stocksMetadata = {  
      'PETR4': { name: 'Petrobras', sector: 'Petróleo e Gás' },  
      'VALE3': { name: 'Vale', sector: 'Mineração' },  
      'ITUB4': { name: 'Itaú Unibanco', sector: 'Financeiro' },  
      'BBDC4': { name: 'Bradesco', sector: 'Financeiro' },  
      'ABEV3': { name: 'Ambev', sector: 'Bebidas' },
      // ...  
    };  
  }  
   
  for (const symbol of stockSymbols) {  
    const companyInfo = stocksMetadata[symbol] || {   
      name: `Empresa ${symbol}`,   
      sector: 'Setor não classificado'   
    };  
    
    try {  
      // Verificar se o símbolo já existe
      const checkResult = await db.query(  
        'SELECT id FROM stocks WHERE symbol = $1',  
        [symbol]  
      );  
      
      if (checkResult.rows.length === 0) {  
        await db.query(  
          `INSERT INTO stocks (  
            symbol, company_name, sector, industry, website, description,   
            market_cap, employees, risk_level, risk_description  
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,  
          [  
            symbol,   
            companyInfo.name,   
            companyInfo.sector,  
            companyInfo.industry || '',  
            companyInfo.website || '',  
            companyInfo.description || '',  
            companyInfo.market_cap || 0,  
            companyInfo.employees || 0,  
            3, // Nível de risco médio (temporário)  
            'Médio' // Descrição de risco temporária  
          ]  
        );  
      }  
    } catch (error) {  
      console.error(`Erro ao inserir símbolo ${symbol}:`, error);  
    }  
  }  
  
  console.log('Símbolos de ações importados com sucesso.');  
}  

// Importa preços históricos das ações
async function importStockPrices() {
  console.log('Importando preços de ações...');
  
  // Primeiro, obtemos os IDs de todas as ações
  const stocksResult = await db.query('SELECT id, symbol FROM stocks');
  const stocks = stocksResult.rows.reduce((acc, stock) => {
    acc[stock.symbol] = stock.id;
    return acc;
  }, {});
  
  // Contadores para acompanhamento
  let processedRows = 0;
  const batchSize = 1000; // Processa em lotes para melhorar performance
  let currentBatch = [];
  
  // Função para processar lote atual
  const processBatch = async () => {
    if (currentBatch.length === 0) return;
    
    // Usar uma transação para inserções em lote
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      
      for (const row of currentBatch) {
        await client.query(
          `INSERT INTO stock_prices (stock_id, date, adj_close, close, high, low, open, volume)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (stock_id, date) DO NOTHING`,
          [
            stocks[row.Symbol],
            new Date(row.Date),
            parseFloat(row['Adj Close']) || 0,
            parseFloat(row.Close) || 0,
            parseFloat(row.High) || 0,
            parseFloat(row.Low) || 0,
            parseFloat(row.Open) || 0,
            parseInt(row.Volume) || 0
          ]
        );
      }
      
      await client.query('COMMIT');
      processedRows += currentBatch.length;
      console.log(`Processados ${processedRows} registros de preços...`);
      currentBatch = [];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao inserir lote de preços:', error);
    } finally {
      client.release();
    }
  };
  
  // Processar o arquivo CSV
  return new Promise((resolve, reject) => {
    const parser = fs.createReadStream(stocksFilePath).pipe(csv());
    
    parser.on('data', async (row) => {
      if (row.Symbol && stocks[row.Symbol]) {
        currentBatch.push(row);
        
        if (currentBatch.length >= batchSize) {
          // Pausar o stream para processar o lote atual
          parser.pause();
          await processBatch();
          parser.resume();
        }
      }
    });
    
    parser.on('end', async () => {
      // Processar o último lote
      await processBatch();
      console.log(`Importação de preços concluída. Total: ${processedRows} registros.`);
      resolve();
    });
    
    parser.on('error', (error) => {
      reject(error);
    });
  });
}

// Importa indicadores econômicos
async function importEconomicIndicators() {
  console.log('Importando indicadores econômicos...');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(economicIndicatorsFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          // Convertendo nomes de colunas
          await db.query(
            `INSERT INTO economic_indicators (
              date, selic_rate, ipca, igpm, inpc, unemployment_rate
            ) VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (date) DO NOTHING`,
            [
              new Date(row.Date),
              parseFloat(row['Taxa Selic']) || null,
              parseFloat(row['IPCA']) || null,
              parseFloat(row['IGP-M']) || null,
              parseFloat(row['INPC']) || null,
              parseFloat(row['Desemprego PNADC']) || null
            ]
          );
        } catch (error) {
          console.error('Erro ao inserir indicador econômico:', error);
        }
      })
      .on('end', () => {
        console.log('Indicadores econômicos importados com sucesso.');
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Classifica ações por risco com base na volatilidade histórica (método básico)
async function classifyStocksByRiskBasic() {  
  console.log('Classificando ações por risco (método básico)...');  
  console.log('Nota: Esta classificação será substituída por qualquer classificação avançada já existente.');  
  
  try {  
    // Obter ações que ainda não foram classificadas pelo método avançado
    const stocksResult = await db.query(`
      SELECT id, symbol
      FROM stocks
      WHERE (
        volatility = 0 OR volatility IS NULL OR 
        max_drawdown = 0 OR max_drawdown IS NULL OR 
        beta = 1 OR beta IS NULL OR 
        liquidity = 0 OR liquidity IS NULL
      )
    `);  
    
    console.log(`Encontradas ${stocksResult.rowCount} ações sem classificação avançada.`);  
    
    for (const stock of stocksResult.rows) {  
      // Calcular a volatilidade (desvio padrão dos retornos diários)  
      const volatilityResult = await db.query(`  
        WITH daily_returns AS (  
          SELECT   
            date,  
            (adj_close / LAG(adj_close) OVER (ORDER BY date) - 1) * 100 AS return_pct  
          FROM stock_prices  
          WHERE stock_id = $1  
          ORDER BY date  
        )  
        SELECT STDDEV(return_pct) AS volatility  
        FROM daily_returns  
        WHERE return_pct IS NOT NULL  
      `, [stock.id]);  
      
      let volatility = volatilityResult.rows[0]?.volatility || 0;  
      
      // Classificar com base na volatilidade
      let riskLevel, riskDescription;  
      
      if (volatility < 1.0) {  
        riskLevel = 1;  
        riskDescription = 'Muito Baixo';  
      } else if (volatility < 2.0) {  
        riskLevel = 2;  
        riskDescription = 'Baixo';  
      } else if (volatility < 3.0) {  
        riskLevel = 3;  
        riskDescription = 'Médio';  
      } else if (volatility < 4.0) {  
        riskLevel = 4;  
        riskDescription = 'Alto';  
      } else {  
        riskLevel = 5;  
        riskDescription = 'Muito Alto';  
      }  
      
      // Atualizar a classificação de risco
      await db.query(  
        `UPDATE stocks   
         SET risk_level = $1,   
             risk_description = $2,   
             volatility = $3,  
             updated_at = CURRENT_TIMESTAMP   
         WHERE id = $4`,  
        [riskLevel, riskDescription, volatility, stock.id]  
      );  
      
      console.log(`Ação ${stock.symbol} classificada como risco ${riskDescription} (nível ${riskLevel}, volatilidade: ${volatility})`);
    }
    
    console.log('Classificação básica de risco concluída.');  
  } catch (error) {  
    console.error('Erro ao classificar ações por risco:', error);  
  }  
}

// Gera recomendações iniciais com base no perfil e nível de risco
async function generateInitialRecommendations() {
  console.log('Gerando recomendações iniciais...');
  
  try {
    // Obter todas as ações com suas classificações de risco
    const stocksResult = await db.query('SELECT id, symbol, risk_level FROM stocks');
    
    // Definir perfis
    const profiles = ['Conservador', 'Moderado', 'Arrojado'];
    
    for (const stock of stocksResult.rows) {
      // Calcular pontuação para cada perfil
      for (const profile of profiles) {
        let score;
        
        // Lógica de pontuação baseada no perfil e nível de risco (1-5)
        const riskLevel = stock.risk_level || 3; // Default para médio
        
        if (profile === 'Conservador') {
          // Pontuação diminui conforme o risco aumenta
          score = 100 - (riskLevel - 1) * 20;
        } 
        else if (profile === 'Moderado') {
          // Pontuação máxima para risco médio (3)
          score = 100 - Math.abs(riskLevel - 3) * 15;
        }
        else { // Arrojado
          // Pontuação aumenta conforme o risco aumenta
          score = 40 + (riskLevel - 1) * 15;
        }
        
        // Adicionar alguma aleatoriedade para diversificar as recomendações
        score = Math.min(100, Math.max(0, score + (Math.random() * 10 - 5)));
        
        // Inserir ou atualizar recomendação
        await db.query(`
          INSERT INTO stock_recommendations (profile_type, stock_id, recommendation_score)
          VALUES ($1, $2, $3)
          ON CONFLICT (profile_type, stock_id) 
          DO UPDATE SET recommendation_score = $3, updated_at = CURRENT_TIMESTAMP
        `, [profile, stock.id, score]);
      }
    }
    
    console.log('Recomendações iniciais geradas com sucesso.');
  } catch (error) {
    console.error('Erro ao gerar recomendações iniciais:', error);
  }
}

importData();
