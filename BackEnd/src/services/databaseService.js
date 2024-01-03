const mongoose = require('mongoose');
const { url, options } = require('../config/database');
const Project = require('../models/projectModel'); // Importe o modelo

// Conectar ao banco de dados
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, options)
      .then(() => {
        console.log('Banco de dados conectado com sucesso!');
        resolve();
      })
      .catch((error) => {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error.message);
        reject(error);
      });
  });
}

module.exports = { connectToDatabase, Project };