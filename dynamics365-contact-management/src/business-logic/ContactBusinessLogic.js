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
  
  // Store in window object if available (browser environment)
  if (typeof window !== 'undefined') {
    if (!window.ContactBusinessLogic) {
      window.ContactBusinessLogic = {};
    }
    window.ContactBusinessLogic.originalValues = originalValues;
  }
  
  // Also return the values for testing purposes
  return originalValues;
}

// Function to show change confirmation dialog with previous and new values
async function showChangeConfirmation(executionContext) {
  const formContext = executionContext.getFormContext();
  
  // Get original values from window object or empty object as fallback
  let originalValues = {};
  if (typeof window !== 'undefined' && window.ContactBusinessLogic && window.ContactBusinessLogic.originalValues) {
    originalValues = window.ContactBusinessLogic.originalValues;
  }
  
  // Get current values
  const currentValues = {
    firstName: formContext.getAttribute("firstname").getValue(),
    lastName: formContext.getAttribute("lastname").getValue(),
    email: formContext.getAttribute("email").getValue(),
    phone: formContext.getAttribute("telephone1").getValue(),
  };
  
  // Find changed fields
  const changedFields = [];
  const fieldLabels = {
    firstName: 'First Name',
    lastName: 'Last Name', 
    email: 'Email',
    phone: 'Phone'
  };
  
  Object.keys(currentValues).forEach(field => {
    const originalValue = originalValues[field];
    const currentValue = currentValues[field];
    
    // Compare values (handle null/undefined/empty string cases)
    const normalizedOriginal = originalValue || '';
    const normalizedCurrent = currentValue || '';
    
    if (normalizedOriginal !== normalizedCurrent) {
      changedFields.push({
        field: fieldLabels[field],
        originalValue: originalValue || '(empty)',
        currentValue: currentValue || '(empty)'
      });
    }
  });
  
  // If no changes detected, allow save
  if (changedFields.length === 0) {
    return true;
  }
  
  // Build confirmation message with previous and new values
  let message = "The following fields have been modified:\n\n";
  
  changedFields.forEach(change => {
    message += `${change.field}:\n`;
    message += `  Previous: ${change.originalValue}\n`;
    message += `  New: ${change.currentValue}\n\n`;
  });
  
  message += "Do you want to save these changes?";
  
  // Show confirmation dialog
  if (typeof window !== 'undefined' && window.confirm) {
    // Browser environment - use native confirm dialog
    return window.confirm(message);
  } else {
    // For testing or other environments, return true by default
    return true;
  }
}

// Exporting functions for use in other modules
if (typeof window !== 'undefined') {
  window.ContactBusinessLogic = {
    validateContactData,
    formatContactData,
    storeOriginalValues,
    showChangeConfirmation,
  };
}

// Export functions for testing (when in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateContactData,
    formatContactData,
    storeOriginalValues,
    showChangeConfirmation,
  };
}