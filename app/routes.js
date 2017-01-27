// var Clinic = require('./models/clinic');
// //var home = require('./controllers/homeController.js');

// module.exports = function(app) {

// 	// api ---------------------------------------------------------------------
// 	// get all clinics
// 	app.get('/api/clinics', function(req, res) {
// 		console.log('getting results');
// 		// use mongoose to get all clinics in the database
// 		Clinic.find(function(err, clinics) {
// 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
// 			if (err)
// 				res.send(err)
// console.log(clinics);
// 			res.json(clinics); // return all clinics in JSON format
// 		});
// 	});

// 	app.get('/api/clinics/:id', function(req, res) {

// 		// use mongoose to get all clinics in the database
// 		Clinic.findById(req.params.id, function(err, clinics) {
// 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
// 			if (err)
// 				res.send(err)

// 			res.json(clinics); // return all clinics in JSON format
// 		});
// 	});

// 	// create clinics and send back all clinics after creation
// 	app.post('/api/clinics', function(req, res) {
// 		// create a todo, information comes from AJAX request from Angular
// 		console.log(req.body);
// 		Clinic.create({
// 			//text : req.body.text,
// 			//done : false
// 			first_name :   req.body.first_name,
// 			last_name :   req.body.last_name,
// 			email :   req.body.email,
// 			speciality :   req.body.speciality,
// 			qualification :   req.body.qualification,
// 			experience :   req.body.experience,
// 			//working_hours :   req.body.working_hours,
// 			imageUrl :   req.body.imageUrl,
// 			contact :   req.body.contact,
// 			location:  req.body.location

// 		}, function(err, todo) {
// 			if (err)
// 				res.send(err);

// 			// get and return all the clinics after you create another
// 			Clinic.find(function(err, clinics) {
// 				if (err)
// 					res.send(err)
// 				res.json(clinics);
// 			});
// 		});
// 	});

// // update clinics and send back all clinics after creation
// 	app.put('/api/clinics', function(req, res) {
// 		// create a todo, information comes from AJAX request from Angular
// 		Clinic.update({_id : req.body._id},{
// 			//text : req.body.text,
// 			//done : false
// 			first_name :   req.body.first_name,
// 			last_name :   req.body.last_name,
// 			email :   req.body.email,
// 			speciality :   req.body.speciality,
// 			qualification :   req.body.qualification,
// 			experience :   req.body.experience,
// 			//working_hours :   req.body.working_hours,
// 			imageUrl :   req.body.imageUrl,
// 			contact :   req.body.contact,
// 			location:  req.body.location

// 		}, function(err, todo) {
// 			if (err)
// 				res.send(err);

// 			// get and return all the clinics after you create another
// 			Clinic.find(function(err, clinics) {
// 				if (err)
// 					res.send(err)
// 				res.json(clinics);
// 			});
// 		});

// 	});
// 	// delete a clinics
// 	app.delete('/api/clinics/:clinic_id', function(req, res) {
// 		Clinic.remove({
// 			_id : req.params.clinic_id
// 		}, function(err, todo) {
// 			if (err)
// 				res.send(err);

// 			// get and return all the clinics after you create another
// 			Clinic.find(function(err, clinics) {
// 				if (err)
// 					res.send(err)
// 				res.json(clinics);
// 			});
// 		});
// 	});

// 	// application -------------------------------------------------------------
// 	// app.get('*', function(req, res) {
// 	// 	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// 	// });
// };