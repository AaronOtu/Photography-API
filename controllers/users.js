const Users = require("../models/users");

//get all users for testing, will be deleted soon
const GetAllUsers = async (req, res) => {
  try {
    users = await Users.find({});
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send({ err: "User not found" });
  }
};

//Register users
const RegisterUsers = async (req, res) => {
  try {
    users = await Users.create(req.body);
    token = users.generateToken();
    res.status(201).json({ users, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const LoginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    users = await Users.findOne({ email });
    if (!users) {
      res.status(404).send({ message: "User not found" });
    }

    const isMatch = await users.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }
    const token = users.generateToken();
    res.status(200).json({ users, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { GetAllUsers, RegisterUsers,LoginUsers };
