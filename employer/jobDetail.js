import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push, get, child, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 import firebaseConfig from "../firebaseConfig.js";



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

    var removeJob = document.getElementById("removeJob");
    removeJob.addEventListener("click", removeTheJob);

    var viewApplicants = document.getElementById("viewApplicants");
    viewApplicants.addEventListener("click", viewTheApplicants);

}


function removeTheJob(event){
    var jobId = currentJob['jobId'];
    console.log("job is is"+jobId);
    var refToJob = ref(database, 'jobs/'+jobId);
    remove(refToJob).then(()=>{
        alert("Job Removed Successfully");
        sessionStorage.removeItem("jobs");
        location.href="postedJobs.html";

    }).catch((error)=>{
        alert("There was a problem removing the job.")
    });

}

function viewTheApplicants(event){
    event.stopPropagation();
    var jobId = currentJob['jobId']
    sessionStorage.setItem("currentJobId", jobId);
    location.href="applicants.html";
}

