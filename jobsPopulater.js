 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 import firebaseConfig from "./firebaseConfig.js";


// Initialize Firebase & getting the database reference
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth(); 

var jobCategories = {}; // the object that holds the number of jobs in each category. has to wait
var databaseChange = false;
var initialLoad = true;

window.onload = function(){
    sessionStorage.removeItem("searching"); 
    doAllInitializations();
    var showNewJobs = document.getElementById("showNewJobs");
    if(showNewJobs != null){
        showNewJobs.addEventListener("click", ()=>{
            doAllInitializations(); 
            var newJobsUploaded = document.getElementById("newJobsUploaded");
            newJobsUploaded.style.display = "none";
        });
    }

}

function checkChanges(){
    console.log("checking changes...");
    const dbReference = ref(database, 'jobs/');
    onValue(dbReference, (snapshot) => {
        if(initialLoad){ // if this is the first time we are loading do nothing
            //we do this because this function runs this inside code everytime we 
            initialLoad = false;
            console.log("THis is first time.")
        }else{
            if(sessionStorage.getItem("searching") != "true"){
                console.log("now is the time to make changes");
                databaseChange = true;
                var newJobsUploaded = document.getElementById("newJobsUploaded");
                newJobsUploaded.style.display = "block";
            }
        }
    });
}

function doAllInitializations(){
    console.log("populating.");
    const dbRef = ref(database);
    if(sessionStorage.getItem("jobs") == null || databaseChange){
        console.log("loading from firebase")
        get(child(dbRef, 'jobs')).then((snapshot)=>{
            if(snapshot.exists()){
                var jobs = snapshot.val();
                sessionStorage.setItem("jobs", JSON.stringify(jobs));
                populatePage(jobs);
            }
        })
    }
    else{
        console.log("loading from cache.")
        var jobs = JSON.parse(sessionStorage.getItem("jobs"));
        populatePage(jobs);
    }
    checkChanges();
}

export function populatePage(jobs){
    jobs = sortJobs(jobs);
    var holder = document.getElementById("jobsHolder"); // this holds all the jobs
    if(holder != null){
        holder.innerHTML = ""; //clears anything that was in there.
    var colorCounter = 0;
    for(var key in jobs){
        console.log("Job Id is "+key); 
        var job = jobs[key]; // this gets the job object for every key (which is job id)
        var jobHolder = document.createElement('div'); // creates a holder a single job
        var backgroundColors = ["background-color: rgba(189, 240, 255, 0.7);", "background-color: rgba(147, 229, 181, 0.5);"];
        jobHolder.setAttribute("class", "p-3 rounded-3 m-3 hoverEffect");
        jobHolder.setAttribute("style", backgroundColors[colorCounter]);
        jobHolder.addEventListener('click', goToDetail);
        colorCounter = (colorCounter+1)%2;
        addOtherDetails(jobHolder, job);
        holder.appendChild(jobHolder);
        jobHolder.setAttribute("jobId", key);
    }
    }
    
}

function goToDetail(event){ // goes to the detailed view page (jobDetail)
    var tar = event.currentTarget; // gets the one that generated the event
    var jobId = tar.getAttribute("jobId").toString(); // gets the job id
    console.log("job id is "+jobId);
    var jobs = JSON.parse(sessionStorage.getItem("jobs"));
    var job = JSON.stringify(jobs[jobId]);
    sessionStorage.setItem("currentJob", job);
    document.location.href = "jobDetail.html";

}

