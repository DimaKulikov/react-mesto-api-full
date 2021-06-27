const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ApiError = require('../utils/apiError');

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // if (!password || !email) {
  //   throw ApiError.badRequest('Необходимо передать email и пароль');
  // }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => {
      const response = { _id: data._id, email: data.email };
      res.send(response);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(ApiError.validation(err));
        return;
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        next(ApiError.conflict('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
