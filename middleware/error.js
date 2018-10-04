const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  // if (process.env.NODE_ENV === "production") {
  res.status(err.status || 500).send({
    status: "error",
    message: err.message
  });
  // }
};
