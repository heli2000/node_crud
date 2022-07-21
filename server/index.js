const express = require('express');
const PORT = process.env.PORT || 3002
const app = express();
const bodyParser = require('body-parser');
var fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/list",(req,res) => {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.end(data);
    });
});

app.post("/addUser", function (req, res) {
    var user = req.body;
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        user.id = Object.keys(data).length + 1;
        data.push(user);

        fs.writeFile( __dirname + "/" + "users.json", JSON.stringify(data), err => {
     
            // Checking for errors
            if (err) throw err; 
           
            console.log("Done writing"); // Success
        });

        res.end(JSON.stringify(data));
    });
 })

app.listen(PORT, () => {
    console.log(`server listning port ${PORT}`);
});