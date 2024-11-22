require('dotenv').config()

const secret = (req,res,next) =>{
  const apiKey = req.headers["api-key"];
  if (apiKey == process.env.SECRET_KEY){
    next();
  }else{
    res.status(403).json({message: "Forbidden: Invalid API key"})
  }
}

module.exports = secret;