function logOut() {
  sessionStorage.removeItem("seekerInfo");
  sessionStorage.removeItem("seekerCreds");
  sessionStorage.removeItem("loggedIn");

  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Hello, I am within the logouter stuff.");
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logOut);
  } else {
    console.error("Logout button not found.");
  }
});
