 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, ref, set, push, get, child, onValue, query, orderByChild, equalTo, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



// Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDd9bYkS8Y0ow8EfIEEUB01_IkqmpdpSAc",
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


var job, jobApplications; //job applications will hold the application and the applicant

window.onload = function(){
    console.log("hello");
    getAllObjects();
}


function getAllObjects(){
    job = JSON.parse(sessionStorage.getItem("currentJob"));
    var jobId = Number(sessionStorage.getItem("currentJobId"));

    const dbRef = query(ref(database, 'applications'), orderByChild('jobId'), equalTo(jobId));
    get(dbRef).then((snapshot)=>{ //gets the jobapplications that match the jobId
        console.log("inside the get fun");
        if(snapshot.exists()){
            var jobApplications = snapshot.val();
            //console.log(jobApplications);
            const seekersRef = query(ref(database, 'users'));
            get(seekersRef).then((seekersShot)=>{ //gets all the job seekers
                if(seekersShot.exists()){
                    var allSeekers = seekersShot.val();
                    //console.log(allSeekers);
                    for( var key in jobApplications){
                        if(allSeekers[jobApplications[key].seekerId] != null){
                            jobApplications[key].seekerObject = allSeekers[jobApplications[key].seekerId];
                        }
                    }
                    populatePageApplications(jobApplications);
                }
            })
        }else{
            console.log("snapshot doesn't exist");
            var applicantsHolder = document.getElementById("applicantsHolder");
            applicantsHolder.innerHTML = ""; //empty the loading... text;
            var resultMessage = document.createElement("h1");
            resultMessage.innerHTML = "No Applicants Found";
            applicantsHolder.appendChild(resultMessage);
        }    
    }).catch((error)=>{
        console.log("There was an error an we couldn't retrieve.")
    })
    // if(sessionStorage.getItem("jobs") == null || databaseChange){ //if we didn't load the jobs before
    //     console.log("loading from firebase")
    //     get(dbRef).then((snapshot)=>{
    //         if(snapshot.exists()){
    //             var jobs = snapshot.val();
    //             sessionStorage.setItem("jobs", JSON.stringify(jobs));
    //             populatePage(jobs);
    //         }
    //     })
    // }
    // else{
    //     console.log("loading from cache.")
    //     var jobs = JSON.parse(sessionStorage.getItem("jobs"));
    //     populatePage(jobs);
    // }

}


function populatePageApplications(applications){
    var holder = document.getElementById("applicantsHolder");
    if(holder != null){
        holder.innerHTML = "";
    }
    var jobName = document.createElement("h1");
    jobName.innerHTML = "Job Title: "+job.jobName;
    holder.appendChild(jobName);

    var applicantsTitle = document.createElement("h2");
    applicantsTitle.innerHTML = "Applicants ------------------------------"
    holder.appendChild(applicantsTitle);
    var colorCounter = 0;
    var applicantsCounter = 1;
    for(var key in applications){
        console.log("Apllication id is "+key);
        var application = applications[key];
        var applicantHolder = document.createElement("div");
        var backgroundColors = ["background-color: rgba(189, 240, 255, 0.7);", "background-color: rgba(147, 229, 181, 0.5);"];
        applicantHolder.setAttribute("class", "p-3 rounded-3 m-3 hoverEffect");
        applicantHolder.setAttribute("style", backgroundColors[colorCounter]);
        //go to detail maybe
        colorCounter = (colorCounter+1)%2;
        addOtherDetails(applicantHolder, application, applicantsCounter);
        applicantsCounter++;
        holder.appendChild(applicantHolder);
    }
}


function addOtherDetails(applicantHolder, application, applicantsCounter){
    // var applicantName = document.createElement("h1");
    // applicantName.innerHTML = "Applicant Name : "+application.seekerObject.firstName+" "+application.seekerObject.lastName;
    // applicantHolder.appendChild(applicantName);

    // var employmentType = document.createElement("span");
    // employmentType.setAttribute("class", "col-md text-primary fw-bold");
    // employmentType.innerHTML = job["employmentType"];
    // jobHolder.appendChild(employmentType);
    // jobHolder.appendChild(document.createElement("br"));
    
    // var jobName = document.createElement("span");
    // jobName.setAttribute("class", "h4 text-start");
    // jobName.innerHTML = job["jobName"] + " ( " + job.company + " ) ";
    // jobHolder.appendChild(jobName);
    console.log(application.seekerObject);
    var applicantName = document.createElement("span");
    applicantName.setAttribute("class", "h4 text-start");
    applicantName.innerHTML = applicantsCounter + ". Applicant Name : " + application.seekerObject.firstName+" "+application.seekerObject.lastName;
    applicantHolder.appendChild(applicantName);

    var restDetails = document.createElement("div"); //creates the inner div
    restDetails.setAttribute("class", "row mt-3 fw-bolder");        
        var profession = document.createElement("span");
        profession.setAttribute("class", "col-md");
        var professionValue = application.seekerObject.profession;
        if(professionValue == "" || professionValue == null){
            professionValue = "Unknown"; //if it's empty make it unknown
        }
        profession.innerHTML = "Profession : "+professionValue;
        restDetails.appendChild(profession);
    applicantHolder.appendChild(restDetails);




    

    // var restDetails = document.createElement("div"); //creates the inner div
    // restDetails.setAttribute("class", "row mt-3 fw-bolder"); //sets <div class="row mt-3 fw-bolder">
    //     var location = document.createElement("span");  //<span class="col-md"><i class="fa fa-map-marker"></i> Mekelle</span>
    //     location.setAttribute("class", "col-md");
    //         var locationLogo = document.createElement("i");
    //         locationLogo.setAttribute("class", "fa fa-map-marker");
    //     location.appendChild(locationLogo);
    //         var cityName = document.createElement("span");
    //         cityName.innerHTML = " "+job["cityName"];
    //     location.appendChild(cityName);
    //     restDetails.appendChild(location); //adds the location element to the inner div

    //     var postedAgo = document.createElement("span");  //<span class="col-md">Posted 8 days ago.</span>
    //     postedAgo.setAttribute("class", "col-md");
    //     postedAgo.innerHTML = job["postedAgo"];
    //     restDetails.appendChild(postedAgo);
    
    // jobHolder.appendChild(restDetails);
    // var removeJob = document.createElement("button");
    // removeJob.setAttribute("class", "btn btn-danger mt-2 px-4 mx-2");
    // removeJob.setAttribute("type", "button");
    // removeJob.innerHTML = "Remove Job";
    // removeJob.addEventListener("click", removeTheJob);
    // jobHolder.appendChild(removeJob);

    // var viewApplicants = document.createElement("button");
    // viewApplicants.setAttribute("class", "btn btn-primary mt-2 px-4");
    // viewApplicants.setAttribute("type", "button");
    // viewApplicants.innerHTML = "View Applicants";
    // viewApplicants.addEventListener("click", viewTheApplicants);
    // jobHolder.appendChild(viewApplicants);
    // if(sessionStorage.getItem("loggedIn") != null){ // if someone is logged do this.
    //     applyButton.innerHTML = "Apply";
    // }else{
    //     applyButton.innerHTML = "To Apply Log In"
    //     applyButton.addEventListener("click", function(event){
    //         event.stopPropagation();
    //         document.location.href = "loginSeeker.html"
    //     });
    // }
    

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