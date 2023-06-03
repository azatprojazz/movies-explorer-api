const {
  NODE_ENV, // Режим окружения (обычно "development" или "production")
  PORT = 3000, // Порт, на котором будет запущено приложение. По умолчанию — 3000
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb', // Строка подключения к базе данных в продакшене
  JWT_SECRET, // Секретный ключ для подписи JWT (JSON Web Tokens)
  DEV_JWT = 'DEV_JWT', // Секретный ключ для подписи JWT при разработке. Если не задан, используется "DEV_JWT"
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  DB,
  JWT_SECRET,
  DEV_JWT,
};
