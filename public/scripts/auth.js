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
    }
})

