// Импортируем модуль Mongoose для работы с MongoDB
const mongoose = require('mongoose');

// Импортируем модуль validator для валидации email
const isEmail = require('validator/lib/isEmail');

// Импортируем модуль bcryptjs для хэширования паролей
const bcrypt = require('bcryptjs');

// Импортируем ошибку "Unauthorized"
const UnauthorizedError = require('../errors/UnauthorizedError');

// Импортируем константу сообщения об ошибке
const { INVALID_USER_DATAS } = require('../utils/appConstants');

// Создаём схему данных пользователя
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'не введен email'],
      unique: true,
      validate: {
        validator: (email) => isEmail(email), // валидация формата email
        message: 'Адрес email не соответствует формату',
      },
    },
    password: {
      type: String,
      required: [true, 'не введен пароль'],
      select: false, // пароль по умолчанию не отображается при запросе данных пользователя
    },
    name: {
      type: String,
      required: [true, 'не введено имя пользователя'],
      minlength: [2, 'недостаточная длина имени'],
      maxlength: [30, 'длина имени превышает 30 символов'],
    },
  },
  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

// Метод для поиска пользователя по учётным данным
userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  // Поиск пользователя по email
  const user = await this.findOne({ email }).select('+password'); // добавляем в выборку поле password
  if (!user) {
    // Если пользователь не найден, выбрасываем ошибку
    throw new UnauthorizedError(INVALID_USER_DATAS);
  }
  // Проверяем соответствие хэшированного пароля и введённого пароля
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    // Если пароли не совпадают, выбрасываем ошибку
    throw new UnauthorizedError(INVALID_USER_DATAS);
  }
  // Если всё в порядке, возвращаем данные пользователя
  return user;
};

// Создаём и экспортируем модель пользователя на основе схемы
module.exports = mongoose.model('user', userSchema);
