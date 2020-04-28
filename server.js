//This is the server side code should only be used to call non-firebase api's
//Firebase functions should be done clinet side
const express = require('express');
const CloudmersiveVirusApiClient = require('cloudmersive-virus-api-client');
const formidable = require('formidable');
const fs = require('fs');

var app = express();
app.use(express.static(__dirname + '/public'));
var port = 8000;
app.listen(port);
console.log("server on " + port);
app.use(express.json());
var http = require('http');

//Translation
app.post('/apitranslation', (request, response) => {
    console.log(request.body);
    const data = request.body;
  
    var clientId = "FREE_TRIAL_ACCOUNT";
    var clientSecret = "PUBLIC_SECRET";
  
    var fromLang = data.fromLang;
    var toLang = data.toLang;
    var text = data.message;
    console.log(fromLang);
    console.log(toLang);
    console.log(text);
    var jsonPayload = JSON.stringify({
      fromLang: fromLang,
      toLang: toLang,
      text: text
    });
  
    var options = {
      hostname: "api.whatsmate.net",
      port: 80,
      path: "/v1/translation/translate",
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-WM-CLIENT-ID": clientId,
          "X-WM-CLIENT-SECRET": clientSecret,
          "Content-Length": Buffer.byteLength(jsonPayload)
      }
    };
  
    var translateRequest = new http.ClientRequest(options);
    translateRequest.end(jsonPayload);
  
    var translatedMessage = 'Untranslated';
  
    translateRequest.on('response', function (translateResponse) {
      console.log('Status code: ' + translateResponse.statusCode);
      translateResponse.setEncoding('utf8');
      translateResponse.on('data', function (chunk) {
        console.log(chunk);
        translatedMessage = chunk;
        response.json({
          translatedMessage: translatedMessage
        });
      })
    })
  });