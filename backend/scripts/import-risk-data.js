const fs = require('fs');
const csv = require('csv-parser');
const db = require('../src/config/database');

const RISK_DATA_PATH = './data/classified_stocks_b3.csv';

async function importRiskData() {
  try {
    console.log('Iniciando importação dos dados de risco das ações B3...');
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(RISK_DATA_PATH)) {
      console.error(`Arquivo de classificação de risco não encontrado: ${RISK_DATA_PATH}`);
      process.exit(1);
    }
    
    const riskData = [];
    
    // Ler arquivo CSV gerado pelo notebook
    fs.createReadStream(RISK_DATA_PATH)
      .pipe(csv())
      .on('data', (data) => riskData.push(data))
      .on('end', async () => {
        console.log(`Lidos ${riskData.length} registros do arquivo CSV`);
        
        let updated = 0;
        let created = 0;
        let skipped = 0;
        
        // Processar cada registro
        for (const item of riskData) {
          try {
            const { Ticker, Volatility, Max_Drawdown, Beta, Liquidity, Risk_Level, Risk_Description } = item;
            
            // Verificar se a ação já existe
            const existingStock = await db.query(
              'SELECT id FROM stocks WHERE symbol = $1',
              [Ticker]
            );
            
            if (existingStock.rows.length > 0) {
              // Atualizar ação existente
              await db.query(
                `UPDATE stocks 
                 SET risk_level = $1, 
                     risk_description = $2, 
                     volatility = $3, 
                     max_drawdown = $4, 
                     beta = $5, 
                     liquidity = $6, 
                     updated_at = CURRENT_TIMESTAMP
                 WHERE symbol = $7`,
                [Risk_Level, Risk_Description, Volatility, Max_Drawdown, Beta, Liquidity, Ticker]
              );
              updated++;
            } else {
              // Criar um registro básico para esta ação
              await db.query(
                `INSERT INTO stocks 
                 (symbol, company_name, risk_level, risk_description, 
                  volatility, max_drawdown, beta, liquidity)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [Ticker, Ticker, Risk_Level, Risk_Description, 
                 Volatility, Max_Drawdown, Beta, Liquidity]
              );
              created++;
            }
          } catch (error) {
            console.error(`Erro ao importar ${item.Ticker}:`, error);
            skipped++;
          }
        }
        
        console.log('\n=== Resumo da Importação ===');
        console.log(`✓ Ações atualizadas: ${updated}`);
        console.log(`✓ Ações criadas: ${created}`);
        console.log(`✗ Ações ignoradas devido a erros: ${skipped}`);
        
        // Estatísticas de distribuição de risco
        const riskDistribution = await db.query(`
          SELECT risk_description, COUNT(*) as count 
          FROM stocks 
          GROUP BY risk_description 
          ORDER BY risk_description
        `);
        
        console.log('\n=== Distribuição de Risco ===');
        riskDistribution.rows.forEach(row => {
          console.log(`${row.risk_description}: ${row.count} ações`);
        });
        
        console.log('\n✓ Importação concluída com sucesso!');
        process.exit(0);
      })
      .on('error', (error) => {
        console.error('Erro ao ler arquivo CSV:', error);
        process.exit(1);
      });
  } catch (error) {
    console.error('Erro ao importar dados de risco:', error);
    process.exit(1);
  }
}

importRiskData();
