// Подключаем необходимые модули
require('dotenv').config(); // Инициализируем переменные окружения из файла .env
const express = require('express'); // Фреймворк для упрощения разработки веб-приложений
const mongoose = require('mongoose'); // ORM для работы с MongoDB
const cookieParser = require('cookie-parser'); // Парсер куки для Express
const { errors } = require('celebrate'); // Middleware для валидации запросов в Express
const helmet = require('helmet'); // Middleware для установки HTTP-заголовков для безопасности
const errorMiddleware = require('./middlewares/errorsMiddleware'); // Собственное middleware для обработки ошибок
const rateLimiter = require('./middlewares/rateLimiter'); // Middleware для ограничения количества запросов от каждого пользователя
const { requestLogger, errorLogger } = require('./middlewares/logger'); // Middleware для логгирования запросов и ошибок
const cors = require('./middlewares/cors'); // Middleware для управления CORS
const router = require('./routes/index'); // Подключаем роуты

// Подключаем конфигурационные параметры
const {
  PORT, DB,
} = require('./utils/appConfig');

const app = express(); // Создаем экземпляр Express-приложения
// Подключаемся к БД
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // Логгируем каждый запрос

// Устанавливаем middleware
app.use(rateLimiter); // Ограничиваем количество запросов
app.use(helmet()); // Устанавливаем безопасные HTTP-заголовки
app.use(cors); // Управляем CORS

// Парсим JSON и URL-кодированные данные
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Парсим куки
app.use(router); // Подключаем роуты

// Обрабатываем ошибки
app.use(errorLogger); // Логгируем ошибки
app.use(errors()); // Обрабатываем ошибки celebrate
app.use(errorMiddleware); // Обрабатываем прочие ошибки

app.listen(PORT); // Запускаем приложение на определенном порту
