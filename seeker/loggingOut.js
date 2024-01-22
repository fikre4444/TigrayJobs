document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("logoutButton").addEventListener("click", logOut);
    checkCreds();
})

function checkCreds(){
    if(!sessionStorage.getItem("seekerCreds")){ //if the seekerCreds is null (if not logged in) then go back to index.html automatically
        window.location.href="../index.html";
    }
}

function logOut(){
    sessionStorage.removeItem("seekerInfo");
    sessionStorage.removeItem("seekerCreds");
    sessionStorage.removeItem("loggedIn");
    window.location.href="../index.html";
}