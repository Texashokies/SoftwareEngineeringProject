//This is the server side code should only be used to call non-firebase api's
//Firebase functions should be done clinet side
const express = require('express');
const CloudmersiveVirusApiClient = require('cloudmersive-virus-api-client');
const formidable = require('formidable');
const fs = require('fs');
const requestModule = require('request');
const admin = require('firebase-admin');
const CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://software-engineering-pro-3ba1c.firebaseio.com"
});
var database = admin.database();
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
    var threadID = data.messagethread;
    var filename = data.filename;
    var url = data.url;
    var defaultClient = CloudmersiveVirusApiClient.ApiClient.instance;
    var Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = "5ef61ec5-f707-4964-ad4a-7d52e0fc6e3f";
    
    var api = new CloudmersiveVirusApiClient.ScanApi();

    var fileStream = fs.createWriteStream(filename);
    fileStream.on('close', function(){
        console.log("file done");
        var inputFile = Buffer.from(fs.readFileSync(filename).buffer);
        
        var callback = function(error, data, response) {
            if (error) {
              console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);

                console.log(typeof data.CleanResult);
                console.log(data.FoundViruses);
                var result = data.CleanResult;
                var viruses = data.foundViruses;

                var filetype = filename.split('.').pop();
                var imageTypes = ["jpg","png","gif"];
                var isImage = false;
                for(var i = 0; i<imageTypes.length;i++){
                  if(filetype === imageTypes[i]){
                    isImage = true;
                    break;
                  }
                }
                if(isImage){
                    var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;
                    // Configure API key authorization: Apikey
                    var Apikey = defaultClient.authentications['Apikey'];
                    Apikey.apiKey = '1a12d69f-fced-43c9-8a39-6c0fd33c901f';
                    var apiInstance = new CloudmersiveImageApiClient.NsfwApi();

                    var imageCallback = function(error, data, response) {
                      if (error) {
                        console.error(error);
                      } else {
                        console.log('Image API called successfully. Returned data: ' + data);
                        database.ref("messages/" + threadID).push().set({
                            "sender": displayName,
                            "wasClassified": data.Successful,
                            "score": data.Score,
                            "imageLink" : url
                        });
                        fs.unlink(filename, (err) =>{
                          console.error(err)
                          return
                        });
                      }
                    };
                    apiInstance.nsfwClassify(inputFile, imageCallback);
                }
                else{
                  //This is for non-image files
                  var message = displayName + " is sharing the file " + filename + " It recieved a Cloudmersive Virus Result of: ";
                  if(result){
                    message += "Clean";
                  }
                  else{
                    message += "Unclean. Found viruses: " + viruses;
                  }
                  message += "Note: Your browser may not prompt for download but instead open the file within the browser.";
                  console.log(threadID);
                  console.log(url);
                  database.ref("messages/" + threadID).push().set({
                    "sender": displayName,
                    "message": message,
                    "url": url
                  });
                  fs.unlink(filename, (err) =>{
                    console.error(err)
                    return
                  });
                }
                
            }
        };

        api.scanFile(inputFile,callback);
        //Go to call back function

    });
    requestModule(data.url).pipe(fileStream);
    
})