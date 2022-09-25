const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/")); // because our styles.css is a static page in our local system
console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_adress: email,
        status: "subscribed",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/24ae9e0333";
  const options = {
    method: "POST",
    auth: "admin:d91f8e07ae554b3de2fd7332c6e61d93-us9",
  };
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});

// d91f8e07ae554b3de2fd7332c6e61d93-us9
// 24ae9e0333
