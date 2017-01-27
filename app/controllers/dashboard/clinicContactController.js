var express = require('express');
var app = express.Router();
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Provider = restful.model('ClinicContact', new mongoose.Schema({   
    clinicmobile: String,
    address1 : String,
    address2 : String,
    ClinicId : String,
    lat : String,
    long : String

}));

Provider.methods(['get', 'post', 'put', 'delete'], function(req, res, next) {
    console.log('logging from nore-restful');
    next(); // Don't forget to call next!
});


Provider.after('get', 'post', 'put', 'delete', function(req, res, next) {
    console.log('logging from nore-restful');
    next(); // Don't forget to call next!
});

Provider.before('get', 'post', 'put', 'delete', function(req, res, next) {
    console.log(req);
    next(); // Don't forget to call next!
});

Provider.register(app, '/cliniccontact');


module.exports = app;

