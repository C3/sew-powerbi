"use strict";
/*
 * Module dependencies for index.js.
 */
var express = require('express');
var lodash = require('lodash');
var path = require('path');
var router = express.Router();

var accountSid = 'ACc57b0f4199a58e7aeadc94d0e012b572'; // Your Account SID from www.twilio.com/console
var authToken = '97fd58f7c98833768fdc59eabbecaff5';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// set alerts 
router.get('/sendalerts', function(req, res) {

	//logger.infoLog("Get Races API");
	console.log("Tested");
	//console.log(client);
	
	try {		
		client.messages.create({
			body: 'Alert from SEW',
			to: '+919895282129', // Text this number
			//to: '+919037575291',
			from: '+15106069752' // From a valid Twilio number
		},function(err, data) {
			
			var response = {};
			if(err){				
				//console.log(err);				
				response.status = "Failure";
				//response.message = err;		
				
			} else {				
				response.status = "Success";
				response.message = data.body;	
				response.from = data.from;
				//console.log(data);							
			}
				
			res.json(response);
			//console.log(data);
		});
			
		
		console.log("after");
	
	} catch (err) {

		createErrorResponse(err, res);
	}

});

// Get Race Info
router.get('/race/:race_id', function(req, res) {

	//logger.infoLog("Get Race Info API");

	try {
		
	} catch (err) {
		createErrorResponse(err, res);
	}
});


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
	logger.errorLog(response.message);
	res.json(response);
}

module.exports = router;
