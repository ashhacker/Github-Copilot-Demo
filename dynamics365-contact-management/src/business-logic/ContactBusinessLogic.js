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
  const attributes = formContext.data.entity.attributes;
  const originalValues = {};
  attributes.forEach(function(attribute) {
    originalValues[attribute.getName()] = attribute.getValue();
  });
  window.ContactBusinessLogic.originalValues = originalValues;
}

// Function to show confirmation dialog if any attribute has changed
async function showChangeConfirmation(executionContext) {
  const formContext = executionContext.getFormContext();
  const attributes = formContext.data.entity.attributes;
  const originalValues = window.ContactBusinessLogic.originalValues || {};
  let hasChanges = false;
  let changedFields = [];

  attributes.forEach(function(attribute) {
    const name = attribute.getName();
    const original = originalValues[name];
    const current = attribute.getValue();
    // Compare values (simple equality, can be enhanced for complex types)
    if (original !== current) {
      hasChanges = true;
      changedFields.push(name);
    }
  });

  if (hasChanges) {
    // Show confirmation dialog (Dynamics 365 Xrm.Navigation)
    if (window.Xrm && window.Xrm.Navigation && window.Xrm.Navigation.openConfirmDialog) {
      const dialogOptions = {
        title: "Confirm Save",
        subtitle: "You have changed the following fields:",
        text: changedFields.join(", ")
      };
      const result = await window.Xrm.Navigation.openConfirmDialog(dialogOptions);
      return result.confirmed;
    } else {
      // Fallback: browser confirm
      return window.confirm("Do you really wish to update " + changedFields.join(", ") + "?");
    }
  }
  // No changes, allow save
  return true;
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

// Export for Node.js/testing environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateContactData,
    formatContactData,
    storeOriginalValues,
    showChangeConfirmation,
  };
}