const router = require('express').Router();

router.all('/', (req, res) => {
  res.status(404).send({ message: `Запрошенный URL ${req.originalUrl} не найден` });
});

module.exports = router;
