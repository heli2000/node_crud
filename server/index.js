const express = require('express');
const PORT = process.env.PORT || 3002
const app = express();
const bodyParser = require('body-parser');
var fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/list",(req,res) => {
    fs.readFile( __dirname + "/" + "users.json", 'utf8',  (err, data) => {
        res.end(data);
    });
});

app.delete('/deleteUser',(req, res) => {
    var id = 2;
    fs.readFile( __dirname + "/" + "users.json", 'utf8',  (err, data) => {
        console.log(req.body);
        // data = JSON.parse( data );
        // delete data[id];
    });
});

app.post("/addUser", function (req, res) {
    var user = req.body;
    fs.readFile( __dirname + "/" + "users.json", 'utf8',  (err, data) => {
        data = JSON.parse( data );
        user.id = Object.keys(data).length + 1;
        data.push(user);

        fs.writeFile( __dirname + "/" + "users.json", JSON.stringify(data), err => {
            if (err) throw err; 
            console.log("Done writing"); // Success
        });

        res.end(JSON.stringify(data));
    });
 })

app.listen(PORT, () => {
    console.log(`server listning port ${PORT}`);
});