"use strict";
/*
 * Module dependencies for index.js.
 */
var express = require('express');
var lodash = require('lodash');
var path = require('path');
var router = express.Router();
var config = require('../config');

var accountSid = 'ACc57b0f4199a58e7aeadc94d0e012b572'; // Your Account SID from www.twilio.com/console
var authToken = '97fd58f7c98833768fdc59eabbecaff5';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// set alerts 
router.get('/sendalerts', function(req, res) {

	//console.log("Tested");	
	try {			
			var mobNumber = config.mobileNumber;			
		
			sendalert(mobNumber, function(response){				
				res.json(response);				
			})			   
	
	} catch (err) {
		createErrorResponse(err, res);
	}
});


function sendalert(mobNumber,callback) {	
	
		var response = {};
				
		client.messages.create({
			body: 'Leak Confirmed',
			to: mobNumber, // Text this number
		   from: '+61429532014' // From a valid Twilio number
		},function(err, data) {		
			
			if(err){				
				console.log(err);				
				response.status = "Failed";
				response.message = err.message;	
				response.statusCode = err.status;				
			} else {				
				response.status = "Success";					
				response.From = data.from;
				response.To = data.to;
				response.message = data.body;				
				console.log(data);							
			}		
			 console.log(response);
			 callback(response);			
			 return;
			
		});		
}

// Log and create error messages to handle error events encountered in the code
function createErrorResponse(err, res) {
	
	var errorMessage = err.message == undefined ? err : err.message;
	var response = {
		"status" : "Error",
		"message" : errorMessage
	};
	if (Object.prototype.hasOwnProperty.call(err, "code")) {
		if (err.code == 401) {
			res.status(401);
			response.message = "Unauthorized: Access is denied due to invalid credentials.";
		} else if (err.code == 404) {
			response.message = "Requested data cannot be found.";
		}
	}
	//logger.errorLog(response.message);
	console.log(response.message)
	res.json(response);
}

module.exports = router;
