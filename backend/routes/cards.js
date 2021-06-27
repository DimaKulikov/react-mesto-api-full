const router = require('express').Router();
const joiValidator = require('../middlewares/joiValidator');

const {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', joiValidator.createCard, createCard);
router.delete('/:cardId', joiValidator.cardId, deleteCard);
router.put('/likes/:cardId', joiValidator.cardId, putLike);
router.delete('/likes/:cardId', joiValidator.cardId, deleteLike);

module.exports = router;
