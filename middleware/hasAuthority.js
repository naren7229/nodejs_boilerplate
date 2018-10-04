module.exports = function(privilege) {
  return async (req, res, next) => {
    // 403 Forbidden
    try {
      if (
        !req.user ||
        !req.user.authorities ||
        !req.user.authorities.includes[privilege]
      ) {
        return await res.status(403).send("Access denied.");
      } else {
        next();
      }
    } catch (ex) {
      next(ex);
    }
  };
};
