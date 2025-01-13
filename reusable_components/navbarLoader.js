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
 // navbarLoader.js
//  async function loadNavbar() {
//   try {
//       const response = await fetch('navbar.html'); // Fetch the navbar HTML
//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const navbarContent = await response.text(); // Get the content

//       const navbarContainer = document.createElement('div'); // Create a container for the navbar
//       navbarContainer.innerHTML = navbarContent;

//       document.body.insertBefore(navbarContainer, document.body.firstChild);
//   }
//   catch (error) {
//       console.error("Failed to load the navbar: ", error)
//   }
// }

// loadNavbar(); // Call the function to load navbar