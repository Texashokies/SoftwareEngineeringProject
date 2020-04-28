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

//Setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {constrainWidth : false});

    setupUIContacts();
});

const loggedOutComponents = document.querySelectorAll('.logged-out');
const loggedInComponents = document.querySelectorAll('.logged-in');

const setupUIContacts = (user) => {
    if(user) {
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "block");
        loggedOutComponents.forEach(item => item.style.display = 'none');
        startListeningForContacts();
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
    if(user) {
        database.ref("user themes/" + user.uid).on('value', function(snapshot){
            const theme = snapshot.val();
            console.log(theme);
            if(theme == "campfire"){
                document.body.className = "grey darken-2";
                document.getElementById("account-warning").className = "amber-text darken-3 center-align";
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
            else if (theme =="coldfire"){
                document.body.className = "grey darken-2";
                document.getElementById("account-warning").className = "blue-text darken-3 center-align";
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
}

function startListeningForContacts(){
    console.log("Starting to listen.");
    database.ref("user contacts/" + auth.currentUser.uid).on("child_added", async function (snapshot) {

        var id = snapshot.val();
        var contactID = snapshot.key;
        console.log(id);
        database.ref("users/" + id).on('value' ,function(snapshot){
            displayName = snapshot.val().displayName;
            var html = "";
            html += "<li id ='contact-" + contactID + "'>" +
            '<div class="card" id ="contact-card-'+contactID + '">' +
            '<div class="card-content">'+
                '<span class="card-title"> <i class="material-icons">account_circle</i>' + displayName +'</span>'+
                '<p id="user-id">User ID:' + id +'</p>'+
            '</div>'+
            '<div class="card-action">'+
                '<button class="wave-effect waves-light btn yellow darken-2 no-modal" id ="message-button-' + contactID+ '" onClick="startMessageThread(this.id)"> <i class="material-icons">message</i> Message</button>'+
            '</div></div>';
            document.getElementById("contacts-list").innerHTML += html;
            setDisplayAccordingToTheme();
        });
    });
}

//Login
//Not in auth because modals get fussy
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch( function(e) {
        if(e.code === 'auth/invalid-email'){
            console.log("Invalid Email");
            document.getElementById("login-email-helper-text").innerHTML ="Invalid Email Address";
            document.getElementById("login-password-helper-text").innerHTML ="";
        }
        else if (e.code === 'auth/user-disabled'){
            console.log("Disabled Email");
            document.getElementById("login-email-helper-text").innerHTML ="This email has been disabled";
        }
        else if(e.code === 'auth/user-not-found'){
            console.log("No user");
            document.getElementById("login-email-helper-text").innerHTML ="There is no user corresponding to the given email";
        }
        else if(e.code === 'auth/wrong-password'){
            console.log("Wrong password");
            document.getElementById("login-password-helper-text").innerHTML ="Incorrect Password";
            document.getElementById("login-email-helper-text").innerHTML ="";
        }
        else{
            alert(e);
        }
    });
    //Close modal and reset form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
});

//Signup
//Not in auth because modals get fussy
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value

    firebase.auth().createUserWithEmailAndPassword(email, password).then( function(cred){
        console.log(cred.user);

        const username = signupForm['username'].value;
        auth.currentUser.updateProfile({
            displayName: username
        })

        database.ref("users/" + auth.currentUser.uid).set({
            "displayName": username,
            "admin": false
        });

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        //Deal with any errors
    }).catch (function(e){
        console.log("Error: " + e);
        if(e.code === 'auth/invalid-email'){
            console.log("Invalid email");
            document.getElementById("signup-email-helper-text").innerHTML = "Invalid Email";
            document.getElementById("signup-password-helper-text").innerHTML = "";
        }
        else if(e.code === 'auth/user-disabled'){
            document.getElementById("signup-email-helper-text").innerHTML = "User Disabled";
            document.getElementById("signup-password-helper-text").innerHTML = "";
        }
        else if(e.code === 'auth/user-not-found'){
            document.getElementById("signup-email-helper-text").innerHTML = "User not found";
            document.getElementById("signup-password-helper-text").innerHTML = "";
        }
        else if(e.code === 'auth/wrong-password'){
            document.getElementById("signup-email-helper-text").innerHTML = "";
            document.getElementById("signup-password-helper-text").innerHTML = "Wrong Password";
        }
        else{
            alert(e.code)
        }
    });
});

function startMessageThread(htmlid){
    var otherUserID = htmlid.substring(16);
    console.log(otherUserID);
    var myID = auth.currentUser.uid;
    //Pairing function

    //Get numeric value of the uid's
    var k1 = getIDValue(myID);
    var k2 = getIDValue(otherUserID);

    var pairValue1 = cantorPair(k1,k2);
    var pairValue2 = cantorPair(k2,k1);

    console.log(pairValue1);
    console.log(pairValue2);

    var pairOneExist = false;
    var pairTwoExist = false;
    var threadID;

    database.ref("messages/" + pairValue1).once('value', function(snapshot){
        if(snapshot.val() != null){
            console.log("Pair value 1 exists")
            pairOneExist = true;
            threadID = snapshot.key;
        }
    }).then(
        function() {
            database.ref("messages/" + pairValue2).once('value', function(snapshot){
                if(snapshot.val() != null){
                    console.log("Pair value 2 exists")
                    pairTwoExist =true;
                    threadID = snapshot.key;
                }
                else{
                    console.log("Pair value 2 does not exists")
                }
            }).then(
                function() {
                    var url = "/public/chat.html?thread=" + threadID;
                    document.location.href = url;
                }
            );
        }
    );
}

function cantorPair(k1,k2){
    var a = k1 + k2;
    var b = a + 1;
    return .5 * a *b +k2;
}

//This method of getting an ID value is not unique/ two ID's could add up to the same number, but we are betting they won't
//A unique way is treating ID's as base 63 numbers which are of course uniquie but very large.
function getIDValue(id){
    var num = 0;
    for(var i = 0;i<id.length;i++){
        num += id.charCodeAt(i);
    }
    return num;
}
  