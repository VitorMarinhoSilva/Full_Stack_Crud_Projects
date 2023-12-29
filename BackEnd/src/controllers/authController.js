const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');

// Usuário mockado para exemplo
const mockUser = {
  username: 'VitorM',
  password: '255452',
};

function authenticateUser(req, res, next) {
  // Obtenha as credenciais do corpo da solicitação
  const { username, password } = req.body;

  // Exemplo básico: Verifique se as credenciais são fornecidas
  if (!username || !password) {
    return res.status(401).json({ error: 'Credenciais ausentes' });
  }

  // Exemplo básico: Verifique se as credenciais correspondem ao usuário mockado
  if (!(username === mockUser.username && password === mockUser.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  req.user = { username };
  next();
}

function generateToken(req, res) {
  const { username } = req.user;

  const token = jwt.sign({ username }, secret, { expiresIn: '1h' });

  res.json({ token });
}

module.exports = { authenticateUser, generateToken };
