// Express Server
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('../src/services/databaseService');
const projectRoutes = require('../src/routes/projectRoutes');
const { port } = require('../src/config/express');

async function startServer() {
  try {
    // Aguarde a conclusão da conexão ao banco de dados antes de iniciar o servidor
    await connectToDatabase();

    const app = express();

    app.use(express.json()); // Habilita o uso de JSON no corpo das requisições
    app.use(cors());

    // Adicione as rotas do projeto
    app.use('/api', projectRoutes);

    app.get('/', (req, res) => {
      res.status(200).send('API funcionando');
    });

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
    process.exit(1);
  }
}

startServer();
