var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
require('dotenv').config();

const decodeIDToken = require('./config/firebaseauth');
var indexRouter = require('./routes/index');
var articleRouter = require('./routes/articleRouter');
var benefitRouter = require('./routes/benefitRouter');
var userRouter = require('./routes/userRouter');
var goalRouter = require('./routes/goalRouter');
var goalRouter = require('./routes/goalRouter');
var symptomRouter = require('./routes/symptomRouter');
var userDetailViewRouter = require('./routes/userDetailViewRouter');
var userGoalViewRouter = require('./routes/userGoalViewRouter');
var healthCategoryRouter = require('./routes/healthCategoriesRouter');
var nearParkRouter = require('./routes/nearParkRouter');
var favoriteLocRouter = require('./routes/favoriteLocRouter');
var journalRouter = require('./routes/journalRouter');
var homescreenRouter = require('./routes/homescreenRouter');
// const redisClient = require('./config/redis')

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
// const url = 'mongodb+srv://Ruchi30:RJ2NVRZcSLJpOXVW@cluster0.f8c1f.mongodb.net/natureCounterDb?retryWrites=true&w=majority';
// const url = process.env.AZURE_DB_URL;
const url = process.env.MONGO_DB_URL;

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

connect.then((db) => {
    console.log('Connected to db');
}, (err) => { console.log(err); })

var app = express();

app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }
    else {
        //res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
        return next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(decodeIDToken);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/articles', articleRouter);
app.use('/benefits', benefitRouter);
app.use('/userdetails', userRouter);
app.use('/usergoals', goalRouter);
// app.use('/symptoms', symptomRouter);
app.use('/user_details_views', userDetailViewRouter);
// app.use('/user_goals_views', userGoalViewRouter);
// app.use('/healthCategories', healthCategoryRouter);
app.use('/natureAreas', nearParkRouter);
app.use('/journal', journalRouter);
app.use('/favoriteLoc', favoriteLocRouter);
app.use('/homescreen', homescreenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.json({ message: "Welcome to Nature Counter." });
  
  // render the error page
  res.status(err.status || 500);
  console.log('ERROR: ', err);
  // res.render('error');
});

module.exports = app;
