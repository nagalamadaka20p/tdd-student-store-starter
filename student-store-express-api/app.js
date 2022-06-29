// YOUR CODE HERE
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const store = require('./routes/store');
const {NotFoundError} = require('./utils/error');

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.use('/store', store);

app.get('/', (req, res) => {
    console.log("this works")
    res.status(200).send({"ping": "pong"})
});

//404 error handler
app.use((req, res, next) => {
    const error = new NotFoundError('Not Found');
    error.status = 404;
    next(error);
})

//generic error handler
app.use((err, req, res, next) => {
    const {status, message} = err;
    res.status(status).send({error: {
        message: message || "Something went wrong in the application",
        status: status || 500
    }})
})

module.exports = app;