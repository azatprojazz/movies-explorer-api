// Импортируем модули celebrate и Joi для валидации данных
const { celebrate, Joi } = require('celebrate');

// Импортируем регулярное выражение для проверки URL
const { regExp } = require('../../utils/appConstants');

// Создаем валидатор данных фильма с помощью celebrate и Joi
const verifyMovieData = celebrate({
  body: Joi.object().keys({
    // все поля обязательны, некоторые поля проверяются на соответствие регулярному выражению
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExp),
    trailerLink: Joi.string().required().pattern(regExp),
    thumbnail: Joi.string().required().pattern(regExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Создаем валидатор ID фильма с помощью celebrate и Joi
const validateMovieId = celebrate({
// Параметры запроса должны содержать валидный hex-строковый _id длиной 24 символа
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

// Экспортируем валидаторы
module.exports = {
  verifyMovieData,
  validateMovieId,
};
