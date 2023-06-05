const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const helmet = require("helmet");
const cors = require("cors");
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const admin = require("firebase-admin");
const multer = require('multer');

app.use(
  cors({
    origin:"*",
    allowedHeaders:["auth-token", "Access-Control-Allow-Origin"],
  })
  );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
  secret:"lalala",
  resave:false,
  saveUninitialized:true,
  cookie:{ maxAge:600000},
})
);
app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth", authRouter);


app.use(function(req, res, next) {
  return res.status (404).json({message:"route not found"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {

  return  res.status(err.status || 500).json({message: "something went wrong", error:err.message});
});

module.exports = app;
