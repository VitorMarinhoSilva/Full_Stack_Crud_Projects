const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  nomeDoProjeto: {
    type: String,
    required: true,
  },
  prioridade: {
    type: String,
    enum: ['Baixa', 'Média', 'Alta'],
    default: 'Média',
  },
  dataDeCriacao: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('projects', projectSchema);

module.exports = Project;
