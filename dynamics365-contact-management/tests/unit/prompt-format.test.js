// Simple test to verify the prompt message format
const { showChangeConfirmation } = require('../../src/business-logic/ContactBusinessLogic');

describe('Prompt Message Format', () => {
  beforeEach(() => {
    // Reset the mock
    global.window.confirm.mockReset();
    global.window.confirm.mockReturnValue(true);
    
    global.window.ContactBusinessLogic = {
      originalValues: {
        firstName: 'John',
        lastName: 'Doe'
      }
    };
  });

  it('should use "Do you really wish to update" format in prompt', async () => {
    const mockExecutionContext = {
      getFormContext: () => ({
        data: {
          entity: {
            attributes: [
              {
                getName: () => 'firstName',
                getValue: () => 'Jane' // Changed from John
              },
              {
                getName: () => 'lastName',
                getValue: () => 'Doe' // Same
              }
            ]
          }
        }
      })
    };

    await showChangeConfirmation(mockExecutionContext);
    
    expect(global.window.confirm).toHaveBeenCalledWith(
      "Do you really wish to update firstName?"
    );
  });
});