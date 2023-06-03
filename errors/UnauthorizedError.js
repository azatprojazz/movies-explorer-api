// Импорт констант для работы с HTTP-статусами
const { UNAUTHORIZED_401 } = require('../utils/appConstants');

// Класс UnauthorizedError для создания ошибки с HTTP-статусом 401 (Не авторизован)
class UnauthorizedError extends Error {
  constructor(message) {
    super(message); // Передаем сообщение об ошибке в родительский класс Error
    this.statusCode = UNAUTHORIZED_401; // Устанавливаем HTTP-статус для ошибки
  }
}

// Экспортируем класс ошибки для использования в других модулях
module.exports = UnauthorizedError;
