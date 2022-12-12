const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { url } = require('inspector');
const { options } = require('request');
const { response } = require('express');


const app = express();
const port = process.env.PORT || 3000;
const server = https.createServer(app);



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname

                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/bc5894cda5";

    const options = {
        method: "POST",
        auth: "gyan:87af3a459c49ad90d7a07bddab6fbbed-us21"
    }

    const request = https.request(url, options, function (response) {
        if(response.statusCode===200) {
            res.sendFile(__dirname + "/success.html");
        
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    })
    // request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(port, function () {
    console.log("server is running on port 3000.");
});


// api key 
// 87af3a459c49ad90d7a07bddab6fbbed-us21

// list id 
// bc5894cda5