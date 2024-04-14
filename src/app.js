const express = require("express");
const app = express();
app.set("view engine", "ejs");
const bcrypt = require("bcrypt");
require("./databaseConn");
const UserSignup = require("./userModel");
app.use(express.json());
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
const crypto = require("crypto");
const Jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = crypto.randomBytes(32).toString("hex");
const jwtKey = secretKey;

app.get("/", (req, res) => {
  res.render("landPage");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signUp", (req, res) => {
  res.render("signUp");
});

app.get("/home", verifyToken, (req, res) => {
  res.render("home");
});

function verifyToken(req, res, next) {
  const token = req.query.auth;
  console.log(req.query.auth);
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>     
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
  <div class="d-flex justify-content-center align-items-center fade show" role="alert">
  <div class="spinner-border text-primary" role="status">
  </div>
  <p id="msg" class="mt-3 mx-2"><strong>Session Expired!</strong> log in to continue...</p>
</div>
  <script>
  setTimeout(divChange, 1000);

  function divChange(){
    document.getElementById("msg").innerHTML = '<strong>Wait, We redirect you to the login page!</strong>';
    setTimeout(logout, 2000);
  }
  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
   // window.location.reload();
  }
  </script>
    </body>
    </html>
  `;
  if (token) {
    Jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        return res.status(401).send(htmlContent);
      } else {
        next();
      }
    });
  } else {
    return res.redirect("login");
  }
}

app.post("/login", async (req, res) => {
  try {
    const user = await UserSignup.findOne(req.body).select("-password");
    // Check if user exists

    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          return res.send({
            result: results,
          });
        }
        res.status(200).send({ user, auth: token });
      });
    } else {
      res.status(401).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/regi", async (req, res) => {
  try {
    const existingUser = await UserSignup.findOne({ email: req.body.email });
    // console.log(existingUser);
    if (existingUser) {
      // User already exists
      return res.send({ status: "User exists" });
    }
    const user = new UserSignup(req.body);
    const result = await user.save();
    // console.log(result);
    res.send({ status: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Internal Server Error" });
  }
});

app.post("/getPass", async(req, res) => {
  console.log(req.body);
  try {
    const isUser = await UserSignup.findOne({ email: req.body.email });
    if (isUser) {
      // User already exists
      return res.status(200).send({status : `Your password is ${isUser.password} !`});
    }else{
      return res.status(404).send({status : 'No user found with given mail address!'});
    }
  }catch(error) {
    res.status(500).send({ status: "There was an Internal Server Error, try after sometime!" });
  } 
});   

// const port = 3000;
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
