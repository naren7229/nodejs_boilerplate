module.exports = function (privilege) {
  return async (req, res, next) => {
    // 403 Forbidden
    try {
      const containsSome = privilege.some(i => req.info.authorities.includes(i));
      if (!req.info || !req.info.authorities || !containsSome) {
        return await res.status(403).send('Access denied.');
      }
      next();
    } catch (ex) {
      next(ex);
    }
  };
};
