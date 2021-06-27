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
router.put('/:cardId/likes', joiValidator.cardId, putLike);
router.delete('/:cardId/likes', joiValidator.cardId, deleteLike);

module.exports = router;
