const Card = require('../models/card');
const ApiError = require('../utils/apiError');

exports.getAllCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(ApiError.validation(err));
        return;
      }
      next(err);
    });
};

exports.deleteCard = (req, res, next) => {
  const { user } = req;
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(ApiError.notFound('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() !== user._id) {
        next(ApiError.authorization('Пользователь не является автором карточки'));
        return;
      }
      // eslint-disable-next-line consistent-return
      return Card.findOneAndDelete({ _id: card._id });
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id карточки'));
        return;
      }
      next(err);
    });
};

exports.putLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(ApiError.notFound('Карточка не найдена'))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id карточки'));
        return;
      }
      next(err);
    });
};

exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(ApiError.notFound('Карточка не найдена'))
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id карточки'));
        return;
      }
      next(err);
    });
};
