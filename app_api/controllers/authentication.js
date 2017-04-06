var passport=require('passport');
var mongoose=require('mongoose');
var User=mongoose.model('User');

var sendJSONResponse=function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.register=function(req, res){

	// Validate required fields
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONResponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	// Create a new model instance of user
	var user = new User();

	// Set the name and email address of user
	user.name=req.body.name;
	user.email=req.body.email;

	// Create and add salt and hash
	user.setPassword(req.body.password);

	// save User
	user.save(function(err){
		var token;
		if (err) {
			sendJSONResponse(res, 400, err);
		}else{

			// Return JWT
			token=user.generateJwt();
			console.log("token is::: "+token);
			sendJSONResponse(res, 200, {
				"token": token
			});
		}
	});
};

module.exports.login=function(req, res){

	// Validates required fields
	if (!req.body.email || !req.body.password) {
		sendJSONResponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	// pass name of strategy and callback to authenticate method
	passport.authenticate('local', function(err, user, info){
		var token;

		if (err) {
			sendJSONResponse(res, 404, err);
			return;
		}

		if (user) {
			token=user.generateJwt();
			sendJSONResponse(res, 200,{
				"token": token
			});
		}else{
			sendJSONResponse(res, 401, info);
		}
	})(req, res);
};