# Dynamics 365 Contact Management Application

A comprehensive contact management solution for Microsoft Dynamics 365 that provides enhanced form event handling, business logic validation, and user experience improvements.

## 🚀 Features

- **Enhanced Form Events**: Custom event handlers for form load, save, and field changes
- **Business Logic Validation**: Comprehensive contact data validation and formatting
- **Change Confirmation**: User-friendly confirmation dialogs for unsaved changes
- **Real-time Notifications**: Form notifications for save operations and validation errors
- **Original Value Tracking**: Stores and compares original field values for change detection

## 📁 Project Structure

```
dynamics365-contact-management/
├── src/
│   ├── business-logic/
│   │   └── ContactBusinessLogic.js    # Core business logic and validation
│   ├── events/
│   │   └── Events.js                  # Form event handlers
│   └── utils/
│       └── common.js                  # Utility functions
├── tests/
│   └── unit/
│       ├── business-logic.test.js     # Business logic unit tests
│       └── events.test.js             # Event handler unit tests
├── docs/
│   ├── configuration-guide.md         # Configuration instructions
│   └── deployment-guide.md            # Deployment instructions
├── package.json                       # Project dependencies and scripts
└── README.md                          # Project documentation
```

## 🛠️ Prerequisites

- Microsoft Dynamics 365 environment
- Administrative privileges in Dynamics 365
- Node.js and npm (for development and testing)
- Basic understanding of Dynamics 365 customization

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dynamics365-contact-management.git
   cd dynamics365-contact-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Deployment

### Quick Deployment Steps

1. **Upload Web Resources**
   - Navigate to Dynamics 365 > Settings > Customizations > Customize the System
   - Upload JavaScript files as web resources

2. **Configure Form Events**
   - Open the Contact form in the form editor
   - Add event handlers in Form Properties:
     - OnLoad: `onFormLoad`
     - OnSave: `onFormSave`
     - OnChange: `onFieldChange` (optional)

3. **Register Business Logic**
   - Include `ContactBusinessLogic.js` in form libraries
   - Configure business rules as needed

For detailed deployment instructions, see [deployment-guide.md](dynamics365-contact-management/docs/deployment-guide.md).

## 📖 Configuration

The application requires specific configuration within your Dynamics 365 environment. Follow the comprehensive setup guide in [configuration-guide.md](dynamics365-contact-management/docs/configuration-guide.md).

### Key Configuration Areas:
- Entity field mappings
- Form event registration
- Business rule configuration
- User permissions and security roles

## 🧪 Testing

The project includes comprehensive unit tests for all major components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage:
- **Event Handlers**: Form load, save, and field change events
- **Business Logic**: Data validation and formatting functions
- **Error Handling**: Exception scenarios and edge cases

## 📋 Key Functions

### Event Handlers ([`Events.js`](dynamics365-contact-management/src/events/Events.js))
- **`onFormLoad`**: Stores original field values when form loads
- **`onFormSave`**: Shows confirmation dialog and handles save operations
- **`onFieldChange`**: Provides real-time field validation (optional)

### Business Logic ([`ContactBusinessLogic.js`](dynamics365-contact-management/src/business-logic/ContactBusinessLogic.js))
- **`validateContactData`**: Validates required fields and business rules
- **`formatContactData`**: Formats and standardizes contact information
- **`storeOriginalValues`**: Captures original field values for comparison

## 🔧 Development

### Available Scripts

```bash
npm run build      # Build for production
npm run start      # Start development server
npm test           # Run unit tests
```

### Development Guidelines

1. Follow the existing code structure and naming conventions
2. Add unit tests for new functionality
3. Update documentation when adding new features
4. Test thoroughly in a Dynamics 365 development environment

## 📚 Documentation

- [Configuration Guide](dynamics365-contact-management/docs/configuration-guide.md) - Setup and configuration instructions
- [Deployment Guide](dynamics365-contact-management/docs/deployment-guide.md) - Step-by-step deployment process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines:
- Ensure all tests pass
- Add tests for new functionality
- Follow existing code style and conventions
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues and Support

If you encounter any issues or need support:

1. Check the [documentation](dynamics365-contact-management/docs/) for common solutions
2. Search existing [GitHub Issues](https://github.com/yourusername/dynamics365-contact-management/issues)
3. Create a new issue with detailed information about the problem

## 👥 Authors

- **Asif Jawed** - *Initial work* - [YourGitHubProfile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Microsoft Dynamics 365 development community
- Contributors and testers
- Open source libraries and tools used in this project

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and updated.

---

**Note**: Replace `yourusername` in the GitHub URLs with your actual GitHub username before publishing.
