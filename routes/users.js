// Подключаем роутер Express
const router = require('express').Router();

// Импортируем контроллеры для получения и обновления информации о пользователе
const {
  getCurrentUserInfo,
  updateUserData,
} = require('../controllers/users');

// Импортируем валидатор для проверки входящих данных при обновлении информации о пользователе
const {
  updateUserValidator,
} = require('../middlewares/validators/validateUsers');

// Создаём маршрут GET /me для получения информации о текущем пользователе
router.get('/me', getCurrentUserInfo);

// Создаём маршрут PATCH /me для обновления информации о текущем пользователе.
// Здесь мы также используем middleware updateUserValidator для валидации входящих данных
router.patch('/me', updateUserValidator, updateUserData);

// Экспортируем router для использования в других модулях
module.exports = router;
