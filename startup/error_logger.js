const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");

const config = require("config");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const error = require("../middleware/error");

module.exports = function(app) {
  // express-winston errorLogger makes sense AFTER the router.

  var logDirectory = path.join(__dirname, "../log/errors");

  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  var date = new Date();

  app.use(
    expressWinston.errorLogger({
      transports: [
        new winston.transports.File({
          filename: `./log/errors/${date.toLocaleDateString()}.log`
        })
      ]
    })
  );

  app.use(error);
};
