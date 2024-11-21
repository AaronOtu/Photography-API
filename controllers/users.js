const Users = require("../models/users");

//get all users
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
    token =  users.generateToken();
    res.status(201).json({users, token});
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { GetAllUsers, RegisterUsers };
