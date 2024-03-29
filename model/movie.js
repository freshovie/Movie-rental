const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require('../model/genre') 

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 225,
  },

  genre: {
    type: genreSchema,
    require: true,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },

  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const Schema = {
    title: Joi.string().min(5).max(225).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };
  return Joi.validate(movie, Schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
