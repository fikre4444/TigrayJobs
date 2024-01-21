import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



// Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyC0HyuVn6tutXp83EA782SR9kx8D0HC704",
   authDomain: "tigrayjobs-3f65f.firebaseapp.com",
   databaseURL: "https://tigrayjobs-3f65f-default-rtdb.firebaseio.com",
   projectId: "tigrayjobs-3f65f",
   storageBucket: "tigrayjobs-3f65f.appspot.com",
   messagingSenderId: "514987892658",
   appId: "1:514987892658:web:afbc1d249b022604624eab"
 };


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