// filepath: dynamics365-contact-management/src/business-logic/ContactBusinessLogic.js
// Business logic for contact management in Dynamics 365

// Function to validate contact data
function validateContactData(contact) {
  if (!contact.firstName || !contact.lastName) {
    throw new Error("First name and last name are required.");
  }
  // Additional validation logic can be added here
}

// Function to manipulate contact data
function formatContactData(contact) {
  return {
    fullName: `${contact.firstName} ${contact.lastName}`,
    email: contact.email ? contact.email.toLowerCase() : null,
    phone: contact.phone ? contact.phone.replace(/\D/g, '') : null,
  };
}

// Function to store original values for comparison
function storeOriginalValues(executionContext) {
  const formContext = executionContext.getFormContext();
  const originalValues = {
    firstName: formContext.getAttribute("firstname").getValue(),
    lastName: formContext.getAttribute("lastname").getValue(),
    email: formContext.getAttribute("email").getValue(),
    phone: formContext.getAttribute("telephone1").getValue(),
  };
  window.ContactBusinessLogic.originalValues = originalValues;
}

// Exporting functions for use in other modules
window.ContactBusinessLogic = {
  validateContactData,
  formatContactData,
  storeOriginalValues,
};