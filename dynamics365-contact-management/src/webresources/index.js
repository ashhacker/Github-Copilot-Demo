// Entry point for web resources in the Dynamics 365 environment

// Initialize the application and load necessary scripts
function initializeApp() {
  console.log("Initializing Dynamics 365 Contact Management Application");

  // Load event handlers
  registerContactEvents();

  // Additional initialization logic can go here
}

// Call the initializeApp function when the script is loaded
initializeApp();