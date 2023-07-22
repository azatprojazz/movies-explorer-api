// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:3000',
  'http://azatprojazz-movies.nomoredomains.rocks',
  'https://azatprojazz-movies.nomoredomains.rocks',
];

// Объявляем функцию мидлвэра, которая обрабатывает кросс-доменные запросы (CORS)
const cors = (req, res, next) => {
  const { origin } = req.headers; // Извлекаем источник запроса
  const { method } = req; // Извлекаем HTTP метод запроса
  // Строка со списком HTTP методов, которые разрешено использовать при кросс-доменных запросах
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // Извлекаем заголовки, которые браузер хочет использовать при кросс-доменном запросе
  const requestHeaders = req.headers['access-control-request-headers'];
  // Разрешаем браузеру отправлять куки и использовать ответ сервера для кросс-доменных запросов
  res.header('Access-Control-Allow-Credentials', true);
  // Если источник запроса присутствует в списке разрешенных
  if (allowedCors.includes(origin)) {
    // Разрешаем браузеру использовать источник запроса в кросс-доменных запросах
    res.header('Access-Control-Allow-Origin', origin);
  }
  // Если это предварительный запрос (HTTP метод OPTIONS)
  if (method === 'OPTIONS') {
    // Разрешаем браузеру использовать все HTTP методы в кросс-доменных запросах
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // Разрешаем браузеру использовать нужные заголовки в кросс-доменных запросах
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // Завершаем обработку запроса и отправляем ответ без тела
    res.end();
    return;
  }
  // Если это не предварительный запрос, передаем управление следующему обработчику
  next();
};

// Экспортируем мидлвэр для использования в других модулях
module.exports = cors;
