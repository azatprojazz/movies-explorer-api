// Подключаем роутер Express
const router = require('express').Router();

// Импортируем контроллеры для работы с фильмами
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

// Импортируем валидаторы для проверки входящих данных при работе с фильмами
const {
  verifyMovieData,
  validateMovieId,
} = require('../middlewares/validators/validateMovies');

// Создаём маршрут GET / для получения списка всех фильмов
router.get('/', getMovies);

// Создаём маршрут POST / для создания нового фильма.
// Перед созданием используем middleware verifyMovieData для валидации входящих данных.
router.post('/', verifyMovieData, createMovie);

// Создаём маршрут DELETE /:_id для удаления фильма по его идентификатору.
// До удаления используем middleware validateMovieId для валидации идентификатора фильма
router.delete('/:_id', validateMovieId, deleteMovieById);

// Экспортируем router для использования в других модулях
module.exports = router;
