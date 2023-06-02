const {
  NODE_ENV, // Режим окружения (обычно "development" или "production")
  PORT = 3000, // Порт, на котором будет запущено приложение. По умолчанию — 3000
  DB, // Строка подключения к базе данных в продакшене
  DB_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb', // Строка подключения к базе данных при разработке.
  // Если не задана, по умолчанию используется локальная MongoDB
  JWT_SECRET, // Секретный ключ для подписи JWT (JSON Web Tokens)
  DEV_JWT = 'DEV_JWT', // Секретный ключ для подписи JWT при разработке. Если не задан, используется "DEV_JWT"
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  DB,
  DB_DEV,
  JWT_SECRET,
  DEV_JWT,
};
