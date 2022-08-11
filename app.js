const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");

})

app.post("/", function(req, res){
const firstName = req.body.firstName;
const lastName = req.body.lastName;
const email = req.body.emailAddress;


const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);


const url = "https://us9.api.mailchimp.com/3.0/lists/fb402d4118";
const options ={
  method: "POST",
  auth: "datguysammy:aeb8055f520712a47b2633026a3fa070-us9"

}



const request = https.request(url, options, function(response){
if (response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html")
}


  response.on("data", function(data){
    console.log(JSON.parse(data));
  })


})
 request.write(jsonData);
 request.end();
});

app.post("/failure.html", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("App is running on port 3000");
});

// api key
// aeb8055f520712a47b2633026a3fa070-us9

// list id
// fb402d4118