function addOtherDetails(jobHolder, job){
    if(job.hasOwnProperty("postedDate")){
        var date = new Date(job["postedDate"]);
        job.postedAgo = getPostedAgo(date); // adds a posted ago property to the job object
    }
    else{
        job.postedAgo = "Posted Unknown time ago.";
    }
    if(!job.hasOwnProperty("company")){
        job.company = "Company";
    }
    var employmentType = document.createElement("span");
    employmentType.setAttribute("class", "col-md text-primary fw-bold");
    employmentType.innerHTML = job["employmentType"];
    jobHolder.appendChild(employmentType);
    jobHolder.appendChild(document.createElement("br"));
    
    var jobName = document.createElement("span");
    jobName.setAttribute("class", "h4 text-start");
    jobName.innerHTML = job["jobName"] + " ( " + job.company + " ) ";
    jobHolder.appendChild(jobName);

    var restDetails = document.createElement("div"); //creates the inner div
    restDetails.setAttribute("class", "row mt-3 fw-bolder"); //sets <div class="row mt-3 fw-bolder">
        var location = document.createElement("span");  //<span class="col-md"><i class="fa fa-map-marker"></i> Mekelle</span>
        location.setAttribute("class", "col-md");
            var locationLogo = document.createElement("i");
            locationLogo.setAttribute("class", "fa fa-map-marker");
        location.appendChild(locationLogo);
            var cityName = document.createElement("span");
            cityName.innerHTML = " "+job["cityName"];
        location.appendChild(cityName);
        restDetails.appendChild(location); //adds the location element to the inner div

        var postedAgo = document.createElement("span");  //<span class="col-md">Posted 8 days ago.</span>
        postedAgo.setAttribute("class", "col-md");
        postedAgo.innerHTML = job["postedAgo"];
        restDetails.appendChild(postedAgo);
    
    jobHolder.appendChild(restDetails);
    var applyButton = document.createElement("button");
    applyButton.setAttribute("class", "btn btn-primary mt-2 px-4");
    applyButton.setAttribute("type", "button");
    if(sessionStorage.getItem("loggedIn") != null){ // if someone is logged do this.
        applyButton.innerHTML = "Apply";
    }else{
        applyButton.innerHTML = "To Apply Log In"
        applyButton.addEventListener("click", function(event){
            event.stopPropagation();
            document.location.href = "loginSeeker.html"
        });
    }
    jobHolder.appendChild(applyButton);

    /*
                    <span class="col-md text-primary fw-bold">Full Time</span><br>
                    <span class="h4 text-start">Software Engineer, <i class="fa-solid fa-layer-group"></i>Google</span>
                    <div class="row mt-3 fw-bolder">
                        <span class="col-md"><i class="fa fa-map-marker"></i> Mekelle</span>
                        <span class="col-md">Posted 8 days ago.</span>
                    </div>
                    <button type="button" class="btn btn-primary mt-2 px-4">Apply</button>
    */
}

function getPostedAgo(givenDate){ //gets the how long it was posted ago.
    
    var currentDate = new Date();
    var diff = currentDate.getTime() - givenDate.getTime();
    var diffDays = Math.round(diff/(1000*3600*24));
    var diffHours = Math.round(diff/(1000*3600));
    var diffMinutes = Math.round(diff/(1000*60));
    var posted = "Posted ";
    if(diffDays >= 1){
        if(diffDays == 1){
            posted += "1 day ago.";
        }else{
            posted += diffDays + " days ago.";
        }
    }
    else if(diffHours >= 1){
        if(diffHours == 1){
            posted += "1 hour ago.";
        }else{
            posted += diffHours + " hours ago.";
        }
    }
    else if(diffMinutes >= 0) {
        if(diffMinutes == 0){
            posted += "now.";
        }
        else if(diffMinutes == 1){
            posted += "1 minute ago."
        }else {
            posted += diffMinutes + " minutes ago.";
        }
    }
    else {
        posted += "in the future."
    }
    return posted;
}

function sortJobs(jobs){
    //sorts the jobs so that the first one that is seen is the latest which has the largest millisecond and hence is sorted in descending
    var jobsArray = Object.keys(jobs).map((key) => [key, jobs[key]]);
    for(var i = 0; i < jobsArray.length-1; i++){
        for(var j = 0; j < jobsArray.length-i-1; j++){
            if(jobsArray[j][0] < jobsArray[j+1][0]){
                var temp = jobsArray[j];
                jobsArray[j] = jobsArray[j+1];
                jobsArray[j+1] = temp;
            }
        }
    }
    var newJobs = {};
    for(var i = 0; i < jobsArray.length; i++){
        newJobs[jobsArray[i][0]] = jobsArray[i][1];
    }
    return newJobs;
}
