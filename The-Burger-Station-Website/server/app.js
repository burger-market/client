
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routs/userRoutes');
const itemRouter = require('./routs/itemRouter');
const branchRouter = require('./routs/branchRouter');

const app = express();

// 1) Global Middlewares
// Set Security HTTP headers

app.use(cors());
app.use(helmet());

console.log(process.env.NODE_ENV);

// Development Logging
if (process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
    max: 20000000,
    windowMs: 60*60*1000,
    message: 'too many request from this IP , please try again in an hour!'
});
app.use('/api', limiter);

/// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

// Data sanitization against NoSql 
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent paramater pollution
app.use(hpp({
    whitelist: [
    ]
}));



// Test Middleware 
app.use((req,res,next)=>{
    req.requestTime = new Date().toDateString(); 
    console.log('Request Header: ')
    console.log(req.headers);
    console.log('-----------------------------');
    console.log("")

    next();
});


// 3) Routes

app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/branches', branchRouter);


app.all('*' , (req,res,next)=> {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(GlobalErrorHandler);


// 4) Start Server
module.exports = app;