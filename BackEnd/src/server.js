//Express Server
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;

app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

app.listen(port, cors(), () => {
  console.log(`Servidor rodando na porta ${port}`);
});
