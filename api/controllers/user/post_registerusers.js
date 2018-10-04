const bcrypt = require("bcrypt");
const _ = require("lodash");

const use = require("abrequire");
const sequelize = use("startup/db");

const { Users } = user(sequelize);

const { validateUser, validateUserLogin } = require("../../validations/user");

const { authPrivateKey, emailVerifyPrivateKey, emailVerifyPublicKey } = use(
  "startup/keysConfig"
);

const { sendEmail } = use("helpers/sendEmail");
const { generateToken, decodeToken } = use("helpers/generateToken");

/**
 * * Register User
 */
registerUser = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async user => {
      if (user) return res.status(400).send("User already registered.");

      const registerToken = await generateToken(
        {
          email: userData.email
        },
        emailVerifyPrivateKey,
        {
          expiresIn: "1h",
          algorithm: "RS256"
        }
      );

      const loginToken = await generateToken(
        {
          userData
        },
        authPrivateKey,
        {
          expiresIn: "1h",
          algorithm: "RS256"
        }
      );

      res.header("x-auth-token", loginToken).send({
        info: userData,
        loginToken
      });

      await sendEmail({
        fileName: "verificationemail",
        subject: "Verify your email",
        email: user.email,
        token: registerToken
      });
    })
    .catch(err => {
      // if (err) return res.status(400).send("Invalid");
      if (err) next(err);
    });
};

module.exports = {
  registerUser
};
