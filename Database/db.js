const mongoose = require("mongoose");
require("dotenv").config();

user = process.env.DATABASE_NAME;
password = encodeURIComponent(process.env.DATABASE_PASSWORD);

const connectionString = `mongodb+srv://${user}:${password}@nodejsexpressproject.3wc7g.mongodb.net/Photography_API?retryWrites=true&w=majority&appName=NodejsExpressProject`;

const connectDB = () => {
  mongoose.connect(connectionString);
  console.log("Database connection established");
};

module.exports = connectDB;
