  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
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

var jobId, seekerId;

window.onload = function(){
    var submitApplication = document.getElementById("submitApplication");
    submitApplication.addEventListener("click", submitTheApplication);

    jobId = JSON.parse(sessionStorage.getItem("currentJob")).jobId;
    seekerId = JSON.parse(sessionStorage.getItem("seekerCreds")).uid;

    console.log("The job is is "+jobId);
    console.log("the seeker id is "+seekerId);

}


function submitTheApplication(){

    var resumeWriting = document.getElementById("resumeWriting").value;

    var appId = new Date().getTime();
    var submitedDate = new Date().toString();
    var application = {
        applicationId : appId,
        jobId : jobId,
        seekerId : seekerId,
        resumeWriting: resumeWriting,
        submitedDate : submitedDate
    }
    
    set(ref(database, 'applications/'+appId), application)
    .then((ob)=>{
        alert("The application has been submitted.");
        sessionStorage.removeItem("currentJob");
        location.href = "jobs.html";
    }).catch((error)=>{
        alert("There was an error");
    })
}

