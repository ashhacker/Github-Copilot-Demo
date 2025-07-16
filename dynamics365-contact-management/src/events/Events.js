// filepath: dynamics365-contact-management/src/events/Events.js
// Contact form event handlers for Dynamics 365

// Form OnLoad event
function onFormLoad(executionContext) {
  try {
    // Store original values when form loads
    window.ContactBusinessLogic.storeOriginalValues(executionContext);

    console.log("Contact form loaded - original values stored");
  } catch (error) {
    console.error("Error in onFormLoad:", error);
  }
}

// Form OnSave event
async function onFormSave(executionContext) {
  try {
    const eventArgs = executionContext.getEventArgs();

    // Prevent the save initially
    eventArgs.preventDefault();

    // Show confirmation dialog for changed fields
    const confirmed = await window.ContactBusinessLogic.showChangeConfirmation(
      executionContext
    );

    if (confirmed) {
      // User confirmed - allow the save to proceed
      const formContext = executionContext.getFormContext();
      formContext.data.entity.save();

      console.log("Save confirmed and executed");
    } else {
      // User cancelled - save is already prevented
      console.log("Save cancelled by user");

      // Optionally show a notification
      const notification = {
        type: "warning",
        level: "form",
        message: "Changes were not saved.",
        showCloseButton: true,
        uniqueId: "save_cancelled",
      };

      const formContext = executionContext.getFormContext();
      formContext.ui.setFormNotification(
        notification.message,
        notification.level,
        notification.uniqueId
      );

      // Clear notification after 3 seconds
      setTimeout(() => {
        formContext.ui.clearFormNotification(notification.uniqueId);
      }, 3000);
    }
  } catch (error) {
    console.error("Error in onFormSave:", error);

    // Show error notification
    const formContext = executionContext.getFormContext();
    formContext.ui.setFormNotification(
      "An error occurred while processing the save request.",
      "error",
      "save_error"
    );
  }
}

// Optional: Field onChange event for real-time validation
function onFieldChange(executionContext) {
  try {
    const formContext = executionContext.getFormContext();
    const changedAttribute = executionContext.getEventSource();

    console.log(`Field changed: ${changedAttribute.getName()}`);

    // You can add additional validation logic here if needed
  } catch (error) {
    console.error("Error in onFieldChange:", error);
  }
}

// Utility function to register events (call this during form configuration)
function registerContactEvents() {
  // This would typically be configured in the Dynamics 365 form designer
  console.log("Contact events registered:");
  console.log("- onFormLoad: Stores original field values");
  console.log("- onFormSave: Shows confirmation dialog for changed fields");
  console.log("- onFieldChange: Optional real-time field validation");
}

// Export functions for testing (when in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    onFormLoad,
    onFormSave,
    onFieldChange,
    registerContactEvents
  };
}