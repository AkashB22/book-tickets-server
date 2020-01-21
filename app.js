var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
let mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book-ticket');
let connection = mongoose.connection;
connection.on('error', (err)=>{
  console.error(err);
});
connection.on('open', ()=>{
  console.log('mongodb is connected');
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let theatresRouter = require('./routes/theatresRoute');
let moviesRouter = require('./routes/moviesRoute');
let orderTicketRouter = require('./routes/orderTicketRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.static(__dirname + "/dist/book-ticket-client"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:4200'],
    credentials : true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', theatresRouter);
app.use('/api', moviesRouter);
app.use('/api', orderTicketRouter);
app.get('*', function(req, res){
  res.sendFile(__dirname + "/dist/book-ticket-client/index.html");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


