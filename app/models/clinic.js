var mongoose = require('mongoose');

module.exports = mongoose.model('clinics', {
	first_name :   String,
	last_name :   String,
	email :   String,
	speciality :   String,
	qualification :   String,
	experience :   Number,
	//working_hours :   String,
	fees :   Number,
	//address :   String,
	//feedbacks :   String,
	imageUrl :   String,
	contact :   String, 
	location: [{
    	street: String,
		city: String,
		state: String,
		country: String
      }]      
});