const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');


    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        req.user = decoded;

    } catch (error) {
        console.log(error)
        res.status(401).send(`Sorry, something went wrong. ${error}`)
    }
    return next();
}

module.exports = auth;