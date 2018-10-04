const ipfilter = require("express-ipfilter").IpFilter;

module.exports = function(app) {
  var ips = ["127.0.0.1", "localhost"];

  app.use(
    ipfilter(ips, {
      mode: "allow"
    })
  );

  app.use(function(err, req, res, _next) {
    // console.log("Error handler", err);
    res.send(err);

    // if (err instanceof IpDeniedError) {
    //   res.status(401);
    // } else {
    //   res.status(err.status || 500);
    // }

    // res.render("error", {
    //   message: "You shall not pass",
    //   error: err
    // });
  });
};
