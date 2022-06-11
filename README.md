# teesas-test

Teesas Test 


> A Simple Auth RestAPI

## Getting Started

> [[Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Tests](#tests) &middot; [Author](#author)


## Technologies Used

[node]: (https://nodejs.org)

- [Node.js](node)
- [postgreSQL](node)
- [Express.js](https://expressjs.com).
- [ESLint](https://eslint.org/).
- [Sequelize](https://www.npmjs.com/package/sequelize).

## Testing Tools

- [Mocha](https://mochajs.org/).
- [Chai](https://chaijs.com).

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `git@github.com:victorsteven/Book-app-NodeJS-PostgreSQL-Travis-Coveralls-Code-Climate.git`

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm run dev:mac for mac user
  $ npm run dev:win for window user
  ```
- Use `http://localhost:8888` as base url for endpoints

## API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                 |
| ------ | --------------------------------------- | ------------------------- |
| POST   | Sign up user                            | `/api/v1/user/sign-up`    |
| POST   | Login user                              | `/api/v1/user/login`      |
| GET    | Get a Lesson                            | `/api/v1/lesson/:lessonId`|
| GET    | Get Lesson                              | `/api/v1/lessons`         |
| POST   | Create a Lesson                         | `/api/v1/create-lesson`    |


## Tests

- Run test for all endpoints
  > run the command below
  ```shell
  $ npm run test
  ```


## Author

   linkedin: linkedin.com/in/