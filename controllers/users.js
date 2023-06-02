// Импортируем класс ошибки валидации из модуля mongoose
const { ValidationError } = require('mongoose').Error;

// Импортируем модуль bcrypt для хэширования паролей
const bcrypt = require('bcryptjs');

// Импортируем модуль jsonwebtoken для работы с JWT токенами
const jwt = require('jsonwebtoken');

// Импортируем классы ошибок
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

// Импортируем модель User
const User = require('../models/user');

// Импортируем константы
const {
  CREATED_201,
  DUPLICATION_11000,
  VALIDATION_ERROR,
  USER_EXISTS_ERROR,
  SIGNIN_COMPLETED,
  SIGNOUT_COMPLETED,
  USER_UNKNOWN_ERROR,
} = require('../utils/appConstants');

// Импортируем настройки приложения
const { NODE_ENV, JWT_SECRET, DEV_JWT } = require('../utils/appConfig');

// Обработчик запроса информации о текущем пользователе
const getCurrentUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError(USER_UNKNOWN_ERROR);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

// Обработчик создания пользователя
const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(CREATED_201).send({ data: userResponse });
  } catch (err) {
    if (err.code === DUPLICATION_11000) {
      next(new ConflictError(USER_EXISTS_ERROR));
      return;
    }
    if (err instanceof ValidationError) {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(', ');
      next(new BadRequestError(`${VALIDATION_ERROR} ${errorMessage}`));
    } else {
      next(err);
    }
  }
};

// Обработчик входа в систему
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT, { expiresIn: '7d' });
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .send({ message: SIGNIN_COMPLETED });
  } catch (err) {
    next(err);
  }
};

// Обработчик выхода из системы
const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: SIGNOUT_COMPLETED });
};

// Обработчик обновления данных пользователя
const updateUserData = async (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new NotFoundError(USER_UNKNOWN_ERROR);
    }
    res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(USER_EXISTS_ERROR));
      return;
    }
    if (err instanceof ValidationError) {
      const errorMessage = Object.values(err.errors)
        .map((error) => error.message)
        .join(', ');
      next(new BadRequestError(`${VALIDATION_ERROR} ${errorMessage}`));
    } else {
      next(err);
    }
  }
};

// Экспортируем обработчики
module.exports = {
  getCurrentUserInfo,
  createUser,
  login,
  logout,
  updateUserData,
};
