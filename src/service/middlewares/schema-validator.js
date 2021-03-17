'use strict';

const {HttpStatusCode} = require(`../../constants`);

const schemaValidator = (schema) => (
  async (req, res, next) => {
    const {body} = req;
    try {
      await schema.validateAsync(body, {abortEarly: false});
    } catch (err) {
      const {details} = err;
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: details.map((errorDescriprion) => errorDescriprion.message),
        data: body
      });
      return;
    }

    next();
  }
);

module.exports = {
  schemaValidator
};
