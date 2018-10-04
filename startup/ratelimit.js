const RateLimit = require('express-rate-limit');

module.exports = function (app) {
  app.use(new RateLimit({
    windowMs: 60000, // 1 minutesserver.js
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  }));
}