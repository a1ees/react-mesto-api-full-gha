const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unathorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // пытаемся получить токен из заголовка Authorization
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // пытаемся получить токен из кук
  const tokenFromCookie = req.cookies.jwt;

  // используем токен из заголовка, если он есть, иначе из кук
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Неверный токен, необходима авторизация'));
  }

  req.user = payload;
  next();
};
