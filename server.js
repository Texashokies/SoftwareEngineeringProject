//This is the server side code should only be used to call non-firebase api's
//Firebase functions should be done clinet side
const express = require('express');
const CloudmersiveVirusApiClient = require('cloudmersive-virus-api-client');
const formidable = require('formidable');
const fs = require('fs');
const requestModule = require('request');
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

app.post('/sendfile', (request, endresponse) => {
    console.log(request.body);
    var data = request.body;
    var displayName = data.displayname;
    var threadID = data.messagethead;

    var defaultClient = CloudmersiveVirusApiClient.ApiClient.instance;
    var Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = "5ef61ec5-f707-4964-ad4a-7d52e0fc6e3f";
    
    var api = new CloudmersiveVirusApiClient.ScanApi();

    var fileStream = fs.createWriteStream(data.filename);
    fileStream.on('close', function(){
        console.log("file done");
        var inputFile = Buffer.from(fs.readFileSync(data.filename).buffer);
        
        var callback = function(error, data, response) {
            if (error) {
              console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);

                console.log(typeof data.CleanResult);
                console.log(data.FoundViruses);
                var result = data.CleanResult;
                var viruses = data.foundViruses;
                
                var firebaseConfig = {
                    apiKey: "AIzaSyC6QR79tnkpGKfvhc1d_VM2Pdp8lmwVTSw",
                    authDomain: "software-engineering-pro-3ba1c.firebaseapp.com",
                    databaseURL: "https://software-engineering-pro-3ba1c.firebaseio.com",
                    projectId: "software-engineering-pro-3ba1c",
                    storageBucket: "software-engineering-pro-3ba1c.appspot.com",
                    messagingSenderId: "482967068895",
                    appId: "1:482967068895:web:559182a15c3ba3c1e5c96a"
                  };
                  // Initialize Firebase
                firebase.initializeApp(firebaseConfig);
                const auth = firebase.auth();
                const database = firebase.database();
            }
        };

        api.scanFile(inputFile,callback);

    });
    requestModule(data.url).pipe(fileStream);
    
})