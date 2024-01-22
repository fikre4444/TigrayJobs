 // Import the functions you need from the SDKs you need.
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 import {populatePage} from "./jobsPopulater.js";


// Your web app's Firebase configuration.
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

var employerState;

document.addEventListener("DOMContentLoaded", function(){
    var form  = document.getElementById("jobFields");
    if(form != null){ // we have to check because this script is used by two html files. that might not have the element
        form.addEventListener("submit", handlePost);
    }
    var searchingButton = document.getElementById("searchingButton");
    if(searchingButton != null){ // if the seaching button is in this page.
        searchingButton.addEventListener("click", searching);
    }

    var returnToAll = document.getElementById("returnToAll");
    if(returnToAll != null){
        returnToAll.addEventListener("click", handleReturnTo);
        console.log("return to")
    }

    var comp = document.getElementById("company");
    if(comp != null){
        //sets the value of the company field to the employer's company and it is unchangeable.
        if(sessionStorage.getItem("employerInfo") != null){
            employerState = JSON.parse(sessionStorage.getItem("employerInfo"));
            comp.value = employerState.company;
            comp.setAttribute("disabled", "disabled");
        }
    }
     
});


function handleReturnTo(){
    document.location.href = "jobs.html";
    console.log("ok")
}

function getJob(){
    var jobName = document.getElementById("jobName");
    var category = document.getElementById("category");
    var region = document.getElementById("region");
    var cityName = document.getElementById("cityName");
    var employmentType = document.getElementById("employmentType");
    var salary = document.getElementById("salary");
    var deadline = document.getElementById("deadline");
    var jobDescription = document.getElementById("jobDescription");
    var company = document.getElementById("company");
    var postedDate = new Date();
    var employerId = JSON.parse(sessionStorage.getItem("employerCreds")).uid;




    var job = {
        "jobName" : jobName.value,
        "category" : category.value,
        "region" : region.value, 
        "cityName" : cityName.value,
        "employmentType" : employmentType.value,
        "salary" : salary.value,
        "deadline" : deadline.value,
        "jobDescription" : jobDescription.value,
        "company" : company.value,
        "postedDate" : postedDate.toString(),
        "employerId" : employerId
    };

    //console.log(job);
    return job;
        
}

function uploadJob(job){
    var jobId = new Date().getTime(); //creates a random unique id.
    job.jobId = jobId;
    set(ref(database, 'jobs/'+jobId), job)
    .then((ob)=>{
        alert("It has been done.");
        sessionStorage.removeItem("jobs"); //removes item so that when gotten back 
        location.href="jobsSubmit.html";
    }).catch((error)=>{
        alert("There was an error");
    })
}

function handlePost(event){
    event.preventDefault(); // prevents the default behavior of sumbit
    var job = getJob(); //gets the job inputs in the form of an object
    uploadJob(job); //uploads the job.
}

function searching(){
    var searchBy = document.getElementById("searchBy");
    var searchedValue = document.getElementById("searchedValue");
    var dbRef = ref(database);
    get(child(dbRef, 'jobs')).then((snapshot)=>{
        if(snapshot.exists()){
            var jobs = snapshot.val();
            sessionStorage.setItem("jobs", JSON.stringify(jobs));
            var searchResults = getResults(jobs, searchBy.value, searchedValue.value);
            console.log("The results are "+searchResults);
            console.log("The number of results is "+Object.keys(searchResults).length);
            var jobsTitle = document.getElementById("jobsTitle");
            var resultAmount = Object.keys(searchResults).length; // the number of results
            jobsTitle.innerHTML = "Search results ( "+(searchBy.value).toUpperCase()+ " - > "+ searchedValue.value + " - > " + resultAmount + " ) ";
            jobsTitle.setAttribute("class", "h5");
            var returnToAll = document.getElementById("returnToAll");
            returnToAll.style.display = "block";
            populatePage(searchResults);
            sessionStorage.setItem("searching", "true");
        }
    });
}

function getResults(jobs, searchBy, searchedValue){
    var searchResults = {};
    for(var key in jobs){
        var job = jobs[key];
        var jobFieldValue = job[searchBy].toLowerCase();
        var searchedValueLower = searchedValue.toLowerCase();
        if(jobFieldValue.indexOf(searchedValueLower) != -1){
            searchResults[key] = job;
        }
    }
    return searchResults;
}

