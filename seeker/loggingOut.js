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

checkCreds();