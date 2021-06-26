const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(ApiError.authorization());
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    next(ApiError.authorization());
    return;
  }
  req.user = payload;
  next();
};
