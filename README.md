# E-commerce API Project

## Max's Sporting Goods Store
This mock API was designed for the Codecademy project, E-commerce API. I decided to base the store API on a sporting goods store as sports is a passion of mine. Although it was a challenging project, I loved researching on my own to solve issues and finding new ways to create an API. Finally, it was fulfilling to create the documentation following OpenAPI 3.0 specs and see the project deployed successfully with Heroku. As always I would love to hear your feedback and how to improve my code.

#### Heroku deployment
https://max-ecommerce-api.herokuapp.com/

## Features
- The store database has 38 different items, all with price points and sorted into 10 different categories.
- Users can register an account and login with a Passport.js session to access their info, carts, and orders.
- Create carts under your user id and add or remove products.
- Checkout carts to create and place an order.
- Triggers in the database set timestamps when table entries are modified and adds up the total price for an order using the price and quantity of the products in the order.
- Coming soon: mock payment verification and shipping information.

## Setup
Clone or download the project from Github and run npm install to get dependencies. This project uses Postgresql so you need to have that set up and running on your computer. To set up the database enter the sql files in this order: tables.sql, triggers.sql, and products.sql. Next set up a .env file in the root directory with the following information. Be sure to include your own postgres server informaion in the database section. The PORT can be any port you choose and the SESSION_SECRET can be any string.
- PORT=5000
- DB_USER=postgres
- DB_HOST=localhost
- DB_DATABASE=database
- DB_PASSWORD=secretpassword
- DB_PORT=5432
- SESSION_SECRET=TOPSECRET
The project is now ready to deploy! run npm start and it will load up the Swagger UI documentation so you can see the routes and how to properly use them.

## Technologies
This project is built using two main languages. The database is set up on Postgresql, while the code is written in Javascript and uses Node.js and Express framework. The login system is built using Passport.js and keeps a user logged in through express-sessions. The Node.js dependencies include:
- body-parser
- cors
- dotenv
- swagger-ui-express
- pg and pg-format
- bcryptjs
- express-validation
- express-session
- passport
- passport-local
- express-flash
- nodemon