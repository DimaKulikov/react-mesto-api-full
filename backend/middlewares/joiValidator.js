const { Joi, celebrate } = require('celebrate');
const { isUrl } = require('../utils/joi-methods');

exports.login = (celebrate({
  body:
    Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
}));

exports.signup = (celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isUrl, 'URL validation'),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}));

exports.getUser = (celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
}));

exports.updateUser = (celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}));

exports.updateAvatar = (celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(isUrl, 'URL validation').required(),
  }),
}));

exports.createCard = (celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(isUrl, 'URL validation').required(),
  }),
}));

exports.deleteCard = (celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}));

exports.putLike = (celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}));

exports.deleteLike = (celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}));
