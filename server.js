// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var passport	= require('passport');
var port  	 = process.env.PORT || 8080; 				// set the port
var path = require('path');

var database = require('./config/database'); 			// load the database config
var home = require('./app/controllers/home/homeController');              //added
var locations = require('./app/controllers/locations/citiesController');
var category = require('./app/controllers/categories/categoriesController');
var results = require('./app/controllers/dashboard/resultsController');
var clinicProfileData = require('./app/controllers/dashboard/clinicProfileDataController');
var clinicServiceData = require('./app/controllers/dashboard/clinicServicesController');
var clinicGallaryData = require('./app/controllers/dashboard/clinicGallaryController');
var clinicfeedbackData = require('./app/controllers/dashboard/clinicFeedbackController');
var cliniccontactData = require('./app/controllers/dashboard/clinicContactController');

var accountController = require('./app/controllers/account/accountController');

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var multer = require('multer');

// Use the passport package in our application
app.use(passport.initialize());
 

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());




// routes ======================================================================
//require('./app/routes.js')(app);

//api
app.use('/api/home', home);
app.use('/api/locations', locations);
app.use('/api/category', category);
app.use('/api/dashbord', results);
app.use('/api/profile', clinicProfileData);
app.use('/api/service', clinicServiceData);
app.use('/api/gallary', clinicGallaryData);
app.use('/api/feedback', clinicfeedbackData);
app.use('/api/contact', cliniccontactData);

app.use('/api/account', accountController);

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            console.log(req.url);
            var imageSavePath = '';
            if(req.url == '/uploadProfileImage'){
                imageSavePath = './public/uploads/clientProfilePictures'
            }
            else{
                imageSavePath = './public/uploads/clientRelatedImages'
            }
            cb(null, imageSavePath)
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
			console.log(file.clientId);
			console.log(datetimestamp);
			console.log(file.originalname);
			console.log(file.originalname.split('.')[file.originalname.split('.').length -1]);
            //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            cb(null, file.originalname )
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    app.post('/uploadProfileImage', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null, success : true });
        })
    });
    app.post('/uploadClientImage', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null, success : true });
        })
    });


	//application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

// listen (start app with node server.js) ======================================
app.listen(port, '142.4.14.149');
console.log("App listening on port " + port);

