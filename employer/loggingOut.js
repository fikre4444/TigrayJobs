document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("navbarLoaded", function () {
        console.log("Navbar loaded. Attaching logout button events.");
        const logoutButton = document.getElementById("logoutButton");
        if (logoutButton) {
            logoutButton.addEventListener("click", logOut);
        }
    });
})

function checkCreds(){
    console.log("checking creds")
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

checkCreds();