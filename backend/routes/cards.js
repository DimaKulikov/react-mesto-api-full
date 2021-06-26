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
router.delete('/:cardId', joiValidator.deleteCard, deleteCard);
router.put('/likes/:cardId', joiValidator.putLike, putLike);
router.delete('/likes/:cardId', joiValidator.deleteLike, deleteLike);

module.exports = router;
