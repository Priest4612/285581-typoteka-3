'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string()
        .min(30)
        .max(250)
        .required(),
  announce: Joi.string()
        .min(30)
        .max(250)
        .required(),
  fullText: Joi.string()
        .max(1000)
        .required(),
  categories: Joi.array()
        .items(Joi.object({
          id: Joi.number()
          .required(),
          name: Joi.string()
          .required(),
        }))
        .min(1)
        .required(),
  images: Joi.array()
        .items(Joi.object({
          path: Joi.string()
          .pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpg)$/i)
          .required(),
        })),
  userId: Joi.number()
  .required(),
});
