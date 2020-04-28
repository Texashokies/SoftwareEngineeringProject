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

//make auth and firestore references
    const auth = firebase.auth();
    const database = firebase.database();

//Listen for auth status changes log ins and outs
auth.onAuthStateChanged(user => {
    console.log(user);
    //Logged in
    if(user){
        console.log("User logged in: ", user);
        setupUISettings(user);
    }
    else{
        console.log("User logged out: ", user);
        setupUISettings(user);
    }
})


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
    setupUISettings(auth.currentUser);
}

const setupUISettings = (user) => {
    console.log("Set up user is: " , user);
    if(user) {
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "block");
        loggedOutComponents.forEach(item => item.style.display = 'none');
        //document.getElementById("user-picture").src = user.photoURL;
        document.getElementById("display-name").innerHTML = "Display name: " + user.displayName;
        document.getElementById("email").innerHTML = "Email Address: " + user.email;
    }
    else{
        //Toggle UI elements
        loggedInComponents.forEach(item => item.style.display = "none");
        loggedOutComponents.forEach(item => item.style.display = 'block');
    }
    setDisplayAccordingToTheme();
}

function setThemePreference(){
    const user = auth.currentUser;
    const theme = document.getElementById("select-theme").value;
    database.ref("user themes/" + user.uid).set(theme);
    console.log("Theme preference changed!");
    setDisplayAccordingToTheme();
}

function setDisplayAccordingToTheme() {
    const user = auth.currentUser;
    if(user){
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
                    buttons[i].className  ="wave-effect waves-light btn orange darken-2 modal-trigger";
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
                    buttons[i].className  ="wave-effect waves-light btn blue darken-2 modal-trigger";
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
                document.getElementById("nav-wrapper").className =  "nav-wrapper amber darken-2";
                document.getElementById("logo").className = "brand-logo";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    buttons[i].className  ="wave-effect waves-light btn yellow darken-2 modal-trigger";
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
    else {
        document.body.className = "";
        document.getElementById("nav-wrapper").className =  "nav-wrapper amber darken-2";
        document.getElementById("logo").className = "brand-logo";
        var cards = document.querySelectorAll(".card");
        for(var i =0; i< cards.length;i++){
            cards[i].className = "card";
        }
        var buttons = document.querySelectorAll(".btn");
        for(var i=0;i<buttons.length;i++){
            buttons[i].className  ="wave-effect waves-light btn yellow darken-2 modal-trigger";
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