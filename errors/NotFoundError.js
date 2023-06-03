// Импорт константы для работы с HTTP-статусом 404
const { NOT_FOUND_404 } = require('../utils/appConstants');

// Класс NotFoundError для создания ошибки с HTTP-статусом 404 (Не найдено)
class NotFoundError extends Error {
  constructor(message) {
    super(message); // Передаем сообщение об ошибке в родительский класс Error
    this.statusCode = NOT_FOUND_404; // Устанавливаем HTTP-статус для ошибки
  }
}

// Экспортируем класс ошибки для использования в других модулях
module.exports = NotFoundError;
