const fs = require('fs');

const dotenv = require('dotenv');
const dotenvResult = dotenv.config();
console.log('dotenv config result:', dotenvResult);
console.log('MONGO_URI from .env:', process.env.MONGO_URI); // Debug log

require('dotenv').config({ path: './.env' });
 // Load environment variables from .env file

console.log('Reading .env file directly for debugging:');
const envContent = fs.readFileSync('.env', 'utf8');
console.log(envContent);

console.log('MONGO_URI from .env:', process.env.MONGO_URI); // Debug log


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import database connection function
const connectDB = require('./config/db');

// Connect to the MongoDB database
connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workoutRoutes = require('./routes/workouts'); // Added after organizing imports

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workouts', workoutRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
