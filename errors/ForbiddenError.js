// Импорт константы для работы с HTTP-статусом 403
const { FORBIDDEN_403 } = require('../utils/appConstants');

// Класс ForbiddenError для создания ошибки с HTTP-статусом 403 (Запрещено)
class ForbiddenError extends Error {
  constructor(message) {
    super(message); // Передаем сообщение об ошибке в родительский класс Error
    this.statusCode = FORBIDDEN_403; // Устанавливаем HTTP-статус для ошибки
  }
}

// Экспортируем класс ошибки для использования в других модулях
module.exports = ForbiddenError;
