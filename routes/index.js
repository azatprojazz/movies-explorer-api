// Подключаем роутер Express
const router = require('express').Router();

// Импортируем маршруты для пользователей и фильмов
const users = require('./users');
const movies = require('./movies');

// Импортируем middleware для аутентификации
const auth = require('../middlewares/auth');

// Импортируем контроллеры для работы с пользователями
const { createUser, login, logout } = require('../controllers/users');

// Импортируем ошибку "NotFound"
const NotFoundError = require('../errors/NotFoundError');

// Импортируем валидаторы для проверки входящих данных при работе с пользователями
const {
  validateNewUser,
  verifyLoginData,
} = require('../middlewares/validators/validateUsers');

// Определяем маршрут POST /signup для регистрации нового пользователя. Перед созданием используем
// middleware validateNewUser для валидации входящих данных
router.post('/signup', validateNewUser, createUser);

// Определяем маршрут POST /signin для входа в систему. Перед входом используем middleware
// verifyLoginData для валидации входящих данных
router.post('/signin', verifyLoginData, login);

// Определяем маршрут /users и перед этим используем middleware для аутентификации
router.use('/users', auth, users);

// Определяем маршрут /movies и перед этим используем middleware для аутентификации
router.use('/movies', auth, movies);

// Определяем маршрут GET /signout для выхода из системы.
// Перед выходом используем middleware для аутентификации
router.get('/signout', auth, logout);

// Определяем универсальный маршрут, который будет срабатывать для всех неизвестных запросов.
// Если запрос не соответствует ни одному из известных маршрутов, будет создана ошибка "NotFound"
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// Экспортируем router для использования в других модулях
module.exports = router;
