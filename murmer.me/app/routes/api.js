/* create a new user */
var User = require('../models/user');

var jsonwebToken = require('jsonwebtoken');

var config = require('../../config');
var secretKey = config.secretKey;

/* return a token that will be used for when user login */
function createToken(user) {
	var token = jsonwebToken.sign({
		_id: user._id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiretesInMinute: 1440
	})

	return token;
}

module.exports = function (app, express) {
	
	var api = express.Router();

	/* create a new user and save it in the database */
	api.post('/signup', function (request, response) {
		var user = new User({
			name: request.body.name,
			username: request.body.username,
			password: request.body.password
		});

		user.save(function (error) {
			if (error) {
				response.send(error);
				return;
			}
			response.json({ message: 'New user has been created'});
		});
	});

	/* return all the users in the database */
	api.get('/users', function (request, response) {
		User.find({}, function (error, users) {
			if (error) {
				response.send(error);
				return;
			}
			response.json(users);
		});
	});

	/* login to the system, will return a token if successful */
	api.post('/login', function (request, response) {
		User.findOne({
			username: request.body.username
		}).select('password').exec(function (error, user) {
			if (error) throw error;

			if (!user) {
				response.send({ message: "User doesn't exist"});
			} else if (user) {
				var validPassword = user.comparePassword(request.body.password);
				if (!validPassword) {
					response.send({ message: "Invalid Password"});
				} else {
					var token = createToken(user);
					response.json({
						sucess: true,
						message: "Successfully login!",
						token: token
					});
				}
			}
		});
	});

	return api;
}

