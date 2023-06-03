// Импортируем константу для работы с HTTP-статусом 400
const { BAD_REQUEST_400 } = require('../utils/appConstants');

// Класс BadRequestError для создания ошибки с HTTP-статусом 400 (Плохой запрос)
class BadRequestError extends Error {
  constructor(message) {
    super(message); // Передаем сообщение об ошибке в родительский класс Error
    this.statusCode = BAD_REQUEST_400; // Устанавливаем HTTP-статус для ошибки
  }
}

// Экспортируем класс ошибки для использования в других модулях
module.exports = BadRequestError;
