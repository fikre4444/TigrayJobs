  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import firebaseConfig from "../firebaseConfig.js";
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

