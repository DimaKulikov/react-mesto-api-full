const { isCelebrateError } = require('celebrate');
const ApiError = require('../utils/apiError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  if (isCelebrateError(err)) {
    res.status(400).send({ message: err.details.get(err.details.keys().next().value).message });
    return;
  }

  res.status(500).send({ message: 'На сервере произошла ошибка' });
};
