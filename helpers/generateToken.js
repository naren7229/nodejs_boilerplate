const jwt = require("jsonwebtoken");

function generateToken(data, key, options) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(data, key, options);
    resolve(token);
  });
}

function decodeToken(data, key) {
  return new Promise((resolve, reject) => {
    const token = jwt.verify(data, key);
    resolve(token);
  });
}

module.exports = { generateToken, decodeToken };
