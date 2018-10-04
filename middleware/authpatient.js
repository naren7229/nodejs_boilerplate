const config = require("config");
const { patientPublicKey } = require("../startup/keysConfig");

const { decodeToken } = require("../helpers/generateToken");

module.exports = async (req, res, next) => {
  // 401 Unauthorized
  const token = req.header("PatientToken");
  if (!token)
    return res.status(401).send("Access denied. No patient token provided.");

  try {
    // config.get('jwtPrivateKey')
    const decoded = await decodeToken(token, patientPublicKey);
    req.patientInfo = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid patient token.");
  }
};
