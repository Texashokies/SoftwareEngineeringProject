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

    var collapsables = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsables);

    var selections = document.querySelectorAll('select');
    M.FormSelect.init(selections);

    setupUIIssues();

});

const loggedOutComponents = document.querySelectorAll('.logged-out');
const loggedInComponents = document.querySelectorAll('.logged-in');

const setupUIIssues = (user) => {
    if(user) {
        loggedInComponents.forEach(item => item.style.display = "block");
        loggedOutComponents.forEach(item => item.style.display = 'none');

        database.ref("users/" + auth.currentUser.uid).once('value' , function(snapshot) {
            console.log("IS admin:" +snapshot.val().admin);
            if(!snapshot.val().admin){
                const adminComponents = document.querySelectorAll(".admin-only");
                adminComponents.forEach(item => item.style.display = 'none');
            }
        });
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
                document.getElementById("nav-wrapper").className =  "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo orange-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card grey darken-1 amber-text darken-3";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('admin-only')){
                        if(!buttons[i].className.includes('no-modal')){
                            buttons[i].className  ="wave-effect waves-light btn orange darken-2 modal-trigger";
                        }
                        else{
                            buttons[i].className  ="wave-effect waves-light btn orange darken-2 no-modal";
                        }
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn orange darken-2 no-modal admin-only logged-in";
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
                var collapsables = document.querySelectorAll(".collapsible-header");
                for(var i =0;i<collapsables.length;i++){
                    collapsables[i].className = "collapsible-header grey darken-2 orange-text";
                }
            }
            else if (theme =="coldfire"){
                document.body.className = "grey darken-2";
                document.getElementById("nav-wrapper").className =  "nav-wrapper grey darken-4";
                document.getElementById("logo").className = "brand-logo blue-text";
                var cards = document.querySelectorAll(".card");
                for(var i =0; i< cards.length;i++){
                    cards[i].className = "card grey darken-1 blue-text darken-2";
                }
                var buttons = document.querySelectorAll(".btn");
                for(var i=0;i<buttons.length;i++){
                    if(!buttons[i].className.includes('admin-only')){
                        if(!buttons[i].className.includes('no-modal')){
                            buttons[i].className  ="wave-effect waves-light btn blue darken-2 modal-trigger";
                        }
                        else{
                            buttons[i].className  ="wave-effect waves-light btn blue darken-2 no-modal";
                        }
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn blue darken-2 no-modal admin-only logged-in";
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
                var collapsables = document.querySelectorAll(".collapsible-header");
                var collapsables = document.querySelectorAll(".collapsible-header");
                for(var i =0;i<collapsables.length;i++){
                    collapsables[i].className = "collapsible-header grey darken-2 blue-text";
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
                    if(!buttons[i].className.includes('admin-only')){
                        if(!buttons[i].className.includes('no-modal')){
                            buttons[i].className  ="wave-effect waves-light btn green darken-2 modal-trigger";
                        }
                        else{
                            buttons[i].className  ="wave-effect waves-light btn green darken-2 no-modal";
                        }
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn green darken-2 no-modal admin-only logged-in";
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
                var collapsables = document.querySelectorAll(".collapsible-header");
                var collapsables = document.querySelectorAll(".collapsible-header");
                for(var i =0;i<collapsables.length;i++){
                    collapsables[i].className = "collapsible-header green darken-2 brown-text darken-4";
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
                    if(!buttons[i].className.includes('admin-only')){
                        if(!buttons[i].className.includes('no-modal')){
                            buttons[i].className  ="wave-effect waves-light btn teal darken-2 modal-trigger";
                        }
                        else{
                            buttons[i].className  ="wave-effect waves-light btn teal darken-2 no-modal";
                        }
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn teal darken-2 no-modal admin-only logged-in";
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
                var collapsables = document.querySelectorAll(".collapsible-header");
                var collapsables = document.querySelectorAll(".collapsible-header");
                for(var i =0;i<collapsables.length;i++){
                    collapsables[i].className = "collapsible-header cyan darken-2 blue-text";
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
                    if(!buttons[i].className.includes('admin-only')){
                        if(!buttons[i].className.includes('no-modal')){
                            buttons[i].className  ="wave-effect waves-light btn brown darken-2 modal-trigger";
                        }
                        else{
                            buttons[i].className  ="wave-effect waves-light btn brown darken-2 no-modal";
                        }
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn brown darken-2 no-modal admin-only logged-in";
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
                var collapsables = document.querySelectorAll(".collapsible-header");
                var collapsables = document.querySelectorAll(".collapsible-header");
                for(var i =0;i<collapsables.length;i++){
                    collapsables[i].className = "collapsible-header brown darken-2 brown-text darken-4";
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
                    if(!buttons[i].className.includes('admin-only')){
                        if(!buttons[i].className.includes('no-modal')){
                            buttons[i].className  ="wave-effect waves-light btn yellow darken-2 modal-trigger";
                        }
                        else{
                            buttons[i].className  ="wave-effect waves-light btn yellow darken-2 no-modal";
                        }
                    }
                    else{
                        buttons[i].className  ="wave-effect waves-light btn yellow darken-2 no-modal admin-only logged-in";
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
                var collapsables = document.querySelectorAll(".collapsible-header");
                for(var i =0;i<collapsables.length;i++){
                    collapsables[i].className = "collapsible-header";
                }
            }
        });
    }
}

//Listen for bug reports
database.ref("bugreports").on("child_added", function(snapshot) {
    var html ="";
    html += '<li id="report-li-' + snapshot.key + '"><div class="card" id="report-' + snapshot.key + '">'+
    '<div class="card-content">'+
        '<span class="card-title">Bug report: </span>'+
        '<p id="description">Description:</p>'+
        snapshot.val().description +
        '<p id="dev-response">Developer Response:</p>'+
        snapshot.val().response +
    '</div>'+
    '<div class="card-action">'+
        '<a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal logged-in" onclick="editReportInit(this.id);" id="edit-button-' + snapshot.key + '@reported"> <i class="material-icons">build</i>Edit</a>'+
        '<a href="#" class="waves-effect waves-light btn red darken-2 admin-only no-modal logged-in" onClick="deleteReport(this.id);" id="delete-button-'+snapshot.key +'@reported"> <i class="material-icons">delete</i> Delete</a>'+
    '</div>'+
    '</div>' + '</li>';

    document.getElementById("reported-list").innerHTML += html;
    setDisplayAccordingToTheme();
})

database.ref("report-looked").on("child_added", function(snapshot) {
    var html ="";
    html += '<li id="looked-li-' + snapshot.key + '"><div class="card" id="report-' + snapshot.key + '">'+
    '<div class="card-content">'+
        '<span class="card-title">Bug report: </span>'+
        '<p id="description">Description:</p>'+
        snapshot.val().description +
        '<p id="dev-response">Developer Response:</p>'+
        snapshot.val().response +
    '</div>'+
    '<div class="card-action">'+
    '<a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal logged-in" onclick="editReportInit(this.id);" id="edit-button-' + snapshot.key + '@looked"> <i class="material-icons">build</i>Edit</a>'+
    '<a href="#" class="waves-effect waves-light btn red darken-2 admin-only no-modal logged-in" onClick="deleteReport(this.id);" id="delete-button-'+snapshot.key +'@looked"> <i class="material-icons">delete</i> Delete</a>'+
    '</div>'+
    '</div>' + '</li>';

    document.getElementById("looked-at-list").innerHTML += html;
})

database.ref("report-fixed").on("child_added", function(snapshot) {
    var html ="";
    html += '<li id="fixed-li-'+snapshot.key+'"><div class="card" id="report-' + snapshot.key + '">'+
    '<div class="card-content">'+
        '<span class="card-title">Bug report: </span>'+
        '<p id="description">Description:</p>'+
        snapshot.val().description +
        '<p id="dev-response">Developer Response:</p>'+
        snapshot.val().response +
    '</div>'+
    '<div class="card-action">'+
        '<a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal logged-in" onclick="editReportInit(this.id);" id="edit-button-' + snapshot.key + '@fixed"> <i class="material-icons">build</i>Edit</a>'+
        '<a href="#" class="waves-effect waves-light btn red darken-2 admin-only no-modal logged-in" onClick="deleteReport(this.id);" id="delete-button-'+snapshot.key +'@fixed"> <i class="material-icons">delete</i> Delete</a>'+
    '</div>'+
    '</div>' + '</li>';

    document.getElementById("fixed-bug-list").innerHTML += html;
})

function addReport(description){
    var reportDescription = description;
    var status = "reported";
    console.log(reportDescription);
    database.ref("bugreports/").push().set(
    {
        "description" : reportDescription,
        "response" : status
    });
    
}

function deleteReport(htmlid){
    var reportID = htmlid.substring(14,34);
    var status = htmlid.substring(35);
    console.log("Report ID" + reportID);
    console.log(status);

    if(status === "reported"){
        database.ref("bugreports/" + reportID).remove();
        document.getElementById("report-li-" + reportID).innerHTML = "";
    }
    else if(status ==="looked"){
        database.ref("report-looked/"+ reportID).remove();
        document.getElementById("looked-li-" + reportID).innerHTML = "";
    }
    else if(status ==="fixed"){
        database.ref("report-fixed/"+ reportID).remove();
        document.getElementById("fixed-li-" + reportID).innerHTML = "";
    }
}

//Submit bug report
document.getElementById("report-form").addEventListener('submit' ,(e) => {
    e.preventDefault();
    addReport(document.getElementById("report-bug-description").value);
    const modal = document.getElementById("modal-report");
    M.Modal.getInstance(modal).close();
    document.getElementById("report-form").reset();
});

function editReportInit(htmlid){
    console.log("HTML ID: " + htmlid);
    var reportID = htmlid.substring(12,32);
    console.log(reportID);
    var status = htmlid.substring(33);
    console.log(status);
    //Create the modal for this report
    var modal = `<li id="modal-li-${reportID}">
    <div id ="modal-edit-${reportID}" class="modal">
            <div class="modal-content">
                <h4 id="edit-bug-report">Edit Bug report: </h4>
                <form id="edit-form-${reportID}">
                    <div class="input-field">
                        <input type="text" id="edit-bug-description-${reportID}" required />
                        <label for="edit-bug-description">Description</label>
                    </div>
                    <div class="input-field">
                        <input type="text" id="edit-bug-response-${reportID}" required />
                        <label for="edit-bug-description">Response</label>
                    </div>
                    <div class="input-field col s12">
                        <select id="select-priority-${reportID}">
                            <option value="fixed">Fixed</option>
                            <option value="looked-at">Being Looked At</option>
                            <option value="reported">Reported</option>
                        </select>
                        <label>Edit Priority<i class="material-icons tiny">swap_vert</i></label>
                    </div>
                    <a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal" onclick="editReport(this.id);" id="edit-button-modal-${reportID}@${status}"> <i class="material-icons">build</i>Edit</a>
                </form>
            </div>
        </div></li>`
    

    document.getElementById("edit-modals").innerHTML += modal;
    var modalElem = document.getElementById("modal-edit-" + reportID);
    M.Modal.init(modalElem,{dismissible : false});
    M.FormSelect.init(document.getElementById("select-priority-" + reportID));
    var instance = M.Modal.getInstance(modalElem);
    instance.open();
    setDisplayAccordingToTheme();
}

function editReport(htmlid){
    console.log(htmlid);
    var reportID = htmlid.substring(18,38);
    var status = htmlid.substring(39);
    console.log(reportID);
    console.log(status);

    var editedDescription = document.getElementById("edit-bug-description-" + reportID).value;
    var editedResponse = document.getElementById("edit-bug-response-" + reportID).value;
    var selectedStatus = document.getElementById("select-priority-" + reportID).value;
    console.log(editedDescription);
    console.log(editedResponse);
    console.log("Selected status: " + selectedStatus);
    var prevDescription;
    var prevResponse;

    var description;
    var response;

    console.log("Status in editReport: " + status);
    if(status === "reported"){
        database.ref("bugreports/" + reportID).once('value', function(snapshot){
            console.log(snapshot);
            prevDescription = snapshot.val().description;
            prevResponse = snapshot.val().response;
        });
    }
    else if(status ==="looked"){
        database.ref("report-looked/" + reportID).once('value', function(snapshot){
            prevDescription = snapshot.val().description;
            prevResponse = snapshot.val().response;
        });
    }
    else if(status ==="fixed"){
        database.ref("report-fixed/" + reportID).once('value', function(snapshot){
            prevDescription = snapshot.val().description;
            prevResponse = snapshot.val().response;
        });
    }
    console.log("Prev desc: " + prevDescription);
    if(editedDescription === ""){
        description = prevDescription;
    }
    else{
        description = editedDescription;
    }
    if(editedResponse === ""){
        response = prevResponse;
    }
    else{
        response = editedResponse;
    }
    //Just update description and response
    if(status === selectedStatus){
        if(status === "reported"){
            database.ref("bugreports/" + reportID).set({
                "description": description,
                "response": response
            });

            var html ="";
            html += '<div class="card" id="report-' + reportID + '">'+
            '<div class="card-content">'+
                '<span class="card-title">Bug report: </span>'+
                '<p id="description">Description:</p>'+
                description +
                '<p id="dev-response">Developer Response:</p>'+
                response +
            '</div>'+
            '<div class="card-action">'+
                '<a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal logged-in" onclick="editReportInit(this.id);" id="edit-button-' + reportID + '@reported"> <i class="material-icons">build</i>Edit</a>'+
                '<a href="#" class="waves-effect waves-light btn red darken-2 admin-only no-modal logged-in" onClick="deleteReport(this.id);" id="delete-button-'+snapshot.key +'@reported"> <i class="material-icons">delete</i> Delete</a>'+
            '</div>'+
            '</div>';
            document.getElementById("report-li-" + reportID).innerHTML = html;
            setDisplayAccordingToTheme();
        }
        else if(status === "fixed"){
            database.ref("report-fixed/" + reportID).set({
                "description": description,
                "response": response
            });

            var html ="";
            html += '<div class="card" id="report-' + reportID + '">'+
            '<div class="card-content">'+
                '<span class="card-title">Bug report: </span>'+
                '<p id="description">Description:</p>'+
                description +
                '<p id="dev-response">Developer Response:</p>'+
                response +
            '</div>'+
            '<div class="card-action">'+
                '<a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal logged-in" onclick="editReportInit(this.id);" id="edit-button-' + reportID + '@fixed"> <i class="material-icons">build</i>Edit</a>'+
                '<a href="#" class="waves-effect waves-light btn red darken-2 admin-only no-modal logged-in" onClick="deleteReport(this.id);" id="delete-button-'+snapshot.key +'@fixed"> <i class="material-icons">delete</i> Delete</a>'+
            '</div>'+
            '</div>';
            document.getElementById("fixed-li-" + reportID).innerHTML = html;
            setDisplayAccordingToTheme();
        }
        else{
            database.ref("report-looked/" + reportID).set({
                "description": description,
                "response": response
            });
            var html ="";
            html += '<div class="card" id="report-' + reportID + '">'+
            '<div class="card-content">'+
                '<span class="card-title">Bug report: </span>'+
                '<p id="description">Description:</p>'+
                description +
                '<p id="dev-response">Developer Response:</p>'+
                response +
            '</div>'+
            '<div class="card-action">'+
                '<a href="#"class="waves-effect waves-light btn yellow darken-2 admin-only no-modal logged-in" onclick="editReportInit(this.id);" id="edit-button-' + reportID + '@looked"> <i class="material-icons">build</i>Edit</a>'+
                '<a href="#" class="waves-effect waves-light btn red darken-2 admin-only no-modal logged-in" onClick="deleteReport(this.id);" id="delete-button-'+snapshot.key +'@looked"> <i class="material-icons">delete</i> Delete</a>'+
            '</div>'+
            '</div>';
            document.getElementById("looked-li-" + reportID).innerHTML = html;
            setDisplayAccordingToTheme();
        }
        document.getElementById("")
    }
    else{
        //Remove old report
        if(status === "reported"){
            database.ref("bugreports/" + reportID).remove();
            document.getElementById("report-li-" + reportID).innerHTML = "";
        }
        else if(status ==="looked"){
            database.ref("report-looked/"+ reportID).remove();
            document.getElementById("looked-li-" + reportID).innerHTML = "";
        }
        else if(status ==="fixed"){
            database.ref("report-fixed/"+ reportID).remove();
            document.getElementById("fixed-li-" + reportID).innerHTML = "";
        }
        //Add new one
        if(selectedStatus === "fixed"){
            database.ref("report-fixed/").push().set({
                "description": description,
                "response": response
            });
        }
        else if(selectedStatus === "looked-at"){
            database.ref("report-looked/").push().set({
                "description": description,
                "response": response
            });
        }
        else{
            database.ref("bugreport/").push().set({
                "description": description,
                "response": response
            });
        }
        setDisplayAccordingToTheme();

        
    }
    //Close modal
    var modalElem = document.getElementById("modal-edit-" + reportID);
    M.Modal.getInstance(modalElem).destroy();
    document.getElementById("edit-form-" + reportID).reset();
    document.getElementById("modal-li-" + reportID).innerHTML = "";
}