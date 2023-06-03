// Импортируем модули winston и express-winston для логирования
const winston = require('winston');
const expressWinston = require('express-winston');

// Создаём логгер запросов с помощью expressWinston
// Записываем все запросы в файл request.log в формате json
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// Создаём логгер ошибок
// Записываем все ошибки в файл error.log в формате json
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// Экспортируем логгеры для дальнейшего использования в приложении
module.exports = {
  requestLogger,
  errorLogger,
};
