"use strict"; 
var compression = require('compression');
var express = require('express');

process.on('uncaughtException', function (err) {
	var error = {};
	error.header = "Uncaught Exception";
	error.body = err;
	logger.errorLog(error);
});
 
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();
		
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.disable('x-powered-by');
app.disable('etag');

app.use('/', routes);

module.exports = app;