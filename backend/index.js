const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(
  "mongodb+srv://talha:8pZBLrnrJjJt2emT@cluster0.gmsyp0l.mongodb.net/Login&Signup?retryWrites=true&w=majority"
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Body parser middleware
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

//Defining Schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Making Model
const User = new mongoose.model("User", userSchema);
// API routes

//For Login
app.post("/Login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Sucessfull!", user: user });
      } else {
        res.send({ message: "Incorrect Email/Password" });
      }
    } else {
      res.send({ message: "User Not Found" });
    }
  });
});

//For Register
app.post("/Register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "Already Registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });

      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered,Kindly login now" });
        }
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
