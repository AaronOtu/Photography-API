const express = require("express");
const connectDB = require("./Database/db");
const users = require("./routes/users");
const secret = require("./middleware/secret")
const app = express();
const port = 4080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(secret)

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my application!");
});

//add your routes 
app.use("/users", users);


const start = async () => {
  try {
    await connectDB();
    app.listen(port, function () {
      console.log(`server is listening of port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
