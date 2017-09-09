// set up ======================================================================
var connect_s4a = require('connect-s4a');
var compression = require('compression');
var express = require('express');
var app = express();
var core = require('core-js/library');
var msg91=require('msg91-sms');
var token = "18a9d76bd14a9b98fc80582c0a86db5b";
var slug = require('mongoose-slug-generator'); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
mongoose.plugin(slug);
var passport = require('passport');
var port = process.env.PORT || 80; // set the port
var path = require('path');
var SitemapGenerator = require('sitemap-generator');
var sgTransport = require('nodemailer-sendgrid-transport');
var XMLWriter = require('xml-writer');
var nodemailer = require("nodemailer");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var ClassList = require('classlist');
var database = require('./config/database'); // load the database config
var home = require('./app/controllers/home/homeController'); //added
var locations = require('./app/controllers/locations/citiesController');
var category = require('./app/controllers/categories/categoriesController');
var results = require('./app/controllers/dashboard/resultsController');
var clinicProfileData = require('./app/controllers/dashboard/clinicProfileDataController');
var clinicServiceData = require('./app/controllers/dashboard/clinicServicesController');
var clinicGallaryData = require('./app/controllers/dashboard/clinicGallaryController');
var clinicfeedbackData = require('./app/controllers/dashboard/clinicFeedbackController');
var cliniccontactData = require('./app/controllers/dashboard/clinicContactController');
var enquiryData = require('./app/controllers/dashboard/equiryController'); 
var popupForm = require('./app/controllers/dashboard/popupForm');

nodemailer.createTransport('smtp://nxsearch.com:pass@smtp.mail.nxsearch.com');
var smtpConfig = {
    host: '115.124.121.211',
    port: 25,
    secure: false, // use SSL
    auth: {
        user: 'info@agogstudios.com',
        pass: 'Pune123##'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);
//var smtpTransport = nodemailer.createTransport(nodemailer,{
//service: "mail.nxsearch.com",
// auth: {
//     user: "enquiry@nxsearch.com",
//     pass: "pune123##"
//  }
//});

var accountController = require('./app/controllers/account/accountController');

var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var multer = require('multer');
app.use(compression());
app.use(passport.initialize());



// configuration ===============================================================
app.use(connect_s4a(token));
mongoose.connect(database.url); // connect to mongoDB database on modulus.io


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' },{limit: '50mb'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'})); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//app.use(seo());



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
app.use('/api/enquiry', enquiryData);
app.use('/api/formenquiry', popupForm);
//app.use('/api/sitemap', sitemap);



app.use('/api/account', accountController);

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        console.log(req.url);
        var imageSavePath = '';
        if (req.url == '/uploadProfileImage') {
            imageSavePath = './public/uploads/clientProfilePictures'
        } else {
            imageSavePath = './public/uploads/clientRelatedImages'
        }
        cb(null, imageSavePath)
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        console.log(file.clientId);
        console.log(datetimestamp);
        console.log(file.originalname);
        console.log(file.originalname.split('.')[file.originalname.split('.').length - 1]);
        //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        cb(null, file.originalname)
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');
/** API path that will upload the files */
app.post('/uploadProfileImage', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, success: true });
    })
});
app.post('/uploadClientImage', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null, success: true });
    })
});

app.post('/sendmail', function(req, res) {
    var options = {
        host: '115.124.121.211',
        port: 587,
        secure: false,
        auth: {
            // api_key: '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'
            user: 'info@agogstudios.com',
            pass: 'Pune123##'
        }
    }
    var mailer = nodemailer.createTransport(options);

    mailer.sendMail(req.body, function(error, info) {
        if (error) {
            res.status('401').json({ err: info });
        } else {
            res.status('200').json({ success: true });
           console.log(info);


        }
        mailer.close();
    });
});

           
 app.post('/sendMsg', function(req,res){
    console.log(res);
          var authkey='138679A23pr5hn5889ca25';
//for multiple numbers 
//var numbers=[];
//numbers.push(req.body.clientMobile);
 
//for single number 
var number=req.body.clientMobile;
 
//message 
var message= "Enquiry on nxsearch.com for: "+req.body.ClinicName +" Name: "+req.body.username + " Enquirer Contact No. : " +req.body.usermobile + " Area: "+ req.body.Area + " Thank You...!";
 
//Sender ID 
var senderid='NXSRCH';
 
//Route 
var route='4';
 
//Country dial code 
var dialcode='91';
 
 
//send to single number 
 
msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){
 
//Returns Message ID, If Sent Successfully or the appropriate Error Message 
console.log(response);
});
    
 });

