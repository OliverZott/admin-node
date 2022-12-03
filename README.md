# Run

- `npm install`
- start mysql server
- `npm start` ... to start nodemon
- <http://localhost:8000/>
- Seeing Database: `npm run roles:seed`

## In case of errors

- `npm install -g nodemon`
- `npm install -g ts-node`
- `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`ke

---------------------------------------------------------------------------------------------------

# Debug

- NO npm start, just `F5`
    OR
- `ctrl + shift + p` -> Debug: Toggle Auto Attach Always + `npm start`

# Setup

## First steps

- `npm init -y`
- `npm i -D typescript ts-node nodemon` and TS global `npm i -g typescript`
- `tsc --init`

## Configure nodemon

- create `nodemon.json` and add stuff

---------------------------------------------------------------------------------------------------

# SQL stuff

## SQLite

- Delete all rows and ignore Foreign Keys
    > PRAGMA foreign_keys = OFF;
    > DELETE FROM table_name;
    > PRAGMA foreign_keys = ON;

## MySql

- Delete all rows and ignore Foreign Keys
    > SET FOREIGN_KEY_CHECKS = 0;
    > truncate table table_name;
    > SET FOREIGN_KEY_CHECKS = 1;

---------------------------------------------------------------------------------------------------

# Packages

## Express

- REST API framework
- `npm i express cors`
- Install respective **types** `npm i -D @types/express @types/cors`

### Further resources

- [Middleware](https://expressjs.com/en/guide/writing-middleware.html)

## Bcryptjs

- Encryption package
- `npm i bcryptjs`
- `npm i -D @types/bcrypt`

## TypeORM

- <https://typeorm.io/#/>
- **Repository** and ORM package
  - <https://www.tutorialspoint.com/typeorm/typeorm_working_with_repository.htm>

## SQLite Database

- <https://www.sqlitetutorial.net/sqlite-nodejs/connect/>
  - `npm install sqlite3 --save`

## Express-Validation

- validation library

## JWT

- json web token packages
- `npm i jsonwebtoken`
- `npm i -D @types/jsonwebtoken`
- Steps:
  - define _payload_ & create _token_ respectively
  - store token in http-only-cookie
- `npm i cookie-parser` ... to receive cookie from api-response
- `npm i -D @types/cookie-parser`

### environment variables

- `npm i dotenv`
- <https://www.npmjs.com/package/dotenv>
- DONT KEEP .env file in repo !!!
- create respective .env file on each machine: `SECRET_KEY="..."`

## File Upload - Multer

- `npm i multer`
- `npm i -D @types/multer`

# TODO

## Logging

- <https://github.com/winstonjs/winston>
-
