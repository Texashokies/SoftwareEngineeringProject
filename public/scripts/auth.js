//Script deals with changing of authentication status

//Firebase should have been initialized by one of the pages own scripts

//make auth and firestore references
const authentication = firebase.auth();


//Listen for auth status changes log ins and outs
authentication.onAuthStateChanged(user => {
    console.log(user);
    //Logged in
    if(user){
        console.log("User logged in: ", user);
        try {
            setupUIIndex(user);
        }
        catch(err){
            console.log(err);
        }
        try {
            setupUISettings(user);
        }
        catch(err){
            console.log(err);
        }
        try {
            setupUIChat(user);
        }
        catch(err){
            
        }
        try {
            setupUIContacts(user);
        }
        catch(err){
            console.log(err);
        }
        try {
            setupUIIssues(user);
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        console.log("User logged out: ", user);
        try {
            setupUIIndex(user);
        }
        catch(err){
            console.log(err);
        }
        try {
            setupUISettings(user);
        }
        catch(err){
            console.log(err);
        }
        try {
            setupUIChat(user);
        }
        catch(err){
            console.log(err);
        }
        try {
            setupUIIssues(user);
        }
        catch(err){
            console.log(err);
        }
    }
})

//User Sign Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value

    auth.createUserWithEmailPassword(email, password).then(cred => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//User Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
    });
});

//User login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});



