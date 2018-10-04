const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

module.exports = function logging(app) {
  var logDirectory = path.join(__dirname, "../log/requests");

  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  var date = new Date();
  // create a rotating write stream
  var accessLogStream = rfs(`${date.toLocaleDateString()}.log`, {
    interval: "1d", // rotate daily
    path: logDirectory
  });

  // log only 4xx and 5xx responses to console
  app.use(
    morgan("dev", {
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    })
  );

  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
      {
        stream: accessLogStream
      }
    )
  );
};
