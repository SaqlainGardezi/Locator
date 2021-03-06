require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport=require('passport');       // Require passport before model definition

require('./app_api/models/db');
require('./app_api/config/passport');   //  Require strategy after model definition
// var uglifyJs=require('uglify-js');
// var fs= require('fs');


//console.log(process.env.NODE_ENV);
var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
//var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');

	
/* This code have some errors */
			/* Uglify and Minify */

// 1 List all of the files we want to combine in an array
// var appClientFiles=[
// 	'app_client/app.js',
// 	'app_client/home/home.controller.js',
// 	'app_client/common/services/geolocation.service.js',
// 	'app_client/common/services/locatorData.service.js',
// 	'app_client/common/filters/formatDistance.filter.js',
//  'app_client/about/about.controller.js',
// ''app_client//common/directives/navigation/navigation.template.html
//  'app_client/common/directives/footerGeneric/footerGeneric.directive.js'
// 	'app_client/common/directives/ratingStars/ratingStars.directive.js'
// ];

// // 2 Call UglifyJS to combine and minify the file in memory.
// var uglified=uglifyJs.minify(appClientFiles,{compress:false});

// // 3 Save the uglified code into the public folder.
// fs.writeFile('public/angular/locator.min.js', uglified.code, function (err){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log('Script generated and saved: locator.min.js');
// }
// });




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,   'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());
//app.use('/', routes);
app.use('/api', routesApi);
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

//app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// catch unauthorised errors
app.use(function(err, req, res, next){
  if (err.name==='UnauthorizedError') {
    res.status(401);
    res.json({"message": err.name + " : " + err.message});
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
