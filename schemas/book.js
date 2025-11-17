const Joi = require("joi");

module.exports = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  author: Joi.string().min(1).max(100).required(),
});
