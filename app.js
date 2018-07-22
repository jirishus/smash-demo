var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/questions', questions);

// would make route for this
app.post('/matches', function(req, res) {
  var userInput = req.body;
  var currentServices = ['valet', 'massage', 'delievery', 'consulting'];
  var queryResult = '';

  console.log('update');

  // this could go in a function called - findMatch
  for (var i=0;i<currentServices.length;i++) {
    let searchQuery = (userInput.searchText.toLowerCase() === currentServices[i]);
    if (searchQuery) {
      console.log('match found');
      queryResult = currentServices[i];
    } else {
      // reset form and prompt user to try again
    }
  }
  console.log('query result', queryResult);
  res.send(queryResult);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
