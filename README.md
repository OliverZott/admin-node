# Run

-   `npm install`
-   start mysql server
-   `npm start` ... to start nodemon
-   http://localhost:8000/

### In case of errors:
- `npm install -g nodemon`
- `npm install -g ts-node`
- `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`ke

# Debug

-   npm start first
-   then debug console

# Setup

### First steps

-   `npm init -y`
-   `npm i -D typescript ts-node nodemon` and TS global `npm i -g typescript`
-   `tsc --init`

### Configure nodemon

-   create `nodemon.json` and add stuff

---

# Packages

## Express

-   REST API framework
-   `npm i express cors`
-   Install respective **types** `npm i -D @types/express @types/cors`

## Bcryptjs

-   Encryption package
-   `npm i bcryptjs`
-   `npm i -D @types/bcrypt`

## TypeORM
- https://typeorm.io/#/

-   **Repository** and ORM package
    -   https://www.tutorialspoint.com/typeorm/typeorm_working_with_repository.htm


## SQLite Database
- https://www.sqlitetutorial.net/sqlite-nodejs/connect/
- - `npm install sqlite3 --save`


## Express-Validation
-   validation library

## JWT

-   json web token packate
-   `npm i jsonwebtoken`
-   `npm i -D @types/jsonwebtoken`
-   Steps:
    -   define _payload_ & create _token_ respectively
    -   store token in http-only-cookie
-   `npm i cookie-parser` ... to receive cookie from api-response
-   `npm i -D @types/cookie-parser`
-

#### environment variables

-   `npm i dotenv`
-   https://www.npmjs.com/package/dotenv

## Logging

-   https://github.com/winstonjs/winston
-
