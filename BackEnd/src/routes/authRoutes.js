const express = require('express');
const router = express.Router();
const { authenticateUser, generateToken } = require('../controllers/authController');

// Rota para autenticar o usuário e gerar um token
router.post('/login', authenticateUser, generateToken);

// Rota protegida que requer autenticação (remova o middleware nesta rota)
router.get('/protected', (req, res) => {
  res.json({ message: 'Rota protegida alcançada com sucesso!' });
});

module.exports = router;
