var mongoose = require('mongoose'),
	crypto = require('crypto');

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
		username: String,
		salt: String,
		hashed_pwd: String
	});

	userSchema.methods = {
		authenticate: function(passwordToMatch){
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}

	var User = mongoose.model('User', userSchema);

	User.find({}).exec (function (err, collection){
		if(collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'Anil');
			User.create({firstName: 'Anil', lastName:'Shrestha', username:'ashrestha', salt: salt, hashed_pwd: hash});
			salt = createSalt();
			hash = hashPwd(salt, 'Joey');
			User.create({firstName: 'Joey', lastName:'Chiu', username:'jchiu', salt: salt, hashed_pwd: hash});
			salt = createSalt();
			hash = hashPwd(salt, 'Erik');
			User.create({firstName: 'Erik', lastName:'Shrestha', username:'eshrestha', salt: salt, hashed_pwd: hash});
		}
	});
}

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}