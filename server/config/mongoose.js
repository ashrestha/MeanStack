var mongoose = require('mongoose');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection errror...'));
	db.once('open', function callback(){
	console.log('meanApp db opened');
});


	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String
	});

	var User = mongoose.model('User', userSchema);

	User.find({}).exec (function (err, collection){
		if(collection.length === 0) {
			User.create({firstName: 'Anil', lastName:'Shrestha', username:'ashrestha'});
			User.create({firstName: 'Joey', lastName:'Chiu', username:'jchiu'});
			User.create({firstName: 'Erik', lastName:'Shrestha', username:'eshrestha'});
		}
	});
}