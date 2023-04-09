const app = require('./app');
const port = process.env.MAIN_PORT || 4000;


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})