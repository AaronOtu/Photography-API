const Users = require("../models/users");

//get all users for testing, will be deleted soon
const GetAllUsers = async (req, res) => {
  try {
    users = await Users.find({});
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send({ message: "User not found" });
  }
};


const GetUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;
    users = await Users.findById(userId);
    if (!users) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json(err.message );
  }
};


const RegisterUsers = async (req, res) => {
  try {
    users = await Users.create(req.body);
    token = users.generateToken();
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "Creation Successful, Token set in Cookie", users });
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
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).json({message:"Login Successful ,Token set in cookie", users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const UpdateUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidator: true,
    });
    if (!user) {
      res.status(404).json({ message: `User with id ${userId} not found` });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const DeleteUserAccount = async (req, res) => {
  try{
    const {id:userId} = req.params
    const user = await Users.findByIdAndDelete(userId)
    if(!user){

      res.status(404).send({message: "User not found"})
    }
    res.status(200).send({message: `User with id ${userId} deleted successfully`})
  }
  catch(err){
    res.status(500).send({message:err.message})
  }

}


module.exports = {
  GetAllUsers,
  RegisterUsers,
  LoginUsers,
  GetUserProfile,
  UpdateUserProfile,
  DeleteUserAccount
};
