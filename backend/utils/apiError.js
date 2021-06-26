module.exports = class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }

  static validation(errOrMsg = 'Переданы некорректные данные') {
    let msg;
    if (errOrMsg.errors) {
      msg = Object.values(errOrMsg.errors).map((e) => e.message).join(', ');
    } else if (typeof errOrMsg === 'string') {
      msg = errOrMsg;
    }
    return new ApiError(400, msg);
  }

  static badRequest(msg = 'Переданы некорректные данные') {
    return new ApiError(400, msg);
  }

  static authentication(msg = 'Неверные email или пароль') {
    return new ApiError(401, msg);
  }

  static authorization(msg = 'Требуется авторизация') {
    return new ApiError(403, msg);
  }

  static notFound(msg = 'Не найдено результатов по заданным параметрам') {
    return new ApiError(404, msg);
  }

  static conflict(msg = 'Переданы некорректные данные') {
    return new ApiError(409, msg);
  }
};
