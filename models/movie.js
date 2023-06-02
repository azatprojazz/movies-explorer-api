// Импортируем модуль mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Импортируем модуль validator для валидации URL
const isUrl = require('validator/lib/isURL');

// Создаём схему для фильма
const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'страна создания фильма не введена'],
    },
    director: {
      type: String,
      required: [true, 'режиссер фильма не указан'],
    },
    duration: {
      type: Number,
      required: [true, 'длительность фильма не введено'],
    },
    year: {
      type: String,
      required: [true, 'год выпуска фильма не ввели'],
    },
    description: {
      type: String,
      required: [true, 'описание фильма отсутствует'],
    },
    image: {
      type: String,
      required: [true, 'ссылка на постер к фильму отсутствует'],
      validate: {
        validator(url) {
          return isUrl(url, { protocols: ['http', 'https'], require_protocol: true });
        },
        message: 'Неверный формат URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'ссылка на трейлер фильма не указанна'],
      validate: {
        validator(url) {
          return isUrl(url, { protocols: ['http', 'https'], require_protocol: true });
        },
        message: 'Неверный формат URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'миниатюрное изображение постера к фильму отсутствует'],
      validate: {
        validator(url) {
          return isUrl(url, { protocols: ['http', 'https'], require_protocol: true });
        },
        message: 'Неверный формат URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, '_id пользователя, который сохранил фильм не введено'],
    },
    movieId: {
      type: Number,
      required: [true, 'id фильма, который содержится в ответе сервиса MoviesExplorer не введено'],
    },
    nameRU: {
      type: String,
      required: [true, 'название фильма на русском языке не введено'],
    },
    nameEN: {
      type: String,
      required: [true, 'название фильма на английском языке не введено'],
    },
  },
  { versionKey: false }, // Опции схемы. Удаляем поле __v
);

// Экспортируем модель 'фильм' на основе схемы
module.exports = mongoose.model('movie', movieSchema);
