require('dotenv').config();
require("./config/database").connect();
const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./model/user');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

//register a user
app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body; //grabbing user details

        //validate user input
        if (!(firstname && lastname && email && password)) {
            res.status(400).send("All input is required");
        }
        //check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists. Please Login");
        }

        //Encrypt user password
        const encryptPassword = await bcrypt.hash(password, 10);

        //create user in our database
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: encryptPassword
        })

        //create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        )

        user.token = token;
        user.password = undefined;

        res.status(201).json(user);

    } catch (error) {
        console.log(error)
        res.status(401).send(`Sorry, something went wrong. ${error}`)
    }

})

//login a user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body; //grabbing user details
        
        //validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        //check if user exist
        const user = await User.findOne({ email });

        //compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (user && isPasswordValid) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            )
            
            user.token = token;
            user.password = undefined;

            res.status(200).json(user);

        }
        else {
            res.status(400).send("Invalid Credentials");
        }


    } catch (error) {
        console.log(error)
        res.status(401).send(`Sorry, something went wrong. ${error}`)
    }
})


//Dashboard

app.get("/dashboard", auth, (req, res) => {
    res.status(200).send("Welcome to Dashboard");
});

module.exports = app;