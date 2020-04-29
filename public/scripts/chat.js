// Your web app's Firebase configuration
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
const storage = firebase.storage();

//Listen for auth status changes log ins and outs
auth.onAuthStateChanged(user => {
    console.log(user);
    //Logged in
    if(user){
        console.log("User logged in: ", user);
        setupUIChat(user);
    }
    else{
        console.log("User logged out: ", user);
        setupUIChat(user);
    }
})

var threadID;
window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
       }
       this.threadID = data.thread;
       

       //Start listening for messages
       //This should work assuming same object as used in the prototypes
        database.ref("messages/" +this.threadID).on("child_added" ,function(snapshot) {

            var Displayname = snapshot.val().sender;
            if(!(Displayname === "ignore")){
                var message = snapshot.val().message;
                emoteMessage(message);
                var html = 
                '<li id="message-"' + snapshot.key + '>' +
                '<div class="card">'+
                    '<span class="black-text"><i class="material-icons">account_circle</i>'+ Displayname + '</span>'+
                    '<div class="card-content">'+
                    message+
                    '</div>'+
                '</div>' +
                '</li>';
                document.getElementById("messages").innerHTML += html;
                setDisplayAccordingToTheme();
            }
            else{
            }
        })
}


function emoteMessage(message){
    const regexp = RegExp(':[^:\\s]*(?:::[^:\\s]*)*:','g');
    const matches = message.matchAll(regexp);

    var newstring = message.replace(regexp,replaceWithEmote);
    console.log(newstring);
    /*
    for(const match of matches) {
        //compare match against list of emotes and then replace.
        console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
    }*/
}

function replaceWithEmote(match){
    var emote = match.substring(1,match.length-1);
    
    switch(emote){
        case "shronk":
            //Return image tag
        break;
    }

    return match;
}

//Setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {constrainWidth : false});
    
    var selections = document.querySelectorAll('select');
    M.FormSelect.init(selections);

    getUserLoginStatus();
});


const loggedOutComponents = document.querySelectorAll('.logged-out');
const loggedInComponents = document.querySelectorAll('.logged-in');

const getUserLoginStatus = () => {
    setupUIChat(auth.currentUser);
}

const setupUIChat = (user) => {
    console.log("Set up user is: " , user);
    if(user) {
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "block");
        loggedOutComponents.forEach(item => item.style.display = 'none');
    }
    else{
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "none");
        loggedOutComponents.forEach(item => item.style.display = 'block');
    }
    
    setDisplayAccordingToTheme();
}

function setDisplayAccordingToTheme(){
    const user = auth.currentUser;
    if(user){
        //Read from database right now is a test, but will need to be based on user id
        database.ref("user themes/" + user.uid).on('value', function(snapshot){
            const theme = snapshot.val();
            console.log(snapshot.val());
            if(theme == "campfire"){
                document.body.className = "grey darken-2";
                document.getElementById("nav-wrapper").className =  "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo orange-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card grey darken-1 amber-text darken-3";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('no-modal')){
                        buttons[i].className  ="wave-effect waves-light btn orange darken-2 modal-trigger";
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn orange darken-2 no-modal";
                    }
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal grey darken-2 amber-text";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content black-text grey darken-1";
                }
            }
            else if(theme == "coldfire"){
                document.body.className = "grey darken-2";
                document.getElementById("nav-wrapper").className =  "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo blue-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card grey darken-1 blue-text darken-2";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('no-modal')){
                        buttons[i].className  ="wave-effect waves-light btn blue darken-2 modal-trigger";
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn blue darken-2 no-modal";
                    }
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal grey darken-2 blue-text";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content black-text grey darken-1";
                }
            }
            else{
                document.body.className = "";
                document.getElementById("account-warning").className = "center-align";
                document.getElementById("nav-wrapper").className =  "nav-wrapper amber darken-2";
                document.getElementById("logo").className = "brand-logo";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('no-modal')){
                        buttons[i].className  ="wave-effect waves-light btn yellow darken-2 modal-trigger";
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn yellow darken-2 no-modal";
                    }
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content";
                }
            }
        });
    }
    else{
        document.body.className = "";
        document.getElementById("nav-wrapper").className =  "nav-wrapper amber darken-2";
        document.getElementById("logo").className = "brand-logo";
        var cards = document.querySelectorAll(".card");
        for(var i =0; i< cards.length;i++){
            cards[i].className = "card";
        }
        var buttons = document.querySelectorAll(".btn");
        for(var i=0;i<buttons.length;i++){
            if(!buttons[i].className.includes('no-modal')){
                buttons[i].className  ="wave-effect waves-light btn yellow darken-2 modal-trigger";
            }
            else{
                buttons[i].className  ="wave-effect waves-light btn yellow darken-2 no-modal";
            }
        }
        var modals = document.querySelectorAll(".modal");
        for(var i=0;i<modals.length;i++){
            modals[i].className ="modal";
        }
        var dropdowns = document.querySelectorAll(".dropdown-content");
        for(var i=0;i<dropdowns.length;i++){
            dropdowns[i].className= "dropdown-content";
        }
    }
}

