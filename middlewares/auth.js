// Импортируем модуль jsonwebtoken, который позволяет создавать и проверять JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Импортируем настройки приложения
const { NODE_ENV, JWT_SECRET, DEV_JWT } = require('../utils/appConfig');

// Импортируем класс ошибки UnauthorizedError
const UnauthorizedError = require('../errors/UnauthorizedError');

// Импортируем константу сообщения об ошибке
const { LOGIN_REQUIRED } = require('../utils/appConstants');

// Объявляем функцию мидлвэра, которая проверяет наличие и валидность JWT в куках запроса
module.exports = (req, res, next) => {
  // Извлекаем JWT из кук запроса
  const token = req.cookies.jwt;
  // Если JWT не передан
  if (!token) {
    // Возвращаем ошибку UnauthorizedError и прерываем выполнение кода
    return next(new UnauthorizedError(LOGIN_REQUIRED));
  }
  // Объявляем переменную для хранения расшифрованных данных JWT (payload)
  let payload;
  try {
    // Пытаемся проверить JWT и извлечь из него данные
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT);
  } catch (err) {
    // Если при проверке JWT произошла ошибка, возвращаем ошибку UnauthorizedError
    return next(new UnauthorizedError(LOGIN_REQUIRED));
  }
  // Записываем извлеченные из JWT данные в объект запроса
  req.user = payload;
  // Передаем управление следующему обработчику
  return next();
};
