// navbarLoader.js
async function loadNavbar() {
  try {
      const response = await fetch('./reusable_components/navbar.html');
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const navbarContent = await response.text();
 
      const navbarContainer = document.createElement('div');
      navbarContainer.innerHTML = navbarContent;
 
      document.body.insertBefore(navbarContainer, document.body.firstChild);
      setActiveLink();
      console.log("now i'm done ok use your logout button.")
      document.dispatchEvent(new Event("navbarLoaded"));
  } catch (error) {
      console.error("Failed to load the navbar: ", error);
  }
 }
 
  function setActiveLink() {
  const path = window.location.pathname; // Get current path
 
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
          const linkPath = new URL(link.href, window.location.origin).pathname; // Extract path from href
          
          if (linkPath === path) {
              link.classList.add('active'); // Add 'active' class
          } else{
              link.classList.remove('active')
          }
      });
  }
  
  loadNavbar();