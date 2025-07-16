const { onFormLoad, onFormSave, onFieldChange } = require('../../src/events/Events');

describe('Event Handlers', () => {
  let mockExecutionContext;

  beforeEach(() => {
    // Mock global window object
    global.window = {
      ContactBusinessLogic: {
        storeOriginalValues: jest.fn(),
        showChangeConfirmation: jest.fn()
      }
    };
    
    mockExecutionContext = {
      getEventArgs: jest.fn(),
      getFormContext: jest.fn(),
      getEventSource: jest.fn(),
    };
    
    // Mock console.log to avoid noise in tests
    global.console = {
      log: jest.fn(),
      error: jest.fn()
    };
  });

  afterEach(() => {
    delete global.window;
    delete global.console;
  });

  test('onFormLoad should store original values', () => {
    onFormLoad(mockExecutionContext);

    expect(global.window.ContactBusinessLogic.storeOriginalValues).toHaveBeenCalledWith(mockExecutionContext);
    expect(global.console.log).toHaveBeenCalledWith("Contact form loaded - original values stored");
  });

  test('onFormSave should confirm save and execute', async () => {
    const preventDefaultMock = jest.fn();
    const saveMock = jest.fn();
    const formContextMock = {
      data: {
        entity: {
          save: saveMock,
        },
      },
      ui: {
        setFormNotification: jest.fn(),
        clearFormNotification: jest.fn(),
      },
    };

    mockExecutionContext.getEventArgs.mockReturnValue({ preventDefault: preventDefaultMock });
    mockExecutionContext.getFormContext.mockReturnValue(formContextMock);
    global.window.ContactBusinessLogic.showChangeConfirmation.mockResolvedValue(true);

    await onFormSave(mockExecutionContext);

    expect(preventDefaultMock).toHaveBeenCalled();
    expect(global.window.ContactBusinessLogic.showChangeConfirmation).toHaveBeenCalledWith(mockExecutionContext);
    expect(saveMock).toHaveBeenCalled();
    expect(global.console.log).toHaveBeenCalledWith("Save confirmed and executed");
  });

  test('onFormSave should cancel save if user does not confirm', async () => {
    const preventDefaultMock = jest.fn();
    const formContextMock = {
      ui: {
        setFormNotification: jest.fn(),
        clearFormNotification: jest.fn(),
      },
    };

    mockExecutionContext.getEventArgs.mockReturnValue({ preventDefault: preventDefaultMock });
    mockExecutionContext.getFormContext.mockReturnValue(formContextMock);
    global.window.ContactBusinessLogic.showChangeConfirmation.mockResolvedValue(false);

    await onFormSave(mockExecutionContext);

    expect(preventDefaultMock).toHaveBeenCalled();
    expect(global.window.ContactBusinessLogic.showChangeConfirmation).toHaveBeenCalledWith(mockExecutionContext);
    expect(formContextMock.ui.setFormNotification).toHaveBeenCalledWith(
      "Changes were not saved.",
      "form",
      "save_cancelled"
    );
  });

  test('onFieldChange should log field changes', () => {
    const changedAttributeMock = {
      getName: jest.fn().mockReturnValue('testField'),
    };

    mockExecutionContext.getEventSource.mockReturnValue(changedAttributeMock);

    onFieldChange(mockExecutionContext);

    expect(global.console.log).toHaveBeenCalledWith("Field changed: testField");
  });
});