var express = require('express');
var app = express.Router();
var restful = require('node-restful');
var mongoose = restful.mongoose;

var Provider = restful.model('profiledata', new mongoose.Schema({
    Profile :
                {
                   
                    address1: String,
                    address2: String

                },
    Home :
        {
           
            Image : String,
            DocName : String,
            Description: String,
            OtherInfo1: String,
            OtherInfo2: String
        },
    Services :
        {
            
            ServiceName: String,
            ServiceimageUrl: String,
            ServiceInfo: String
        },
    Gallery :
        {
            
            GallaryImages : String,
                   
        },
    Contact :
        {
          
            address: String,
            email: String,
            contact: String,
            lat: String,
            long : String
        },

    DoctorSocialMedia :
          {
          
           Facebook: String,
            Twitter: String,
            Google: String,
            Youtube: String
           
          }


}));

Provider.methods(['get', 'post', 'put', 'delete'], function (req, res, next) {
    console.log('logging from nore-restful');
    next(); // Don't forget to call next!
});
Provider.register(app, '/clinics');

Provider.after('get', 'post', 'put', 'delete', function (req, res, next) {
    console.log('logging from nore-restful');
    next(); // Don't forget to call next!
});

Provider.before('get', 'post', 'put', 'delete', function (req, res, next) {
    console.log(req);
    next(); // Don't forget to call next!
});



module.exports = app;