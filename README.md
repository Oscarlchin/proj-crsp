# ProjCrsp

fgdfgdgdgdgdgd

Reference:
  1. http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial
  2. https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e
  3. https://github.com/expressjs/cors
  4. http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

##Package used
FE: Angular, Bootstrap, Angular Material
BE: nodejs, express, mongoose, body-parser, passport, passport-local, cors, bcrypt, multer, fast-csv
Suggestion: soctketio??

## Project Requirement
1) Two different access modes:
  1. Users – Only users have access to the app contents. A user is recognized using a username (unique string of 4-20 characters) and password (hashed string of 4-20 characters) pair. The
  2. Admins – Admins will be able to perform CRUD actions to the event data and the user data on your database.

2) Data schemas and models for storing items. For the events, you are required to maintain at least:
  1. Title / activity name / program name
  2. Program date and time (e.g., as a single piece of string)
  3. Presenter / organization name / activity type name
  4. Venue name / location name / venue id
  5. One more attribute you find useful from the dataset
  These data may be named and formatted differently in the above datasets. You need to design your database access according to that. Only English data is required for the project app. For the schema and model for users and other social networking components, you may design freely to suit your needs.

3) User actions:
  1. List all events in a table, and allow sorting of the table with one of the listed fields
  2. Search for events which contain certain keywords in one field chosen by the user
  which will result in a table of event results similar to that in the above item
  3. A separate view for one single event, containing the event details and also user
  comments, where users can add new comments (non-threaded)
  4. Add events into a list of favourite events, and see the list in another view (flexible
  implementation)
  5. See username in the top right of screen, and be able to log out

4) Admin actions:
  1. Flush data, i.e. reload from the online dataset
  2. CRUD event data in the local database
  3. CRUD user data (username and password only) in the local database
  4. Obtain event data from CSV file upload (simple instructions need to be provided for
  user for data format)
  5. Log out as admin

5) Non-user actions: (Carsten)
  1. Log in as user with username and password
  2. Log in as admin via a link (yes that’s very insecure)

5) SYSTEM REQUIREMENTS
  Your project app needs to be a Single Page Application, without refreshing the page for any internal links. However, visits to all different views should be reserved in the browser history, with a proper URL.
  You may freely decide the technologies and frameworks to be used in this project. The grading will be done using Google Chrome (almost-newest versions), so your app should at least serve HTML and relevant styling and scripting codes.

6) “ABOUT THIS PROJECT”
You need to include one extra section in your project app, and name it “About This Project”. This article should describe:
  1. Names and workload distribution of each group member
  2. Basic “how-to” of your project app
  -- If there are requirements that is not implemented, please indicate.
  3. Design of data schemas and models of your database (figures are welcome)
  4. Technologies and frameworks/libraries in use
  -- If you have chosen to use technologies/frameworks other than Bootstrap/Node.js/Express/MongoDB/Angular, show a simple table of at least two advantages and two disadvantages of your chosen platform comparing to the ones suggested.
  5. Indicate whether or not you have read this article carefully:
  http://www.cuhk.edu.hk/policy/academichonesty
  All the text in this page should also be save in another Readme file to be submitted together with your work. In this file, please also describe the steps to execute/access your app.

7) SUBMISSION AND ASSESSMENT
Include full names and student IDs of all members in all code files using comments. Zip all your files and submit it on the course site on Blackboard.
If there is, you do not need to submit the node_modules folder. Your project will be graded by:
  1. Technical requirements – fulfilment and complexity (60%)
  2. Usability – look and feel (30%)
  3. Project demo (10%)







## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
