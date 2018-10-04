const express = require("express");
const winston = require("winston");
const expressWinston = require("express-winston");
const config = require("config");

// require('winston-mongodb');

// var Elasticsearch = require('winston-elasticsearch');

module.exports = function(app) {
  //   winston.handleExceptions(
  //     new winston.transports.File({
  //       filename: "./log/uncaughtExceptions.log",
  //       handleExceptions: true
  //     })
  //   );

  process.on("unhandledRejection", ex => {
    throw ex;
  });

  // var client = new elasticsearch.Client({
  //   indexPattern: '*',
  //   type: 'logs',
  //   host: {
  //     protocol: 'http',
  //     host: 'localhost',
  //     port: 9200,
  //     path: '/'
  //   },
  //   log: LogClass
  // });

  // client.ping({
  //   // ping usually has a 3000ms timeout
  //   requestTimeout: 1000
  // }, function (error) {
  //   if (error) {
  //     console.trace('elasticsearch cluster is down!');
  //   } else {
  //     console.log('All is well');
  //   }
  // });

  //   app.use(
  //     expressWinston.logger({
  //       transports: [
  //         new winston.transports.Console({
  //           json: false,
  //           colorize: true,
  //           level: "error"
  //         }),
  //         new winston.transports.File({
  //           filename: "./log/logfile.log",
  //           level: "info"
  //         })
  //         // new winston.add(winston.transports.MongoDB, {
  //         //     db: config.get('db'),
  //         //     level: 'error'
  //         // }),
  //         // new Elasticsearch({
  //         //     level: 'info'
  //         // })
  //       ]
  //     })
  //   );

  let winstonOptions = {
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),

    transports: [
      new winston.transports.Console({
        json: true,
        level: "error"
      }),
      new winston.transports.File({
        json: true,
        filename: "./log/logfile.log",
        level: "info"
      })
    ]
  };

  let expressWinstonOptions = {
    meta: false,
    msg: `{{req.ip}} {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms`,
    colorize: true
  };

  // HACK: Remove when `express-winston` fixes this
  // HACK: See https://github.com/bithavoc/express-winston/issues/163
  expressWinstonOptions.winstonInstance = winston.createLogger(winstonOptions);
  app.use(expressWinston.logger(expressWinstonOptions));
};
