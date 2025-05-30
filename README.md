# Sudoku Solver (in Angular)

## About

The solver allows to enter a Sudoku which is not solved yet.
![Enter puzzle](./readme/SudokuSolver_About_1.png)

It then solves it step by step. Every step updates the UI and gives a note what was done in the last step.
![Solve Sudoku](./readme/SudokuSolver_About_2.png)

My motivation behind developing this was to answer the question "When I solve a Sudoku, my brain follows certain algorithms to find a solution. Can I write them down as source code? Also I want a nice UI for it."

## Prerequisites

The following prerequisites need to be fulfilled to work with the project:

1. [NodeJS](https://nodejs.org/en/about) is installed.
   - Open a command line and execute `node -v` to check your node installation. The result should look similar to this:
     ```
     $ node -v
     v20.11.1
     ```
   - If node is not installed, follow the installation instructions:
     - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
     - https://nodejs.org/en/download
2. [npm](https://docs.npmjs.com/about-npm) is installed.
   - Open a command line and execute `npm -v` to check your node installation. The result should look similar to this:
     ```
     $ npm -v
     10.2.4
     ```
   - If npm is not installed, follow the installation instructions:
     - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
3. [npx](https://docs.npmjs.com/cli/v8/commands/npx) is installed.
   - Open a command line and execute `npx -v` to check your node installation. The result should look similar to this:
     ```
     $ npx -v
     10.2.4
     ```
   - If npx is not installed, execute `npm i -g npx` to install.

## Development

### Development server

Run `npm run start` for a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running Cypress tests

Run `npm run cy-headless` to execute all Cypress component tests. Run `npm run cy-open` to start Cypress and execute single tests.
This application has no E2E tests.

### Lint

Run `npm run lint` to run linter on the project.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
