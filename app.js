const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const https = require("https");

const app = express();

app.use(urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    var firstName = req.body.firstName;
    var secondName  = req.body.secondName;
    var email = req.body.email;
    
    var data={
        members:[{
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME: firstName,
            LNAME: secondName
          }
        }]
      };
    
    const jsonData = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/d7ec2c0750";
    const options={
        method:"POST",
        auth:"akshay:f87334b77eacd9d6e8442c53fbb42472-us21"
      };

      const request=https.request(url,options,function(response){
        if(response.statusCode===200){
          res.sendFile(__dirname+"/success.html");
        }else{
          res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
          console.log(JSON.parse(data));
        });
      });
        request.write(jsonData);
        request.end();
      });
      
      // Failure route
      app.post("/failure",function(req,res){
         res.redirect("/");
      })  










let port = process.env.PORT || 3000

app.listen(port, function() {
    console.log("server running at port " + "...");
});