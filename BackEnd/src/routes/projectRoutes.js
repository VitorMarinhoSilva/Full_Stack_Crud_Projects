const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Rota para obter todos os projetos 
router.get('/projects', projectController.getProjects);

// Rota para obter um projeto pelo ID
router.get('/projects/:id', projectController.getProjectById);

// Rota para criar um novo projeto
router.post('/projects', projectController.createProject);

// Rota para atualizar um projeto existente
router.put('/projects/:id', projectController.updateProject);

// Rota para excluir um projeto
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
