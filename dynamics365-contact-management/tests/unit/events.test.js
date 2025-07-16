import { onFormLoad, onFormSave, onFieldChange } from '../../src/events/Events';

describe('Event Handlers', () => {
  let mockExecutionContext;

  beforeEach(() => {
    mockExecutionContext = {
      getEventArgs: jest.fn(),
      getFormContext: jest.fn(),
      getEventSource: jest.fn(),
    };
  });

  test('onFormLoad should store original values', () => {
    const storeOriginalValuesMock = jest.fn();
    window.ContactBusinessLogic = { storeOriginalValues: storeOriginalValuesMock };

    onFormLoad(mockExecutionContext);

    expect(storeOriginalValuesMock).toHaveBeenCalledWith(mockExecutionContext);
    console.log = jest.fn(); // Mock console.log
    expect(console.log).toHaveBeenCalledWith("Contact form loaded - original values stored");
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
    window.ContactBusinessLogic = {
      showChangeConfirmation: jest.fn().mockResolvedValue(true),
    };

    await onFormSave(mockExecutionContext);

    expect(preventDefaultMock).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalled();
    console.log = jest.fn(); // Mock console.log
    expect(console.log).toHaveBeenCalledWith("Save confirmed and executed");
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
    window.ContactBusinessLogic = {
      showChangeConfirmation: jest.fn().mockResolvedValue(false),
    };

    await onFormSave(mockExecutionContext);

    expect(preventDefaultMock).toHaveBeenCalled();
    expect(formContextMock.ui.setFormNotification).toHaveBeenCalledWith(
      "Changes were not saved.",
      "warning",
      "save_cancelled"
    );
  });

  test('onFieldChange should log field changes', () => {
    const changedAttributeMock = {
      getName: jest.fn().mockReturnValue('testField'),
    };

    mockExecutionContext.getEventSource.mockReturnValue(changedAttributeMock);
    console.log = jest.fn(); // Mock console.log

    onFieldChange(mockExecutionContext);

    expect(console.log).toHaveBeenCalledWith("Field changed: testField");
  });
});