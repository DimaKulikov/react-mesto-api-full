const User = require('../models/user');
const ApiError = require('../utils/apiError');

exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { userId: _id } = req.params;
  User.findOne({ _id })
    .orFail(ApiError.notFound('Пользователь с указанным _id не найден'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(ApiError.notFound('Пользователь с указанным _id не найден'));
        return;
      }
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id пользователя'));
        return;
      }
      next(err);
    });
};

exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .orFail(ApiError.notFound('Пользователь с указанным _id не найден'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(ApiError.notFound('Пользователь с указанным _id не найден'));
        return;
      }
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id пользователя'));
        return;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail(ApiError.notFound('Пользователь с переданным _id не найден'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(ApiError.validation(err));
        return;
      }
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id пользователя'));
        return;
      }
      next(err);
    });
};

exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(ApiError.notFound('Пользователь с переданным _id не найден'))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(ApiError.validation(err));
        return;
      }
      if (err.name === 'CastError') {
        next(ApiError.badRequest('Передан некорректный _id пользователя'));
        return;
      }
      next(err);
    });
};
