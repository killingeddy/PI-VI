const { execSync } = require('child_process');
const path = require('path');

console.log('=== CONFIGURAÇÃO COMPLETA DO BANCO DE DADOS ===\n');

try {
  // Executar import-data.js
  console.log('>> Etapa 1: Importando dados básicos de ações e indicadores econômicos...\n');
  execSync('node ' + path.join(__dirname, 'import-data.js'), { stdio: 'inherit' });
  
  console.log('\n\n>> Etapa 2: Importando classificação de risco avançada...\n');
  execSync('node ' + path.join(__dirname, 'import-risk-data.js'), { stdio: 'inherit' });
  
  console.log('\n✅ Configuração do banco de dados concluída com sucesso!');
} catch (error) {
  console.error('\n❌ Erro na configuração do banco de dados');
  process.exit(1);
}