//Send message
document.getElementById("message-form").addEventListener('submit' ,(e) => {
    e.preventDefault();

    const message = document.getElementById("message").value;
    var displayName;
    database.ref("users/" + auth.currentUser.uid).once('value', function(snapshot) {
        try {
            displayName = snapshot.val().displayName;
        }
        catch(e){
            displayName = auth.currentUser.email;
        }
        if(!displayName){
            displayName = auth.currentUser.email;
        }
    }).then( function () {

        //check if message needs to be translated
        var fromLang = document.getElementById("translate-from").value;
        var toLang = document.getElementById("translate-to").value;
        
        if(!(fromLang === toLang)){
            console.log("Chat from:" +fromLang);
            console.log(toLang);
            sendTranslatedMessage(message,displayName);
        }
        else{
            database.ref("messages/" + threadID).push().set({
                "sender":displayName,
                "message": message
            })
            document.getElementById("message-form").reset();
        }        
    });
});

async function sendTranslatedMessage(message,displayName){
    var fromLang = document.getElementById("translate-from").value;
    var toLang = document.getElementById("translate-to").value;
    console.log("Send from lang: " +fromLang)
    console.log("Send to lang: " +toLang)
    console.log("Send message: " +message)
    console.log("Send displayName: " +displayName)
    const messageToTranslate = {message,fromLang,toLang};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageToTranslate)
    };
    const response = await fetch('/apitranslation', options);
    const data = await response.json();
    message = data.translatedMessage;

    database.ref("messages/" + threadID).push().set({
        "sender":displayName,
        "message": message
    })
    document.getElementById("message-form").reset();
}

function sendFile(){
    var displayName;
    database.ref("users/" + auth.currentUser.uid).once('value', function(snapshot) {
        try {
            displayName = snapshot.val().displayName;
        }
        catch(e){
            displayName = auth.currentUser.email;
        }
        if(!displayName){
            displayName = auth.currentUser.email;
        }
    }).then( function () {
        var uploader = document.getElementById("uploader");
        var fileButton = document.getElementById("file-select");
        var submitButton = document.getElementById("submitButton");
        //Listen for file selection
        //Get the file
        var file = fileButton.files[0];
        //Create a storage ref
        var storageRef = firebase.storage().ref(file.name);
        //Upload file
        var task = storageRef.put(file);
        //Update progress bar
        task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err){

        },
        function complete() {
            storageRef.getDownloadURL().then(function(url) {
            console.log(url);

            const fileLink = {url,filename : file.name, displayname : displayName, messagethread : threadID};
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fileLink)
            };
            sendFileAsync(options,url);

            //var messages = document.getElementById("messages");
            //messages.innerHTML += `<a href="${url} download" >Download here</a>`;
            })
        }
        );
    });
}

async function sendFileAsync(options){
    const response = await fetch('/sendfile', options);
    const data = await response.json();
    
    console.log("Data: " + data.isclean);
}