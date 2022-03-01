const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
require("dotenv").config() 

const MAPI_KEY = process.env.API_KEY
const MLIST_ID = process.env.LIST_ID
const MAPI_SERVER = process.env.API_SERVER

const app = express();
const port = 3000;
var now = new Date();

app.use(express.static("public")); // this will allow all the static css and images to be rendered.

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded());


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

// post request for the home route
app.post("/", (req, res) => {
    var firstName0 = req.body.fName
    const firstName = firstName0.charAt(0).toUpperCase() + firstName0.slice(1);
    var lastName0 = req.body.lName
    const lastName = lastName0.charAt(0).toUpperCase() + lastName0.slice(1);
    const email = req.body.email

//   console.log("First Name: " + firstName + ". Last Name: " + lastName + ". Email: " + email, now.toUTCString());
    const data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://"+MAPI_SERVER+".api.mailchimp.com/3.0/lists/" + MLIST_ID

    const options = {
        method: "POST",
        auth: "josh:" + MAPI_KEY
    }

    const request = https.request(url, options, (response) =>{
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
            
        })
    })



    request.write(jsonData);
    request.end();

});

// post request for the failure route
app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || port, () => {
  console.log("Listening Route. Server is running on Port " + port + " on " + now.toUTCString());
});
