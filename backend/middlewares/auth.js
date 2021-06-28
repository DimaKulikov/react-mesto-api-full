const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(ApiError.authentication('Требуется авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(ApiError.authentication('Требуется авторизация'));
    return;
  }
  req.user = payload;
  next();
};
