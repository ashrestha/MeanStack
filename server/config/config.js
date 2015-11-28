var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports ={
	development: {
		db: 'mongodb://localhost/meanApp',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},

	production: {
		rootPath: rootPath,
		db: 'mongodb://ashrestha:meanapp@ds059634.mongolab.com:59634/meanapp',
		port: process.env.PORT || 80
	}
}