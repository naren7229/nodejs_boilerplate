const express = require("express");
require("express-async-errors");

const app = express();

require("./startup/logging")(app);
// require("./startup/morgan_logger")(app);
// require("./startup/whitelisting")(app);
// require('./startup/ratelimit')(app);
require("./startup/headers")(app);
require("./startup/routes")(app);
require("./startup/aws");
require("./startup/paypal");
require("./startup/db");
// require("./startup/email");
require("./startup/keysConfig");
require("./startup/error_logger")(app);

if (process.env.NODE_ENV === "production") {
  require("./startup/prod")(app);
}

module.exports = app;
