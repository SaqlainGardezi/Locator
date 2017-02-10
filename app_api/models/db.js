var mongoose = require( 'mongoose' );
var gracefulShutdown;
var readLine = require ("readline");

mongoose.Promise = require('bluebird');

var dbURI = 'mongodb://localhost/locator';


if (process.env.NODE_ENV === 'production') {
	
	//dbURI = process.env.MONGOLAB_URI;
	dbURI='mongodb://saqlain:12345@ds049631.mlab.com:49631/getting-mean';
} 

//mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

if (process.platform === "win32"){
var rl = readLine.createInterface ({
	input: process.stdin,
	output: process.stdout
});
rl.on ("SIGINT", function (){
	//console.log("signint emitted");
	process.emit ("SIGINT");
});

rl.on ("SIGUSR2", function (){
	//console.log("signusr2 emitted");
	process.emit ("SIGUSR2");
});

rl.on ("SIGTERM", function (){
	//console.log("signterm emitted");
	process.emit ("SIGTERM");
});
}


gracefulShutdown = function (msg, callback) {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};
// For nodemon restarts
process.once('SIGUSR2', function () {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
});
});
// For app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function () {
		process.exit(0);
});
});
// For Heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
});
});

require('./locations');