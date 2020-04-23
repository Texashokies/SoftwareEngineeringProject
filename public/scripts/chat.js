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


//Function for sending a message
function sendMessage() {

    return false;
}

function setDisplayAccordingToTheme(){

    //Read from database right now is a test, but will need to be based on user id
    database.ref("user themes/1").on('value', function(snapshot){
        const theme = snapshot.val();
        console.log(snapshot.val());
        if(theme == "campfire"){
            document.getElementById("nav-wrapper").className = "nav-wrapper grey darken-4";
            document.getElementById("logo").className = "brand-logo orange-text";
            document.body.className = "grey darken-2";
            document.getElementById("account-dropdown").className = "dropdown-trigger orange darken-2 btn";
            document.getElementById("sign-in-card").className = "card grey darken-1 amber-text darken-3";
            document.getElementById("sign-in-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
            document.getElementById("sign-up-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
            document.getElementById("modal-signup").className = "modal grey darken-2 amber-text";
            document.getElementById("sign-in-button-modal").className = "btn orange darken-2";
            document.getElementById("modal-login").className = "modal grey darken-2 amber-text";
            document.getElementById("sign-up-button-modal").className = "btn orange darken-2";
            document.getElementById("translate-modal").className = "modal grey darken-2 amber-text";
            document.getElementById("file-modal").className = "modal grey darken-2 amber-text";
            document.getElementById("submitButton").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
            document.getElementById("chat-card").className = "card grey darken-1 amber-text darken-3";
            document.getElementById("chat-title").className = "card-title amber-text darken-3";
            document.getElementById("translate-button").className = "btn waves-effect waves-light orange darken-2 modal-trigger";
            document.getElementById("attach-button").className = "btn waves-effect waves-light orange darken-2 modal-trigger";
            document.getElementById("submit-button").className = "btn waves-effect waves-light orange darken-2";
        }
        else if(theme == "coldfire"){
            document.getElementById("nav-wrapper").className = "nav-wrapper grey darken-4";
            document.getElementById("logo").className = "brand-logo blue-text";
            document.body.className = "grey darken-2";
            document.getElementById("account-dropdown").className = "dropdown-trigger blue darken-2 btn";
            document.getElementById("sign-in-card").className = "card grey darken-1 blue-text darken-2";
            document.getElementById("sign-in-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
            document.getElementById("sign-up-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
            document.getElementById("modal-signup").className = "modal grey darken-2 blue-text";
            document.getElementById("sign-in-button-modal").className = "btn blue darken-2";
            document.getElementById("modal-login").className = "modal grey darken-2 blue-text";
            document.getElementById("sign-up-button-modal").className = "btn orange darken-2";
            document.getElementById("translate-modal").className = "modal grey darken-2 blue-text";
            document.getElementById("file-modal").className = "modal grey darken-2 blue-text";
            document.getElementById("submitButton").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
            document.getElementById("chat-card").className = "card grey darken-1 blue-text darken-3";
            document.getElementById("chat-title").className = "card-title blue-text darken-3";
            document.getElementById("translate-button").className = "btn waves-effect waves-light blue darken-2 modal-trigger";
            document.getElementById("attach-button").className = "btn waves-effect waves-light blue darken-2 modal-trigger";
            document.getElementById("submit-button").className = "btn waves-effect waves-light blue darken-2";
        }
        else{
            document.getElementById("nav-wrapper").className = "nav-wrapper amber darken-2";
            document.getElementById("logo").className = "brand-logo";
            document.body.className = "";
            document.getElementById("account-dropdown").className = "dropdown-trigger amber lighten-1 btn";
            document.getElementById("sign-in-card").className = "card";
            document.getElementById("sign-in-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
            document.getElementById("sign-up-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
            document.getElementById("modal-signup").className = "modal";
            document.getElementById("sign-in-button-modal").className = "btn yellow darken-2";
            document.getElementById("modal-login").className = "modal";
            document.getElementById("sign-up-button-modal").className = "btn yellow darken-2";
            document.getElementById("translate-modal").className = "modal";
            document.getElementById("file-modal").className = "modal";
            document.getElementById("submitButton").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
            document.getElementById("chat-card").className = "card";
            document.getElementById("chat-title").className = "card-title black-text darken-3";
            document.getElementById("translate-button").className = "btn waves-effect waves-light yellow darken-2 modal-trigger";
            document.getElementById("attach-button").className = "btn waves-effect waves-light yellow darken-2 modal-trigger";
            document.getElementById("submit-button").className = "btn waves-effect waves-light yellow darken-2";
        }
    });
}