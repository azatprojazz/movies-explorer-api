// Импортируем константу для работы с HTTP-статусом 409
const { CONFLICT_409 } = require('../utils/appConstants');

// Класс ConflictError для создания ошибки с HTTP-статусом 409 (Конфликт)
class ConflictError extends Error {
  constructor(message) {
    super(message); // Передаем сообщение об ошибке в родительский класс Error
    this.statusCode = CONFLICT_409; // Устанавливаем HTTP-статус для ошибки
  }
}

// Экспортируем класс ошибки для использования в других модулях
module.exports = ConflictError;
