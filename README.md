## Introduction

This is a simple node API project for a inventory control system. A front-end project was built with React, you can check it out [here](https://github.com/mauroviniciussilva/react-inventory-control).

## Requirements

To compile the solution, you must have [Node.js](https://nodejs.org/en/) installed (along with NPM).

## Dependencies

I used some dependencies to speed up the development and to assist in some specific scenarios. Below is a list of the dependencies used and what they are for:

- [`@hapi/joi`](https://hapi.dev/module/joi/): this module assists in data validation, in this case I am using it to validate the data received in the requests;
- [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js#readme): this module assists in hash passwords, in this case I'm using to save the password in the database as a hash, not a literal string;
- [`dotenv`](https://github.com/motdotla/dotenv#readme): this module allows the creation of an .env file that can be read and used to save environment settings. In this case, I'm using it to configure the database;
- [`express`](https://github.com/expressjs/express#readme): this module provide small, robust tooling for HTTP servers. This is what makes the API works in this project;
- [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken#readme): this module is an implementation of JSON Web Tokens, that I'm using for generate and verify web signatures in requests.
- [`mysql2`](https://github.com/sidorares/node-mysql2#readme): a fast mysql driver, for using along with sequelize;
- [`nodemon`](https://nodemon.io/): this module "helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected";
- [`sequelize`](https://sequelize.org/): is an ORM (Object-Relational Mapper) for Node.js, which supports MySQL, among other databases. I am using it to map relational data to Javascript objects.

## Database

In this project I am using MySQL. Therefore, to run the project in your local environment, it is necessary to have installed some version of MySQL, which you can find on the page: [MySQL Community Downloads](https://dev.mysql.com/downloads/). You'll have to run the following command to create the database in your local server:

```sql
create database <database_name>
```

*Note: the name I'm using is **simple**, but you can create the database with any name you want, just remember to change it in the **.env** file*

As I am using sequelize, it will not be necessary to create the model tables with T-SQL, they are created automatically (if they do not exist) when you run the project.

To run the migrations, you'll have to run the following command:
```
npx sequelize-cli db:migrate 
```
*Note: if your database doesn't exist yet, you can just call `db:create` command. With proper access it will create that database for you.*

## Setup

To configure the environment I'm using [dotenv](https://github.com/motdotla/dotenv#readme) module. So, to set up the environment create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. For this project I'm using the following variables:
```dosini
DB_USER=<database_user>
DB_PASS=<database_password>
DB_NAME=<database_name>
DB_HOST=<database_host>

JWT_TOKEN_PRIVATE_KEY=<token_private_key>
JWT_REFRESH_TOKEN_PRIVATE_KEY=<refresh_token_private_key>
```

*Note: the `token_private_key` and `refresh_token_private_key` are secret keys to be used by JWT. Those secret keys are private to you. You can learn more about JWT in [jwt.io/introduction](https://jwt.io/introduction/)*

## How to run the application

1. Clone the repository and install the dependencies with `npm install` command;
2. **Setup** and create database;
3. Run the application with `npm start` command;
4. If necessary, run the migrations with `npx sequelize-cli db:migrate` command.
