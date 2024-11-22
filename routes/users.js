const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")

const {
  GetAllUsers,
  RegisterUsers,
  LoginUsers,
  GetUserProfile,
  UpdateUserProfile,
  DeleteUserAccount
} = require("../controllers/users");
const router = express.Router();

router.route("/register").post(RegisterUsers);
router.route("/login").post(LoginUsers);
router.use(authMiddleware)
router.route("/").get(GetAllUsers);// will be deleted
router.route("/:id").get(GetUserProfile).put(UpdateUserProfile).delete(DeleteUserAccount)
module.exports = router;
