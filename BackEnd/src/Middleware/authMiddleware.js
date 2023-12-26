const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');

function authenticateToken(req, res, next) {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
