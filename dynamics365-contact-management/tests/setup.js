// Test setup file for Jest
// This file is run before each test file

// Mock global window for browser-specific code
global.window = global.window || {};

// Ensure confirm is properly mocked
Object.defineProperty(global.window, 'confirm', {
  writable: true,
  value: jest.fn()
});

// Default values for ContactBusinessLogic
global.window.ContactBusinessLogic = global.window.ContactBusinessLogic || {};

// Dynamics 365 object not available in tests
global.window.Xrm = undefined;