const Joi = require("joi");

module.exports = Joi.object({
    username: Joi.string().trim().min(1).max(30).required(),
    password: Joi.string().min(1).max(100).required(),
    isAdmin: Joi.boolean().required(),
});
