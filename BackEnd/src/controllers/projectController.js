// projectController.js

const Project = require('../models/projectModel');
const moment = require('moment');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { nomeDoProjeto, prioridade } = req.body;
     // Verifica se um projeto com o mesmo nome já existe
     const projetoExistente = await Project.findOne({ nomeDoProjeto });

     if (projetoExistente) {
       return res.status(400).json({ error: 'Este projeto já existe no banco de dados.' });
     }

    const newProject = new Project({ nomeDoProjeto, prioridade });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateProject = async (req, res) => {
    try {
      const { nomeDoProjeto, prioridade } = req.body;
      const projectId = req.params.id;
  
      // Verifica se o projeto com o ID fornecido existe
      const projetoExistente = await Project.findById(projectId);
  
      if (!projetoExistente) {
        return res.status(404).json({ error: 'Projeto não encontrado.' });
      }
  
      // Atualiza os campos do projeto
      projetoExistente.nomeDoProjeto = nomeDoProjeto || projetoExistente.nomeDoProjeto;
      projetoExistente.prioridade = prioridade || projetoExistente.prioridade;
  
      // Salva as alterações no banco de dados
      const updatedProject = await projetoExistente.save();
  
      // Formata a data antes de enviar a resposta
      updatedProject.dataDeCriacao = moment(updatedProject.dataDeCriacao).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
