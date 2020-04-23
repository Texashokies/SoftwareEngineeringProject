//Setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns, {constrainWidth : false});

    randomizeQuote();
    setupUIIndex();
});

const loggedOutComponents = document.querySelectorAll('.logged-out');
const loggedInComponents = document.querySelectorAll('.logged-in');

const setupUIIndex = (user) => {
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

function randomizeQuote(){
    var num = Math.floor(Math.random() * 16);
    const quote = document.getElementById("quote");
    const author = document.getElementById("quote-author");
    if(num==0){
        quote.innerHTML = "What makes a man turn neutral? Lust for gold? Power? Or where you just born with a heart full of neutrality?";
        author.innerHTML = "-Zapp Brannigan";
    }
    else if(num ==1){
        quote.innerHTML = "Live long, and prosper.";
        author.innerHTML = "-Spock";
    }
    else if(num ==2){
        quote.innerHTML = "Who actuall reads these?";
        author.innerHTML = "-The Developers";
    }
    else if (num == 3){
        quote.innerHTML = "With the first link, the chain is forged. The first speech censored, the first though forbidden, the first freedom denied, chains us all irrevocably.";
        author.innerHTML = "-Jean-Luc Picard";
    }
    else if(num == 4){
        quote.innerHTML = "Injustice anywhere is a threat to justice everywhere.";
        author.innerHTML = "-Martin Luther King Jr.";
    }
    else if (num ==5){
        quote.innerHTML = "Perhaps man wasn't meant for paradise. Maybe he was meant to claw, to scratch all the way.";
        author.innerHTML= "-James T. Kirk";
    }
    else if (num == 6){
        quote.innerHTML = "Ogres are like onions. Onions have layers. Ogres have layers.";
        author.innerHTML = "-Shrek";
    }
    else if (num == 7){
        quote.innerHTML = "Without followers, evil cannot spread.";
        author.innerHTML = "-Spock";
    }
    else if (num == 8){
        quote.innerHTML = "One man cannot summon the future. But one man can change the present!";
        author.innerHTML = "-Mirror Spock";
    }
    else if (num == 9){
        quote.innerHTML = "To boldy go where no man has gone before!";
        author.innerHTML = "-James T. Kirk";
    }
    else if (num == 10){
        quote.innerHTML = "You know the greatest danger facing us is ourselves," +
         "and irrational fear of the unknown. There is no such thing as the unknown. Only things temporarily hidden, temporarily not understood.";
        author.innerHTML = "-James T. Kirk"
    }
    else if (num == 11){
        quote.innerHTML = "A species that enslaves other beings is hardly superior - mentally or otherwise.";
        author.innerHTML = "-James T. Kirk";
    }
    else if (num == 12){
        quote.innerHTML = "Please state the nature of the medical emergency.";
        author.innerHTML = "-Emergency Medical Hologram";
    }
    else if (num == 13){
        quote.innerHTML = "Please state the nature of the medical - oh, it's you.";
        author.innerHTML = "-Emergency Medical Hologram";
    }
    else if (num ==14){
        quote.innerHTML = "There is no one on deck 9 section 12 who does not know when you're having intimate relations.";
        author.innerHTML = "-Seven of Nine";
    }
    else if (num == 15){
        quote.innerHTML = "I am curios. Have the Q always had an absences of manners, or is it the result of some natural evolutionary process that comes with omnipotence?"
        author.innerHTML = "-Tuvok";
    }
    else if (num == 16){
        quote.innerHTML = "When a bomb starts talking about itself in the third person, I get nervous.";
        author.innerHTML = "-Tom Paris";
    }
}

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

function setDisplayAccordingToTheme(){

    //Read from database right now is a test, but will need to be based on user id
    database.ref("user themes/1").on('value', function(snapshot){
        const theme = snapshot.val();
        console.log(snapshot.val());
        if(theme == "campfire"){
            document.getElementById("nav-wrapper").className = "nav-wrapper grey darken-4";
            document.getElementById("logo").className = "brand-logo orange-text";
            document.body.className = "grey darken-2";
            document.getElementById("account-warning").className = "amber-text darken-3 center-align";
            document.getElementById("account-dropdown").className = "dropdown-trigger orange darken-2 btn";
            document.getElementById("sign-in-card").className = "card grey darken-1 amber-text darken-3";
            document.getElementById("sign-in-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
            document.getElementById("sign-up-card").className = "card grey darken-1 amber-text darken-3";
            document.getElementById("sign-up-button").className = "wave-effect waves-light btn orange darken-2 modal-trigger";
            document.getElementById("quote-card").className = "card grey darken-1 amber-text darken-3";
            document.getElementById("modal-signup").className = "modal grey darken-2 amber-text";
            document.getElementById("sign-in-button-modal").className = "btn orange darken-2";
            document.getElementById("modal-login").className = "modal grey darken-2 amber-text";
            document.getElementById("login-button").className = "btn orange darken-2";
        }
        else if(theme == "coldfire"){
            document.getElementById("nav-wrapper").className = "nav-wrapper grey darken-4";
            document.getElementById("logo").className = "brand-logo blue-text";
            document.body.className = "grey darken-2";
            document.getElementById("account-warning").className = "blue-text darken-2 center-align";
            document.getElementById("account-dropdown").className = "dropdown-trigger blue darken-2 btn";
            document.getElementById("sign-in-card").className = "card grey darken-1 blue-text darken-2";
            document.getElementById("sign-in-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
            document.getElementById("sign-up-card").className = "card grey darken-1 blue-text darken-2";
            document.getElementById("sign-up-button").className = "wave-effect waves-light btn blue darken-2 modal-trigger";
            document.getElementById("quote-card").className = "card grey darken-2 blue-text darken-2";
            document.getElementById("modal-signup").className = "modal grey darken-2 blue-text";
            document.getElementById("sign-in-button-modal").className = "btn blue darken-2";
            document.getElementById("modal-login").className = "modal grey darken-2 blue-text";
            document.getElementById("login-button").className = "btn blue darken-2";
        }
        else{
            document.getElementById("nav-wrapper").className = "nav-wrapper amber darken-2";
            document.getElementById("logo").className = "brand-logo";
            document.body.className = "";
            document.getElementById("account-warning").className = "center-align";
            document.getElementById("account-dropdown").className = "dropdown-trigger amber lighten-1 btn";
            document.getElementById("sign-in-card").className = "card";
            document.getElementById("sign-in-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
            document.getElementById("sign-up-card").className = "card";
            document.getElementById("sign-up-button").className = "wave-effect waves-light btn yellow darken-2 modal-trigger";
            document.getElementById("quote-card").className = "card";
            document.getElementById("modal-signup").className = "modal";
            document.getElementById("sign-in-button-modal").className = "btn yellow darken-2";
            document.getElementById("modal-login").className = "modal";
            document.getElementById("login-button").className = "btn yellow darken-2";
        }
    });
}