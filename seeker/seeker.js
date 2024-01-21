// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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

var seekerState;
var info = JSON.parse(sessionStorage.getItem("seekerInfo"));
var creds = JSON.parse(sessionStorage.getItem("seekerCreds"));
function displayUserData(){
    var display = document.getElementById("displayContent");
    seekerState = {
        firstName : info.firstName,
        lastName : info.lastName,
        phoneNumber : info.phoneNumber,
        userName : info.userName,
        region : info.region,
        cityName: info.cityName,
        studyField: info.studyField,
        educationLevel: info.educationLevel,
        profession: info.profession,
        experience: info.experience,
        preferences: info.preferences,
        profilePicture: info.profilePicture
    };

    var dd = document.createElement("div");
    dd.setAttribute("class", "contain");
    var im = document.createElement("img");
    im.src=seekerState.profilePicture;
    //var classStyles = "img-fluid";
    im.setAttribute("class", "imageStyles");
    dd.appendChild(im);
    var name = document.createElement("h4");
    name.innerHTML = seekerState.firstName;
    name.setAttribute("class", "h4 text-center");
    dd.appendChild(name);

    display.appendChild(dd);

    var fr = document.getElementById("firstName"); //gets the first name element to say hello
    fr.innerHTML = seekerState["firstName"];

}

function logOut(){
    sessionStorage.removeItem("seekerInfo");
    sessionStorage.removeItem("seekerCreds");
    sessionStorage.removeItem("loggedIn");

    window.location.href="../index.html";
}

function checkCreds(){
    if(!sessionStorage.getItem("seekerCreds")){ //if the seekerCreds is null (if not logged in) then go back to index.html automatically
        window.location.href="../index.html";
    }
}

window.onload = function(){
    checkCreds();
    displayUserData();
    document.getElementById("logoutButton").addEventListener("click", logOut);
}



