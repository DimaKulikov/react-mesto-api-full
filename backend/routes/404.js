const router = require('express').Router();
const ApiError = require('../utils/apiError');

router.all('/', () => {
  throw ApiError.notFound('Запрошенный URL не найден');
});

module.exports = router;
