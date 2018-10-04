const Joi = require("joi");

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    user_type: Joi.number().integer()
  };

  return Joi.validate(user, schema);
}

function validateUserLogin(userlogin) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(userlogin, schema);
}

function validatePasswordReset(passwordReset) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
  };

  return Joi.validate(passwordReset, schema);
}

function verifyPassword(verify) {
  const schema = {
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    token: Joi.string().required(),
    loggedIn: Joi.allow(null)
  };

  return Joi.validate(verify, schema);
}

module.exports = {
  validateUser,
  validateUserLogin,
  validatePasswordReset,
  verifyPassword
};
