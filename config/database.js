const mongoose = require('mongoose');
const { MONGO_URL } = process.env;
exports.connect = () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        console.log("Connected to MongoDB")
    ).catch((err) => {
        console.log(err.message)
        process.exit(1)
    })
}