const express = require("express");
const connectDB = require("./Database/db");
const users = require("./routes/users");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my application!");
});
app.get("/books", (req, res) => {
  res.status(200).send("welcome to users page!");
});


app.use("/users", users)

const start = async () => {
  try {
    await connectDB();
    app.listen(4080, function () {
      console.log("server is listening of port 4080");
    }
    )
  }
  catch (error) {
    console.log(error.message);
  }
};

start();
