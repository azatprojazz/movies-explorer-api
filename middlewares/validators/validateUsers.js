const { celebrate, Joi } = require('celebrate');

// Валидация данных при регистрации нового пользователя
const validateNewUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

// Валидация данных при входе пользователя в систему
const verifyLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// Валидация данных при обновлении информации о пользователе
const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateNewUser,
  verifyLoginData,
  updateUserValidator,
};
