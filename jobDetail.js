import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "./firebaseConfig.js";

// Initialize Firebase & getting the database reference
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth(); 


var currentJob;

window.onload = function(){
    console.log("Hello again.")
    if(sessionStorage.getItem("currentJob") != null){
        currentJob = JSON.parse(sessionStorage.getItem("currentJob"));
        console.log(currentJob);
        fillPage();
    }
}

function fillPage(){
    var displayContent = document.getElementById("displayContent");
    displayContent.style.display = "block";

    var jobValue = document.getElementById("jobNameValue");
    jobValue.innerHTML = currentJob["jobName"];
    var companyValue = document.getElementById("companyValue");
    companyValue.innerHTML = currentJob["company"];
    for(var key in currentJob){
        var keyValue = document.getElementById(key+"Value");
        if(keyValue != null){
            keyValue.innerHTML = currentJob[key];
        }
    }

    var applyButton = document.getElementById("applyButton");
    if(sessionStorage.getItem("loggedIn") != null){
        applyButton.innerHTML = "Apply";
    }
    else{
        applyButton.innerHTML= "To Apply Log In";
        applyButton.addEventListener("click", function(event){
            document.location.href="loginSeeker.html"
        })
    }
}
