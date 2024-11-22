const jwt = require("jsonwebtoken");
const Users = require("../models/users");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Token required" }); 
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(JSON.stringify(decoded));

    req.user = await Users.findById(decoded._id);
    if (!req.user) {
      throw new Error();
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
