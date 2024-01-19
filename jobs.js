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

window.onload = function(){
    var form  = document.getElementById("jobFields");
    form.addEventListener("submit", handlePost);
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
    var postedDate = new Date();




    var job = {
        "jobName" : jobName.value,
        "category" : category.value,
        "region" : region.value, 
        "cityName" : cityName.value,
        "employmentType" : employmentType.value,
        "salary" : salary.value,
        "deadline" : deadline.value,
        "jobDescription" : jobDescription.value,
        "postedDate" : postedDate
    };

    //console.log(job);
    return job;
        
}

function uploadJob(job){
    var jobId = crypto.randomUUID(); //creates a random unique id.
    set(ref(database, 'jobs/'+jobId), job)
    .then((ob)=>{
        alert("It has been done.");
    }).catch((error)=>{
        alert("There was an error");
    })
}

function handlePost(event){
    event.preventDefault(); // prevents the default behavior of sumbit
    var job = getJob(); //gets the job inputs in the form of an object
    uploadJob(job); //uploads the job.
}

