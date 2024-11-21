const express = require("express");
const {
  GetAllUsers,
  RegisterUsers,
  LoginUsers,
} = require("../controllers/users");
const router = express.Router();

router.route("/").get(GetAllUsers);
router.route("/register").post(RegisterUsers);
router.route("/login").post(LoginUsers);

module.exports = router;
