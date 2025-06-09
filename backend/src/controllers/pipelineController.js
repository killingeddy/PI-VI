const { exec } = require('child_process');
const path = require('path');

class PipelineController {
  static runClassification(req, res) {
    // Caminho absoluto do script Python
    const scriptPath = path.resolve(__dirname, '../../run_classification.py');
    
    // Executa o script Python
    exec(`python3 "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao executar pipeline:', error, stderr);
        return res.status(500).json({ status: 'error', message: 'Erro ao executar pipeline', details: stderr });
      }
      res.json({ status: 'success', message: 'Pipeline executado com sucesso', output: stdout });
    });
  }
}

module.exports = PipelineController;
