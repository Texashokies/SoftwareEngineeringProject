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
}


//Function for sending a message
function sendMessage() {

    return false;
}