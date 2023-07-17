// Импортируем классы ошибок из модуля mongoose
const { CastError, ValidationError } = require('mongoose').Error;

// Импортируем классы ошибок
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// Импортируем модель Movie
const Movie = require('../models/movie');

// Импортируем константы
const {
  CREATED_201,
  VALIDATION_ERROR,
  FILM_UNKNOWN_ERROR,
  DELETE_FORBIDDEN_ERROR,
  FILM_DELETED,
  INVALID_FILM_ID_ERROR,
} = require('../utils/appConstants');

// Обработчик запроса списка фильмов
const getMovies = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({ owner: userId }).populate(['owner']);
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

// Обработчик создания фильма
const createMovie = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.create({ ...req.body, owner });
    const populatedMovie = await movie.populate('owner');
    res.status(CREATED_201).send(populatedMovie);
  } catch (err) {
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

// Обработчик удаления фильма по идентификатору
const deleteMovieById = async (req, res, next) => {
  const movieId = req.params._id;
  const userId = req.user._id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError(FILM_UNKNOWN_ERROR);
    }
    if (userId !== movie.owner.toString()) {
      throw new ForbiddenError(DELETE_FORBIDDEN_ERROR);
    }
    await Movie.deleteOne({ _id: movieId });
    res.send({ message: FILM_DELETED });
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError(INVALID_FILM_ID_ERROR));
    } else {
      next(err);
    }
  }
};

// Экспортируем обработчики
module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
