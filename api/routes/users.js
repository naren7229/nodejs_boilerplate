/**
 * @description Express Framework Router
 * @param Router
 */
const express = require("express");
const router = express.Router();

/**
 * @description Service route Controller
 * @param authController
 */
const { checkLogin } = require("../controllers/user");

const auth = require("../../middleware/auth");

/** POST /api/user/checkLogin
 ** Login user
 * */
router.route("/checkLogin").post(checkLogin);

/**
 * @description Configured router for Service Routes
 * @exports router
 * @default
 */
module.exports = router;
