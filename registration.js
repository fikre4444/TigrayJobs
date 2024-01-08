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

var allFormValues, profilePictureUrl;
//after loading - add event listener for the registration, and for the pop up close button
window.onload = function(){
    var form = document.getElementById("registrationForm");
    form.addEventListener("submit", handleRegistration);
    var closeButton = document.getElementById("closeButton");
    closeButton.addEventListener("click", function(){
        var errorCorrection = document.getElementById("errorCorrection");
        errorCorrection.style.display = "none";
    });

    var profilePicture = document.getElementById("profilePicture");
    profilePicture.addEventListener("change", getFile);
}


//used for getting the profile picture so it can be uploded later
//it is stored in a global variable so that we can use it later in the upload file function
var fileItem, fileName;
function getFile(e){
    console.log("picture captured.");
    fileItem = e.target.files[0];
    var extension = fileItem.name.split('.').pop(); //gets the extension of the file
    fileName = crypto.randomUUID()+'.'+extension; //generates a new name for the file to be uploaded to avoid conflicting names.
}


function registerUser(){
    if(fileItem != null){ //if a picture has been captured then we need to upload
        uploadFile(); //uploads the profile pic and then calls write the user data with the profile pic url
    }
    else{
        writeUserData(); //just calls the writeUserData and then so that the avatar's url is the default url.
    }
}

function uploadFile(){
    var storage = getStorage(); //gets the storage 
    var imageRef = storageRef(storage, "images/"+fileName); //using the storage get a refernce to the images folder
    //then upload the image content
    uploadBytes(imageRef, fileItem).then((snapshot) => {
        getDownloadURL(imageRef).then((url)=>{
            //writeUserData(formValues, url);
            profilePictureUrl = url;
            writeUserData();
        });
    });

}


function writeUserData() {

    //get the email and password from the formValues array
    var email = allFormValues[2];
    var password = allFormValues[5];

    createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {        
        var userId = credentials.user.uid;
        if(profilePictureUrl == null){
            profilePictureUrl = "https://firebasestorage.googleapis.com/v0/b/tigrayjobs-3f65f.appspot.com/o/images%2Favatar.jpg?alt=media&token=c8916d9a-7d40-4943-96fa-773a34376e54";
         }
        set(ref(database, 'users/'+userId), {
            firstName: allFormValues[0],
            lastName: allFormValues[1],
            phoneNumber: allFormValues[3],
            userName: allFormValues[4],
            region: allFormValues[7],
            cityName: allFormValues[8],
            studyField: allFormValues[9],
            educationLevel: allFormValues[10],
            profession: allFormValues[11],
            experience: allFormValues[12],
            preferences: "",
            profilePicture: profilePictureUrl

        }).then((ob)=>{
            alert("Account created Successfully.");
            var databaseRef = ref(database);
            get(child(databaseRef, 'users/'+credentials.user.uid)).then((snapshot)=>{
                if(snapshot.exists){
                    var userInfo = JSON.stringify(snapshot.val());
                    sessionStorage.setItem("seekerInfo", userInfo);
                    sessionStorage.setItem("seekerCreds", JSON.stringify(credentials.user));
                    document.location.href="seeker/seekerPage.html";
                }else{
                    alert("snapshot doesn't exist");
                }
            });
        });

        console.log("Created the User successfully. With Email/Password.");
    })
    .catch((error) => {
        if(error.code == 'auth/email-already-in-use'){
            alert("Sorry! This email is already in use. Try another.");
        }
    });  

}

function validateUserInput(){
    var firstName = document.getElementById("firstName");
    if(!checkValidity(firstName.value, "name")){
        generateErrorMessage("Input Invalid (First Name)! Please make sure that the First Name input only has letters and spaces");
        return false;
    }
    var lastName = document.getElementById("lastName");
    if(!checkValidity(lastName.value, "name")){
        generateErrorMessage("Input Invalid (Last Name)! Please make sure that the Last Name input only has letters and spaces");
        return false;
    }
    var phoneNumber = document.getElementById("phoneNumber");
    if(phoneNumber.value.length > 0){ //if there is an input
        if(!checkValidity(phoneNumber.value, "phoneNumber")){
            generateErrorMessage("Input invalid (Phone No)! Please check the examples in the input to follow one of the two ways to write phone numbers.");
            return false;
        }
    }

    var userName = document.getElementById("userName");
    if(!checkValidity(userName.value.trim(), "userName")){
        generateErrorMessage("Input invalid (User Name)! Please make sure that the input user name only contains alphabets and numbers in those order.");
        return false;
    }

    var password = document.getElementById("password");
    var confirm = document.getElementById("confirmPassword");
    if(!checkValidity(password.value, "password")){
        generateErrorMessage("Input invalid (password)! Please make sure that the password doesn't contain spaces.!");
        return false;
    }
    if(password.value != confirm.value){
        generateErrorMessage("The Two password inputs don't match. Please make sure they are equal.");
        return false;
    }

    var cityName = document.getElementById("cityName");
    if(cityName.value.length > 0){
        if(!checkValidity(cityName.value, "name")){
            generateErrorMessage("Input Invalid (City Name)! Please make sure that the City Name input only has letters and spaces");
            return false;
        }
    }

    var studyField = document.getElementById("studyField");
    if(studyField.value.length > 0){
        if(!checkValidity(studyField.value, "name")){
            generateErrorMessage("Input Invalid (Field Of Study)! Please make sure that the Field Of Study input only has letters and spaces");
            return false;
        }
    }

    var profession = document.getElementById("profession");
    if(profession.value.length > 0){
        if(!checkValidity(profession.value, "name")){
            generateErrorMessage("Input Invalid (Main Profession)! Please make sure that the Main Profession input only has letters and spaces");
            return false;
        }
    }

    return true;
}

function checkValidity(input, typeInput){
    if(typeInput == "name"){
        if(!(/^[a-zA-Z ]+$/.test(input))){
            return false;
        }
    }else if(typeInput == "email"){
        return true;
    }else if(typeInput == "phoneNumber"){
        if(!(/^09[0-9]{8}$|^2519[0-9]{8}$/.test(input))){
            return false;
        }
    }else if(typeInput == "userName"){
        if(!(/^[a-zA-Z]{1}[a-zA-Z0-9]*$/.test(input))){
            return false;
        }
    }else if(typeInput == "password"){
        if(!(/^\S+$/.test(input))){
            return false;
        }
    }
    return true;
}

function generateErrorMessage(msg){
    var errorContainer = document.getElementById("errorCorrection");
    var errorContent = document.getElementById("errorContent");
    errorContent.innerHTML = msg;
    errorContainer.style.display = "block";
    
}

function handleRegistration(event){
    event.preventDefault(); //prevent the default submission behavior
    console.log("staring now");
    var validated = validateUserInput();
    if(validated){
        console.log("validated");
        var ids = ["firstName", "lastName", "email", "phoneNumber", "userName", "password", "confirmPassword", "region", "cityName", "studyField", "educationLevel", "profession", "experience"];
        var formElements = []; //stores the objects themselves not the values of the form inputs
        for(let i = 0; i < ids.length; i++){
            formElements[i] = document.getElementById(ids[i]);
        }
        var formValues = []; //stores the values of the form inputs
        for(let i = 0; i < formElements.length; i++){
            formValues[i] = formElements[i].value;
        }
        allFormValues = formValues;
        registerUser();
    }
    else{
        return;
    }
}







// }




