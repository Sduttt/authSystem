AuthSystem Backend Application
================================

This is a backend application for an authentication system, built using Node.js and Express.js. The application uses MongoDB as its database and supports user registration, login, and token-based authentication.

Installation
------------

1.  Clone the repository using the following command:
    
    bash
    
    ```bash
    git clone https://github.com/Sduttt/authSystem.git
    ```
    
2.  Navigate to the project directory:
    
    bash
    
    ```bash
    cd authSystem
    ```
    
3.  Install the dependencies:
    
    ```
    npm install
    ```
    
4.  Create a `.env` file in the root directory of the project and add the following variables:
    
   
    
    ```makefile
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```
    
    Replace `<your_mongodb_uri>` with your MongoDB URI and `<your_jwt_secret>` with your preferred JSON Web Token (JWT) secret.
    

Usage
-----

To start the server, run the following command:


```
npm start
```

By default, the server will start on port 3000. You can access the server at `http://localhost:3000`.

To run the server in development mode, use the following command:

arduino

```
npm run dev
```

This will start the server using nodemon, which will automatically restart the server whenever you make changes to the code.

API Documentation
-----------------

The following API endpoints are available:

*   `POST /register`: Register a new user 

Required data to register: 
```json
{
    "firstname": <string>,
    "lastname": <string>,
    "email": <unique string>,
    "password": <string>
}
```
Provide the above data in json format in the body at the time of api call and replace the `<datatypes>` with actual strings.

*   `POST /login`: Login an existing user
```json
{
    "email": <unique string>,
    "password": <string>
}
```
Provide same `email` and `password` as provided in the time of `register` in the body at the time of api call.
Required data to register: 
*   `GET /dashboard`: Get the current user (requires authentication)


Dependencies
------------

This application uses the following dependencies:

*   bcryptjs: Used for hashing passwords
*   dotenv: Used for loading environment variables from a .env file
*   express: Used for building the web server
*   jsonwebtoken: Used for generating and verifying JSON Web Tokens (JWTs)
*   mongoose: Used for connecting to MongoDB