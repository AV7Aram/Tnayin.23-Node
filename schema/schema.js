const Joi = require('joi');
const { emit } = require('../app');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  lastname: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  age: Joi.number().min(1).max(120).required(),
  address: Joi.string().min(2).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required()
});

const editSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  lastname: Joi.string().min(2).max(30).required(),
  age: Joi.number().min(1).max(120).required(),
  email: Joi.string().email().required(), 
  address: Joi.string().min(2).max(100).required()
});

module.exports = { registerSchema, loginSchema, editSchema };