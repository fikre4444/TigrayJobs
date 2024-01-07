  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCwJMJKfYs3pg6TKTRlFR5wvNn0ySxq_bM",
    authDomain: "wrud-9476f.firebaseapp.com",
    databaseURL: "https://wrud-9476f-default-rtdb.firebaseio.com",
    projectId: "wrud-9476f",
    storageBucket: "wrud-9476f.appspot.com",
    messagingSenderId: "547648238509",
    appId: "1:547648238509:web:39eb7519d3966c29fee724"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const database = getDatabase(app);

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

var fileItem, fileName;
function getFile(e){
    console.log("hello my nigga");
    fileItem = e.target.files[0];
    fileName = fileItem.name;  
}

function uploadFile(){
    var storage = getStorage();
    var imageRef = refStorage(storage, "images/"+fileName);
    uploadBytes(imageRef, fileItem).then((snapshot) => {
    });

    // var storageRef = refStorage("images/"+fileName);
    // var uploadTask = storageRef.put(fileItem);

    // uploadTask.on("state_changed", (snapshot)=>{}, (error)=>{console.log("error is error");}, ()=>{
    //     uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
    //         console.log("url is "+url);
    //     })
    // });
}


function writeUserData(formValues) {
    const db = getDatabase();
    push(ref(db, 'users/'), {
        firstName: formValues[0],
        lastName: formValues[1],
        email: formValues[2],
        phoneNumber: formValues[3],
        userName: formValues[4],
        password: formValues[5],
        confirmPassword: formValues[6],
        region: formValues[7],
        cityName: formValues[8],
        studyField: formValues[9],
        educationLevel: formValues[10],
        profession: formValues[11],
        experience: formValues[12]
    }).then((ob)=>{
        alert("I am the promise that was");
        uploadFile();
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
        var formElements = [];
        for(let i = 0; i < ids.length; i++){
            formElements[i] = document.getElementById(ids[i]);
        }
    
        if(validateUserInput(formElements)){
            var formValues = [];
            for(let i = 0; i < formElements.length; i++){
                formValues[i] = formElements[i].value;
            }
            writeUserData(formValues);
        }
        console.log("regsitration is going on.")
    }
    else{
        return;
    }
}







// }




