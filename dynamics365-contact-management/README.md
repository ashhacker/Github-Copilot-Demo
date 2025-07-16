# Dynamics 365 Contact Management

This project is a Dynamics 365 contact management application that provides functionalities for managing contact information through event handling and business logic.

## Project Structure

```
dynamics365-contact-management
├── src
│   ├── events
│   │   └── Events.js          # Event handler functions for the contact form
│   ├── business-logic
│   │   └── ContactBusinessLogic.js # Business logic related to contact management
│   ├── utils
│   │   └── common.js          # Utility functions for common operations
│   └── webresources
│       └── index.js           # Entry point for web resources
├── docs
│   ├── deployment-guide.md     # Instructions for deploying the application
│   └── configuration-guide.md   # Configuration settings for the application
├── tests
│   └── unit
│       ├── events.test.js      # Unit tests for event handler functions
│       └── business-logic.test.js # Unit tests for business logic functions
├── package.json                 # npm configuration file
├── .gitignore                   # Files and directories to ignore by Git
└── README.md                    # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd dynamics365-contact-management
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Configure the application as per the instructions in the `docs/configuration-guide.md`.

5. Deploy the application following the steps outlined in the `docs/deployment-guide.md`.

## Usage Guidelines

- The application is designed to handle contact management within Dynamics 365.
- Event handlers are defined in `src/events/Events.js` to manage form loading and saving processes.
- Business logic related to contacts can be found in `src/business-logic/ContactBusinessLogic.js`.
- Utility functions for common operations are located in `src/utils/common.js`.

For further details, please refer to the documentation in the `docs` folder.