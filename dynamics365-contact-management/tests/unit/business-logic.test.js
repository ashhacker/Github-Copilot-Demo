const { validateContactData, formatContactData, storeOriginalValues, showChangeConfirmation } = require('../../src/business-logic/ContactBusinessLogic');

describe('ContactBusinessLogic', () => {
  // Mock global window object for tests
  beforeEach(() => {
    global.window = {
      ContactBusinessLogic: {},
      confirm: jest.fn()
    };
  });

  afterEach(() => {
    delete global.window;
  });

  describe('validateContactData', () => {
    it('should validate contact data correctly', () => {
      const validContact = { firstName: 'John', lastName: 'Doe' };
      expect(() => validateContactData(validContact)).not.toThrow();
    });

    it('should throw error for invalid contact data', () => {
      const invalidContact = { firstName: 'John' }; // missing lastName
      expect(() => validateContactData(invalidContact)).toThrow('First name and last name are required.');
    });
  });

  describe('formatContactData', () => {
    it('should manipulate contact data as expected', () => {
      const contact = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'JOHN.DOE@EXAMPLE.COM',
        phone: '(555) 123-4567'
      };
      
      const formatted = formatContactData(contact);
      
      expect(formatted.fullName).toBe('John Doe');
      expect(formatted.email).toBe('john.doe@example.com');
      expect(formatted.phone).toBe('5551234567');
    });

    it('should handle null values correctly', () => {
      const contact = {
        firstName: 'John',
        lastName: 'Doe',
        email: null,
        phone: null
      };
      
      const formatted = formatContactData(contact);
      
      expect(formatted.fullName).toBe('John Doe');
      expect(formatted.email).toBe(null);
      expect(formatted.phone).toBe(null);
    });
  });

  describe('storeOriginalValues', () => {
    it('should store original values correctly', () => {
      const mockExecutionContext = {
        getFormContext: () => ({
          getAttribute: (name) => ({
            getValue: () => {
              const values = {
                'firstname': 'John',
                'lastname': 'Doe',
                'email': 'john@example.com',
                'telephone1': '555-1234'
              };
              return values[name];
            }
          })
        })
      };

      storeOriginalValues(mockExecutionContext);

      expect(global.window.ContactBusinessLogic.originalValues).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-1234'
      });
    });
  });

  describe('showChangeConfirmation', () => {
    it('should return true when no changes detected', async () => {
      // Set up original values
      global.window.ContactBusinessLogic.originalValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-1234'
      };

      const mockExecutionContext = {
        getFormContext: () => ({
          getAttribute: (name) => ({
            getValue: () => {
              const values = {
                'firstname': 'John',
                'lastname': 'Doe', 
                'email': 'john@example.com',
                'telephone1': '555-1234'
              };
              return values[name];
            }
          })
        })
      };

      const result = await showChangeConfirmation(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should show confirmation dialog with previous and new values when changes detected', async () => {
      global.window.confirm.mockReturnValue(true);
      
      // Set up original values
      global.window.ContactBusinessLogic.originalValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-1234'
      };

      const mockExecutionContext = {
        getFormContext: () => ({
          getAttribute: (name) => ({
            getValue: () => {
              const values = {
                'firstname': 'Jane', // Changed from John
                'lastname': 'Smith', // Changed from Doe
                'email': 'jane.smith@example.com', // Changed
                'telephone1': '555-1234' // Same
              };
              return values[name];
            }
          })
        })
      };

      const result = await showChangeConfirmation(mockExecutionContext);
      
      expect(global.window.confirm).toHaveBeenCalledWith(
        expect.stringContaining('The following fields have been modified:')
      );
      expect(global.window.confirm).toHaveBeenCalledWith(
        expect.stringContaining('First Name:\n  Previous: John\n  New: Jane')
      );
      expect(global.window.confirm).toHaveBeenCalledWith(
        expect.stringContaining('Last Name:\n  Previous: Doe\n  New: Smith')
      );
      expect(global.window.confirm).toHaveBeenCalledWith(
        expect.stringContaining('Email:\n  Previous: john@example.com\n  New: jane.smith@example.com')
      );
      expect(result).toBe(true);
    });

    it('should return false when user cancels confirmation', async () => {
      global.window.confirm.mockReturnValue(false);
      
      // Set up original values
      global.window.ContactBusinessLogic.originalValues = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-1234'
      };

      const mockExecutionContext = {
        getFormContext: () => ({
          getAttribute: (name) => ({
            getValue: () => {
              const values = {
                'firstname': 'Jane', // Changed
                'lastname': 'Doe',
                'email': 'john@example.com',
                'telephone1': '555-1234'
              };
              return values[name];
            }
          })
        })
      };

      const result = await showChangeConfirmation(mockExecutionContext);
      expect(result).toBe(false);
    });
  });
});