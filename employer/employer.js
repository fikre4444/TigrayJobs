// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from "../firebaseConfig.js";

// Initialize Firebase & getting the database reference
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth(); 

var employerState;
var info = JSON.parse(sessionStorage.getItem("employerInfo"));
var creds = JSON.parse(sessionStorage.getItem("employerCreds"));
function displayUserData(){
    var display = document.getElementById("displayContent");
    employerState = {
        firstName : info.firstName,
        lastName : info.lastName,
        phoneNumber : info.phoneNumber,
        userName : info.userName,
        region : info.region,
        cityName: info.cityName,
        company: info.company,
        role: info.role,
        profilePicture: info.profilePicture
    };

    var dd = document.createElement("div");
    dd.setAttribute("class", "contain");
    var im = document.createElement("img");
    im.src=employerState.profilePicture;
    //var classStyles = "img-fluid";
    im.setAttribute("class", "imageStyles");
    dd.appendChild(im);
    var name = document.createElement("h4");
    name.innerHTML = employerState.firstName;
    name.setAttribute("class", "h4 text-center");
    dd.appendChild(name);

    display.appendChild(dd);

    var fr = document.getElementById("firstName"); //gets the first name element to say hello
    fr.innerHTML = employerState["firstName"];

}

function logOut(){
    sessionStorage.removeItem("employerInfo");
    sessionStorage.removeItem("employerCreds");
    sessionStorage.removeItem("loggedIn");
    window.location.href="../index.html";
}

function checkCreds(){
    if(!sessionStorage.getItem("employerCreds")){ //if the seekerCreds is null (if not logged in) then go back to index.html automatically
        window.location.href="../index.html";
    }
}

window.onload = function(){
    checkCreds();
    displayUserData();
    document.getElementById("logoutButton").addEventListener("click", logOut);
    console.log("employer.js is running");
}



