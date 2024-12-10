  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import firebaseConfig from './firebaseConfig.js';

// Initialize Firebase & getting the database reference
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

window.onload = function(){
    var form = document.getElementById("loginForm");
    form.addEventListener("submit", handleLogin);
}


function handleLogin(event){
    event.preventDefault();
    console.log("checking login credentials")
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((credentials)=>{
        // console.log("successfully logged in!");
        // console.log(credentials);
        var databaseRef = ref(database);
        get(child(databaseRef, 'employers/'+credentials.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
                var userInfo = JSON.stringify(snapshot.val());
                sessionStorage.setItem("employerInfo", userInfo);
                sessionStorage.setItem("employerCreds", JSON.stringify(credentials.user));
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.removeItem("jobs");
                document.location.href="employer/employerPage.html";
            }else{
                alert("snapshot doesn't exist");
            }
        });
    }).catch((error)=>{
        if(error.code == 'auth/invalid-credential'){
            alert("Either the Email or Password is wrong. Please try again!");
        }
    });



}

