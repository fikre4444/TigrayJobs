document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("logoutButton").addEventListener("click", logOut);
    checkCreds();
})

function checkCreds(){
    if(!sessionStorage.getItem("employerCreds")){ //if the seekerCreds is null (if not logged in) then go back to index.html automatically
        window.location.href="../index.html";
    }
}

function logOut(){
    sessionStorage.removeItem("employerInfo");
    sessionStorage.removeItem("employerCreds");
    sessionStorage.removeItem("loggedIn");
    window.location.href="../index.html";
}