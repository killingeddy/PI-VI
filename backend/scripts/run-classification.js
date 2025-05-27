const { spawn } = require('child_process');
const path = require('path');

async function runPythonClassification() {
  return new Promise((resolve, reject) => {
    console.log('Iniciando classificação de risco via Python...');
    
    // Caminho para o script Python **corrigir caminho***
    const scriptPath = path.resolve(__dirname, '../python/run_classification.py');
    
    // Executar o script Python
    const pythonProcess = spawn('python', [scriptPath]);
    
    // Capturar saída
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python: ${data}`);
    });
    
    // Capturar erros
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Erro Python: ${data}`);
    });
    
    // Quando finalizar
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Classificação de risco finalizada com sucesso!');
        resolve();
      } else {
        console.error(`❌ Erro ao executar classificação de risco. Código: ${code}`);
        reject(new Error(`Processo Python encerrou com código ${code}`));
      }
    });
  });
}


// Executar e importar os resultados
async function main() {
  try {
    // Executar classificação via Python
    await runPythonClassification();
    
    // Importar resultados para o banco
    const importScript = require('./import-risk-data');
    await importScript();
    
    console.log('✅ Processo completo finalizado com sucesso!');
  } catch (error) {
    console.error('❌ Erro no processo:', error);
  }
}

main();
