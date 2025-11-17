const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string().trim().min(1).max(30).required(),
    password: Joi.string().min(1).max(100).required(),
});

const userCreateSchema = Joi.object({
    username: Joi.string().trim().min(1).max(30).required(),
    password: Joi.string().min(1).max(100).required(),
});

module.exports = { userSchema, userCreateSchema };
