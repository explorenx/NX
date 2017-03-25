var express = require('express');
var app = express.Router();
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Provider = restful.model('ClinicAndDoctors', new mongoose.Schema({    
    ClinicName :   String,
    DoctorName : String,
    Profession: String,
    speciality: String,
    Experience :   String,
    MainCategory :   String,
    Categories :   String,
    SubCategories :   [],
    registerDate: String,
    City :   String,
    Area :   String,
    SubArea :   [],
    FirstHalfTime :   String,
    SecondHalfTime :   String,
    ContactNumber1 :   String,
    ContactNumber2 :   String,
    ContactNumber3 :   String,
    RegistrationNo : String,
    Order : Number,
    Tags: String,
    isPaidClient : Boolean,
    isSponsoredClient : Boolean,
    address1: String,
    address2 : String,
    userId : String,
    ClinicId : String,
    imageUrl : String,
    extensionNo : String,
    
    Socical : {
        facebook : String,
        twitter : String,
        google : String,
        Youtube : String,
        instagram : String
    }
     
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

Provider.register(app, '/results');


module.exports = app;