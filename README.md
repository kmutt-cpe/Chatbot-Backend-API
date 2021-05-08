## Project description

Backend API of CPE KMUTT department for chatbot, automated build Siamese, and knowledge management.

This project is a senior project of CPE KMUTT Chatbot group 59 in King Mongkut's University of Technology Thonburi.

## Requirement

- Node version 12.18.1
- Yarn manager
- Docker

## File Structure

- `common` - Contains base class to makes other class need to have same property / method and can implement later
- `chatbot` - Chatbot module. Used to manage message from dialogflow and send to model prediction to predict question and reply answer message back
- `knowledgeManagement` - Knowledge management module. Used to manage backend for knowledge management.
  - `modules` - Module inside km which consists of `auth`, `faq`, `category`, `subcategory`, `user`
  - `spec` - Used for test data.
- `predictionModel` - Prediction model module. Used to manage the queue and model url.

## Development Instruction

1. `yarn install` or `yarn` to install `node_modules` that required for running app
2. Use `yarn docker:dev up` to start mysql and redis

- (Optional) You can use `yarn docker:dev -d up` instead to run container in daemon

3. open a new terminal and run `yarn start`

- (Optional) You can use `yarn start:dev` instead to run the backend api in watch mode (Auto start)

## Production Instruction

1. `yarn install` or `yarn` to install `node_modules` that required for running app
2. Use `yarn docker:prod up` to start mysql and redis

- (Optional) You can use `yarn docker:prod -d up` instead to run container in daemon

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

**(Optional)** You can use `yarn start:dev` for watch mode instead.

### `yarn test`

Run jest test.

### `yarn format`

Let's prettier to scans files for style issues and automatically reformats your code to ensure consistent rules are being followed for indentation, spacing, semicolons, single quotes vs double quotes, etc.

### `yarn docker:dev`

Start `mysql` and `redis` in Docker. You need to run this command before run `yarn start`. This command use in development state

### `yarn docker:prod`

Start `mysql`, `redis`, and `backend-api` in Docker. This command use in production state
