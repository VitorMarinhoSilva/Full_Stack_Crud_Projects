const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Rota para obter todos os projetos
router.get('/projects', projectController.getProjects);

// Rota para criar um novo projeto
router.post('/projects', projectController.createProject);

// Rota para atualizar um projeto existente
router.put('/projects/:id', projectController.updateProject);

module.exports = router;