// SMS to user
 app.post('/sendMsgtoUser', function(req,res){
    console.log(res);
          var authkey='138679A23pr5hn5889ca25';
//for multiple numbers 
//var numbers=[];
//numbers.push(req.body.clientMobile);
 
//for single number 
var number=req.body.usermobile;
 
//message 
var message= "You Enquire for " + req.body.ClinicName + ", Contact No. : " + req.body.clientMobile + "Thank you for using www.nxsearch.com. keep NX-searching...!";
 
//Sender ID 
var senderid='NXSRCH';
 
//Route 
var route='4';
 
//Country dial code 
var dialcode='91';
 
 
//send to single number 
 
msg91.sendOne(authkey,number,message,senderid,route,dialcode,function(response){
 
//Returns Message ID, If Sent Successfully or the appropriate Error Message 
console.log(response);
});
    
 });


app.post('/sendmail12', function(req, res) {
    var options = {
        host: '115.124.121.211',
        port: 587,
        secure: false,
        auth: {
            // api_key: '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'
            user: 'info@agogstudios.com',
            pass: 'Pune123##'
        }
    }
    var mailer = nodemailer.createTransport(options);

    mailer.sendMail(req.body, function(error, info) {
        if (error) {
            res.status('401').json({ err: info });
        } else {
            res.status('200').json({ success: true });
        }
        mailer.close();
    });
});

//app.get('/',function(req,res){
//   res.sendfile('index.html');
//});


app.get('/registerfree', function(req, res) {
    var mailOptions = {
        from: 'Registration Request<enquiry@nxsearch.com> ', // sender address
        to: "agogweb1@gmail.com,bizzbazar1@gmail.com", // list of receivers
        subject: "NX-search Registration Request for " + req.query.bname, // Subject line
        //text: req.query.text+req.query.subject+req.query.to+req.query.from+req.query.date+req.query.time, // plaintext body
        html: "Registratio Request from :" + "<b>" + req.query.bname + " </b>" + "<br>" + "Owner Name : " + "<b>" + req.query.oname + " </b>" + "<br>" + "Mobile No :" + "<b>" + req.query.text + "</b>" + "<br>" // html body
            +
            "Email Id :" + "<b>" + req.query.from + "</b>" + "<br>" + "Address :" + "<b>" + req.query.address + "</b>" + "<br>" + "Business type :" + "<b>" + req.query.business + "</b>" + "<br>" +
            "Qualification :" + "<b>" + req.query.quali + "</b>" + "<br>" + "speciality :" + "<b>" + req.query.speciality + "</b>" + "<br>" + "experience :" + "<b>" + req.query.experience + "</b>" + "<br>" + "message :" + "<b>" + req.query.message + "</b>" + "<br>"
            // to : req.query.to,
            // subject : req.query.subject,
            // text : req.query.text
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
        transporter.close();
    });
});

app.get('/apply', function(req, res) {
    var mailOptions = {
        from: 'enquiry@nxsearch.com', // sender address
        to: "agogweb1@gmail.com,bizzbazar1@gmail.com", // list of receivers
        subject: "Application from " + req.query.name, // Subject line
        //text: req.query.text+req.query.subject+req.query.to+req.query.from+req.query.date+req.query.time, // plaintext body
        html: "Name :" + "<b>" + req.query.name + " </b>" + "<br>" + "Mobile No :" + "<b>" + req.query.text + "</b>" + "<br>" // html body
            +
            "Email Id :" + "<b>" + req.query.from + "</b>" + "<br>" + "Message :" + "<b>" + req.query.message + "</b>" + "<br>" + "Attache file :" + "<b>" + req.query.file + "</b>" + "<br>"
            // to : req.query.to,
            // subject : req.query.subject,
            // text : req.query.text
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
        transporter.close();
    });
});


//application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
