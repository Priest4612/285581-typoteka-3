'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
            .min(6)
            .required(),
  repeatPassword: Joi.string()
            .min(6)
            .required(),
  avatar: Joi.string(),
});
