const validator = require('validator');

// eslint-disable-next-line import/prefer-default-export
exports.isUrl = (value, helpers) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    helpers.error('any.invalid');
  }
  return value;
};
