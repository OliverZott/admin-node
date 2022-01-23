# Run

-   `npm install`
-   start mysql server
-   `npm start` ... to start nodemon
-   http://localhost:8000/

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

-   **Repository** and ORM package
    -   https://www.tutorialspoint.com/typeorm/typeorm_working_with_repository.htm

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

## Logging

-   https://github.com/winstonjs/winston
-
