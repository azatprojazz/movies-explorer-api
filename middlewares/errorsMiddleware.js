// Импортируем константы для обработки ошибок
const { INTERNAL_SERVER_ERROR_500, SERVER_ERROR } = require('../utils/appConstants');

// Мидлвэр для обработки ошибок
const errorMiddleware = (err, req, res, next) => {
  // Если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  // Отправляем статус и сообщение об ошибке в ответе
  // Если статус равен 500, отправляем общее сообщение об ошибке сервера
  // В противном случае отправляем сообщение из объекта ошибки
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR_500
        ? SERVER_ERROR
        : message,
    });
  next();
};

// Экспортируем middleware для обработки ошибок для использования в других частях приложения
module.exports = errorMiddleware;
