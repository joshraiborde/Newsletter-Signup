const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")

const app = express();
const port = 3000;
var now = new Date();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    console.log("Server is running on Port " + port + " on " + now.toUTCString());
})

app.listen(port, () => {
    console.log("Server is running on Port " + port + " on " + now.toUTCString());
})