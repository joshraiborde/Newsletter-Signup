const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;
var now = new Date();

app.use(express.static("public")); // this will allow all the static css and images to be rendered.

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded());


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    var firstName0 = req.body.fName
    var firstName = firstName0.charAt(0).toUpperCase() + firstName0.slice(1);
    var lastName0 = req.body.lName
    var lastName = lastName0.charAt(0).toUpperCase() + lastName0.slice(1);
    var email = req.body.email

  console.log("First Name: " + firstName + ". Last Name: " + lastName + ". Email: " + email, now.toUTCString());
});

app.listen(port, () => {
  console.log("Listening Route. Server is running on Port " + port + " on " + now.toUTCString());
});
