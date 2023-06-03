// Подключаем модуль http2
const http2 = require('http2');

// Деструктурируем константы статусов HTTP для удобного использования
const {
  HTTP_STATUS_CREATED: CREATED_201,
  HTTP_STATUS_BAD_REQUEST: BAD_REQUEST_400,
  HTTP_STATUS_UNAUTHORIZED: UNAUTHORIZED_401,
  HTTP_STATUS_FORBIDDEN: FORBIDDEN_403,
  HTTP_STATUS_NOT_FOUND: NOT_FOUND_404,
  HTTP_STATUS_CONFLICT: CONFLICT_409,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: INTERNAL_SERVER_ERROR_500,
} = http2.constants;

// Регулярное выражение для валидации URL
const regExp = /^(https?|ftp):\/\/([a-zA-Z0-9_-]+(?:(?:\.[a-zA-Z0-9_-]+)+))(:[0-9]{1,5})?(\/[^\s]*)?$/m;

// Код ошибки MongoDB, указывающий на дублирование записи
const DUPLICATION_11000 = 11000;

// Определение сообщений ошибок и уведомлений

const DELETE_FORBIDDEN_ERROR = 'Удаление разрешено только для ваших фильмов';
const FILM_DELETED = 'Фильм успешно удалён';
const FILM_UNKNOWN_ERROR = 'Фильм не найден';
const INVALID_FILM_ID_ERROR = 'Id фильма не валидный';
const INVALID_USER_DATAS = 'Некорректный email или пароль';
const INVALID_USER_ID_ERROR = 'Id пользователя не валидный';
const LOGIN_REQUIRED = 'Необходима авторизация';
const SERVER_ERROR = 'Произошла неизвестная ошибка на сервере';
const SIGNIN_COMPLETED = 'Авторизация прошла успешно';
const SIGNOUT_COMPLETED = 'Сеанс завершён';
const USER_EXISTS_ERROR = 'Пользователь с таким email уже существует';
const USER_UNKNOWN_ERROR = 'Пользователь не найден';
const VALIDATION_ERROR = 'Введены неверные данные:';

// Экспортируем константы для использования в других частях приложения
module.exports = {
  CREATED_201,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  FORBIDDEN_403,
  NOT_FOUND_404,
  CONFLICT_409,
  INTERNAL_SERVER_ERROR_500,
  DUPLICATION_11000,
  DELETE_FORBIDDEN_ERROR,
  FILM_DELETED,
  FILM_UNKNOWN_ERROR,
  INVALID_FILM_ID_ERROR,
  INVALID_USER_DATAS,
  INVALID_USER_ID_ERROR,
  LOGIN_REQUIRED,
  SERVER_ERROR,
  SIGNIN_COMPLETED,
  SIGNOUT_COMPLETED,
  USER_EXISTS_ERROR,
  USER_UNKNOWN_ERROR,
  VALIDATION_ERROR,
  regExp,
};
