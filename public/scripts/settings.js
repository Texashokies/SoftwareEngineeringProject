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
                document.getElementById("nav-wrapper").className = "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo orange-text";
                document.body.className = "grey darken-2";
                document.getElementById("account-dropdown").className = "dropdown-trigger orange darken-2 btn";
                document.getElementById("sign-in-card").className = "card grey darken-1 amber-text darken-3";
                document.getElementById("sign-in-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
                document.getElementById("sign-up-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
                document.getElementById("modal-login").className = "modal grey darken-2 amber-text";
                document.getElementById("log-in-button").className = "btn orange darken-2";
                document.getElementById("modal-signup").className = "modal grey darken-2 amber-text";
                document.getElementById("sign-up-button-modal").className = "btn orange darken-2";
                document.getElementById("profile-card").className = "card grey darken-3 amber-text darken-2";
                document.getElementById("change-password").className = "btn waves-effect waves-light orange darken-2";
                document.getElementById("user-profile-save-button").className = "wave-effect waves-light btn orange darken-2";
                document.getElementById("display-card").className = "card grey darken-3 amber-text";
                document.getElementById("save-button").className = "wave-effect waves-light btn orange darken-2";
                document.getElementById("delete-card").className = "card grey darken-3 amber-text";
                document.getElementById("delete-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
                document.getElementById("modal-delete").className = "modal grey darken-2 amber-text";
                document.getElementById("nevermind-button").className = "btn orange darken-2";
            }
            else if(theme == "coldfire"){
                document.getElementById("nav-wrapper").className = "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo blue-text";
                document.body.className = "grey darken-2";
                document.getElementById("account-dropdown").className = "dropdown-trigger blue darken-2 btn";
                document.getElementById("sign-in-card").className = "card grey darken-3 blue-text darken-2";
                document.getElementById("sign-in-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
                document.getElementById("sign-up-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
                document.getElementById("modal-login").className = "modal grey darken-2 blue-text";
                document.getElementById("log-in-button").className = "btn blue darken-2";
                document.getElementById("modal-signup").className = "modal grey darken-2 blue-text";
                document.getElementById("sign-up-button-modal").className = "btn blue darken-2";
                document.getElementById("profile-card").className = "card grey darken-3 blue-text darken-2";
                document.getElementById("change-password").className = "btn waves-effect waves-light blue darken-2";
                document.getElementById("user-profile-save-button").className = "wave-effect waves-light btn blue darken-2";
                document.getElementById("display-card").className = "card grey darken-3 blue-text";
                document.getElementById("save-button").className = "wave-effect waves-light btn blue darken-2";
                document.getElementById("delete-card").className = "card grey darken-3 blue-text";
                document.getElementById("delete-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
                document.getElementById("modal-delete").className = "modal grey darken-2 blue-text";
                document.getElementById("nevermind-button").className = "btn  blue darken-2";
            }
            else{
                document.getElementById("nav-wrapper").className = "nav-wrapper amber darken-2";
                document.getElementById("logo").className = "brand-logo";
                document.body.className = "";
                document.getElementById("account-dropdown").className = "dropdown-trigger amber lighten-1 btn";
                document.getElementById("sign-in-card").className = "card";
                document.getElementById("sign-in-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
                document.getElementById("sign-up-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
                document.getElementById("modal-login").className = "modal";
                document.getElementById("log-in-button").className = "btn yellow darken-2";
                document.getElementById("modal-signup").className = "modal";
                document.getElementById("sign-up-button-modal").className = "btn yellow darken-2";
                document.getElementById("profile-card").className = "card";
                document.getElementById("change-password").className = "btn waves-effect waves-light yellow darken-2";
                document.getElementById("user-profile-save-button").className = "wave-effect waves-light btn yellow darken-2";
                document.getElementById("display-card").className = "card";
                document.getElementById("save-button").className = "wave-effect waves-light btn yellow darken-2";
                document.getElementById("delete-card").className = "card";
                document.getElementById("delete-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
                document.getElementById("modal-delete").className = "modal";
                document.getElementById("nevermind-button").className = "btn  yellow darken-2";
            }
        });
    }
    else {
        document.getElementById("nav-wrapper").className = "nav-wrapper amber darken-2";
        document.getElementById("logo").className = "brand-logo";
        document.body.className = "";
        document.getElementById("account-dropdown").className = "dropdown-trigger amber lighten-1 btn";
        document.getElementById("sign-in-card").className = "card";
        document.getElementById("sign-in-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
        document.getElementById("sign-up-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
        document.getElementById("modal-login").className = "modal";
        document.getElementById("log-in-button").className = "btn yellow darken-2";
        document.getElementById("modal-signup").className = "modal";
        document.getElementById("sign-up-button-modal").className = "btn yellow darken-2";
        document.getElementById("profile-card").className = "card";
        document.getElementById("change-password").className = "btn waves-effect waves-light yellow darken-2";
        document.getElementById("user-profile-save-button").className = "wave-effect waves-light btn yellow darken-2";
        document.getElementById("display-card").className = "card";
        document.getElementById("save-button").className = "wave-effect waves-light btn yellow darken-2";
        document.getElementById("delete-card").className = "card";
        document.getElementById("delete-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
        document.getElementById("modal-delete").className = "modal";
        document.getElementById("nevermind-button").className = "btn  yellow darken-2";
    }
}