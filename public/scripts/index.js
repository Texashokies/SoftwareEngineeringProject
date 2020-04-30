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
    var num = Math.floor(Math.random() * 21);
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
        quote.innerHTML = "Who actually reads these?";
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
    else if (num == 17){
        quote.innerHTML = "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.";
        author.innerHTML="-Roy Batty";
    }
    else if (num == 18){
        quote.innerHTML = "Hi diddly ho neighborinos!";
        author.innerHTML="-Ned Flanders";
    }
    else if(num == 19){
        quote.innerHTML = "Bless the grocer for this wonderful meat, the middleman who jacked up the price, and let's not forget the humane but determined boys at the slaughterhouse.";
        author.innerHTML="-Ned Flanders";
    }
    else if(num == 20){
        quote.innerHTML = "You're never bored painting the Lord!";
        author.innerHTML="-Ned Flanders";
    }
    else if(num == 20){
        quote.innerHTML = "Now what can I ding dong diddly do for you?";
        author.innerHTML="-Ned Flanders";
    }
    else if(num == 21){
        quote.innerHTML = "Watch Fox and be damned for all eternity.";
        author.innerHTML="-Ned Flanders";
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
    const user = auth.currentUser;
    if(user) {
        database.ref("user themes/" + user.uid).on('value', function(snapshot){
            const theme = snapshot.val();
            console.log(snapshot.val());
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
            else if(theme == "coldfire"){
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
            else if(theme == "swamp"){
                document.body.className = "green darken-2";
                document.getElementById("nav-wrapper").className =  "nav-wrapper green darken-4";
                document.getElementById("logo").className = "brand-logo brown-text darken-4";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card green darken-3 brown-text darken-4";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('no-modal')){
                        buttons[i].className  ="wave-effect waves-light btn green darken-2 modal-trigger";
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn green darken-2 no-modal";
                    }
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal green darken-2 brown-text darken-4";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content brown-text grey darken-4";
                }
            }
            else if(theme == "aqua"){
                document.body.className = "cyan darken-2";
                document.getElementById("nav-wrapper").className =  "nav-wrapper cyan darken-4";
                document.getElementById("logo").className = "brand-logo white-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card teal darken-2 white-text";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('no-modal')){
                        buttons[i].className  ="wave-effect waves-light btn teal darken-2 modal-trigger";
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn teal darken-2 no-modal";
                    }   
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal teal darken-2 white-text";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content white-text cyan darken-4";
                }
            }
            else if(theme == "mocha"){
                document.body.className = "brown darken-4";
                document.getElementById("nav-wrapper").className =  "nav-wrapper brown darken-3";
                document.getElementById("logo").className = "brand-logo white-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card brown darken-2 white-text";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('no-modal')){
                        buttons[i].className  ="wave-effect waves-light btn brown darken-2 modal-trigger";
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn brown darken-2 no-modal";
                    }
                }
                var modals = document.querySelectorAll(".modal");
                for(var i=0;i<modals.length;i++){
                    modals[i].className ="modal brown darken-2 white-text";
                }
                var dropdowns = document.querySelectorAll(".dropdown-content");
                for(var i=0;i<dropdowns.length;i++){
                    dropdowns[i].className= "dropdown-content white-text brown darken-4";
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