const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');



const app = express();
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 Minute
    max: 5, // user can do request to a route max 5 times.
    message: 'Too many requests from this IP, please try again later.'
})

//App level Middleware:
//1. Morgan - Use to see request type from backend:
app.use(morgan('dev'));
//2. BodyParser - Use to parse body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//3. xss-clean  - Use to secure routes:
app.use(xssClean());
//4. express-rate-limit - limit request from an IP:
app.use(rateLimiter);


//Users Router:
app.use('/api/users', userRouter);
app.use('/api/seed', seedRouter);


//client error handling:
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});

//server error handling:
app.use((err,req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})


module.exports = app;
