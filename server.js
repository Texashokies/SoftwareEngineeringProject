//This is the server side code should only be used to call non-firebase api's
//Firebase functions should be done clinet side
const express = require('express');
const CloudmersiveVirusApiClient = require('cloudmersive-virus-api-client');
const formidable = require('formidable');
const fs = require('fs');
var admin = require('firebase-admin');
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://software-engineering-pro-3ba1c.firebaseio.com"
});

var app = express();
app.use(express.static(__dirname + '/public'));
var port = 8000;
app.listen(port);
console.log("server on " + port);
app.use(express.json());

app.post('/getuser' , (request,response) => {
    console.log(request.body);
    const data = request.body;
    var id = data.id;
    console.log(id);
})