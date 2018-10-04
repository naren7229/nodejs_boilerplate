const express = require("express");
const bodyParser = require("body-parser");
const swagger = require("./swagger");
const users = require("../api/routes/users");
const profile = require("../api/routes/patient");

module.exports = function(app) {
  app.use(express.json());
  app.use(bodyParser.json()); // To support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // To support URL-encoded bodies
      extended: true
    })
  );

  const startTime = new Date();

  app.get("/", function(req, res) {
    res.send("Hello World!");
  });
  app.use("/api/user", users);

  if (process.env.NODE_ENV !== "production") {
    app.use("/api/docs", swagger.router);
  }

  /*app.route("/*").get((req, res) => {
    const uptime = `${new Date() - startTime}ms`;
    res.status(200).json({ startTime, uptime });
  });*/
};
