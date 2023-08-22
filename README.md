<img  alt="image" src="https://github.com/NishikantaRay/generator-backdraft/assets/62615392/628be5d8-413f-4ca5-8984-b56ee42ebff0">

# Backdraft Code Generator
![npm version](https://badge.fury.io/js/generator-backdraft.svg)
![License](https://img.shields.io/npm/l/generator-backdraft)

Welcome to the Backdraft Generator! This Yeoman generator helps you quickly scaffold a new Node.js application with customizable options.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-backdraft using npm (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
npm install -g generator-backdraft

Then generate your new project:
yo backdraft
```
## Add .env file 
```
DATABASE_TEST = 
JWT_SECRET = 
APP_PORT = 3000
DATABASE = 
NODE_ENV = 'test'
API_VERSION='v1'
```
Then Run 
```
npm start
```
## Features

- Quickly scaffold projects with predefined templates and structures.
- Customizable prompts to gather project-specific information.
- Supports automatic generation of common code patterns.
- Easily extensible to include new templates and actions.
- Designed to enhance your development workflow and productivity.

## Project Structure

It will generate a Backend boilerplate project like this

```
app_name/

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

3. **Install MongoDB and Mongoose**
   - Type: Confirm
   - Name: `mongodb`
   - Message: "Install MongoDB and Mongoose?"
   - Default: Yes
   - Description: Choose whether to include MongoDB and Mongoose for database integration.

4. **Authentication API**
   - Type: Confirm
   - Name: `auth`
   - Message: "Do you want to add authentication API?"
   - Default: Yes
   - Description: Decide whether to include an authentication API in your application.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [NishikantaRay]()
