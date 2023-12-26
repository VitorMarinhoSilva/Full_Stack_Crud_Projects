const Project = require('../models/projectModel');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');

// Função para validar o token JWT
function validateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação ausente' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticação inválido' });
    }

    req.user = decoded;
    next();
  });
}

exports.getProjects = async (req, res) => {
  try {
    // Validar o token antes de executar a lógica da rota
    validateToken(req, res, async () => {
      const projects = await Project.find();
      res.status(200).json(projects);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    // Validar o token antes de executar a lógica da rota
    validateToken(req, res, async () => {
      const projectId = req.params.id;

      // Verificar se o ID do projeto é válido
      if (!projectId) {
        return res.status(400).json({ error: 'ID do projeto ausente' });
      }

      // Buscar o projeto pelo ID no banco de dados
      const project = await Project.findById(projectId);

      // Verificar se o projeto existe
      if (!project) {
        return res.status(404).json({ error: 'Projeto não encontrado.' });
      }

      res.status(200).json(project);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createProject = async (req, res) => {
  try {
    // Validar o token antes de executar a lógica da rota
    validateToken(req, res, async () => {
      const { nomeDoProjeto, prioridade } = req.body;
      // Restante do código...
      res.status(201).json(savedProject);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    // Validar o token antes de executar a lógica da rota
    validateToken(req, res, async () => {
      const { nomeDoProjeto, prioridade } = req.body;
      const projectId = req.params.id;
      // Restante do código...
      res.status(200).json(updatedProject);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    // Validar o token antes de executar a lógica da rota
    validateToken(req, res, async () => {
      const projectId = req.params.id;
      // Restante do código...
      res.status(200).json({ message: 'Projeto removido com sucesso.' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
