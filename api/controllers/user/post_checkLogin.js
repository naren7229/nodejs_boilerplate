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
 * * Login User
 */
const checkLogin = async (req, res, next) => {
  let date = new Date();
  // validate user login with joi schema
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async user => {
      if (!user) return res.status(400).send("Invalid email.");

      // update last login attempt date
      await updateUserProps(
        {
          last_login_attempt_date: date.toISOString()
        },
        req.body.email
      );

      // check if user is active
      if (!user.is_active) {
        return res.status(400).send("Account is inactive");
      }

      // if user locked out
      if (user.locked_out) {
        return res.status(400).send({
          resetPasswordrequired: true,
          status: "Account Locked Out"
        });
      }

      // validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // if invalid password
      if (!validPassword) {
        // if failed count id more than 5 lock out user
        if (user.access_failed_count > 5) {
          // update locked out to true
          await updateUserProps(
            {
              locked_out: true
            },
            req.body.email
          );
          return res.status(400).send("Account Locked Out");
        } else {
          // update failed login attemps count
          await updateUserProps(
            {
              access_failed_count: user.access_failed_count + 1
            },
            req.body.email
          );
          return res.status(400).send("Invalid password.");
        }
      }

      // update last login date
      await updateUserProps(
        {
          last_login_date: date.toISOString()
        },
        req.body.email
      );

      // pick user data to send back
      let userData = _.pick(user, ["id", "name", "email"]);

      // generate token
      const token = await generateToken(
        {
          userData
        },
        authPrivateKey,
        {
          expiresIn: "1d",
          algorithm: "RS256"
        }
      );

      // send response
      res.send({
        info: userData,
        token
      });
    })
    .catch(err => {
      if (err) next(err);
    });
};

const updateUserProps = async (res, email) => {
  return await Users.update(res, {
    where: {
      email: email
    }
  });
};

module.exports = {
  checkLogin
};
