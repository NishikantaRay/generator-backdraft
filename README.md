<img  alt="image" src="https://github.com/NishikantaRay/generator-backdraft/assets/62615392/628be5d8-413f-4ca5-8984-b56ee42ebff0">

# Backdraft Code Generator
![npm version](https://badge.fury.io/js/generator-backdraft.svg)
![License](https://img.shields.io/npm/l/generator-backdraft)

Welcome to the Backdraft Multi-Framework Generator! This powerful Yeoman generator allows you to effortlessly scaffold a fully customized Node.js application, offering flexible options for frontend frameworks and additional features, tailored to streamline your development process and enhance productivity.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-backdraft using npm (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
npm install -g generator-backdraft

Then generate your new project:
yo backdraft

```
## Add .env file 
# Environment Configuration

# Database Connection Strings
DATABASE_DEVELOPMENT || DATABASE_STAGING || DATABASE_PRODUCTION || DATABASE_LIVE2= # Connection string for the 

# JWT Configuration
TOKEN_SECRET= # Secret key used for signing JWT tokens

# Application Configuration
APP_PORT=3000 # Port on which the application will run

# Environment Setting
NODE_ENV='test' # Set the environment (options: development, staging, production, live2, test)

# API Versioning
API_VERSION='v1' # Version of the API to be used

Then Run 
```
npm start
```
### Here are the comprehensive features of the Backdraft Multi-Framework Generator:
- Predefined Templates: Quickly scaffold projects with built-in templates and structures for common project setups.
- Customizable Prompts: Gather specific project information with customizable prompts for a tailored application setup.
- Frontend Framework Support: Supports React, Angular, Next.js, and Vue, giving flexibility in frontend setup.
- Backend Integration: Includes backend boilerplate setup with options for MongoDB and Mongoose integration.
- Authentication API: Provides an option to add an authentication API, facilitating secure user management.
- Tailwind CSS Integration: Optionally includes Tailwind CSS for streamlined frontend styling.
- State Management: Supports state management tools like Redux (for React) and Vuex (for Vue).
- Testing Tools: Integrates Jest for unit testing and Cypress for end-to-end testing setups.
- Code Patterns Automation: Automates common code patterns for efficient development.
- ESLint Setup: Configurable ESLint setup for both frontend and backend code quality assurance.
- Extensibility: Easily extensible to include new templates, frameworks, and actions for evolving development needs.
- Productivity Focused: Designed to streamline and enhance development workflows, maximizing productivity.

## Project Structure

It will generate a Backend boilerplate project like this

```
1 - app_name/frontend

2 - app_name//backend

│
├── config/
│   └── database.js          # Configuration for database connection
│
├── controller/
│   └── user.js              # User-related controller logic
│
├── models/
│   └── user.js              # User model schema
│
├── routes/
│   ├── index.js             # Main application router
│   └── user.js              # User-related route definitions
│
├── services/
│   └── user.js              # User-related business logic
│
├── validators/
│   ├── joi.validators.js    # Validation schema using Joi
│   └── index.js             # Exported validation functions
│
├── index.js                 # Application entry point
└── package.json             # Node.js package configuration
```
## Prompts

During project setup, you'll be prompted to answer a few questions to tailor the generated application to your needs.

1. **App Name**
   - Type: Input
   - Name: `name`
   - Message: "App Name"
   - Default: "myapp"
   - Description: Enter the desired name for your application.

2. **App Description**
   - Type: Input
   - Name: `description`
   - Message: "App Description"
   - Default: "My App"
   - Description: Provide a brief description of your application.

3. **Select a Frontend Framework**
   - Type: List
   - Name: `frontendFramework`
   - Message: "Select a frontend framework:"
   - Choices: ["React", "Angular", "Next.js", "Vue"]
   - Description: Choose the frontend framework you want to use.

4. **Select Additional Features**
   - Type: Checkbox
   - Name: `features`
   - Message: "Select additional features to include:"
   - Choices:
      - Tailwind CSS
      - Redux (for React)
      - Vuex (for Vue)
      - Jest Testing
      - Cypress Testing
   - Description: Choose additional features to include in your project.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [NishikantaRay]()
