var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var mongoose= require('mongoose');
var User=mongoose.model('User');

// Configuring local strategy
passport.use(new LocalStrategy(
	{
		usernameField: 'email'
	},
	function(username, password, done){
		User.findOne({email:username}, function(err, user){		//	search for user
			if (err) { return done(err);}
			if(!user){
				return done(null, false, {
					message: 'Incorrect username'
				});
			}
			if (!user.validPassword(password)) { 		//	Check if password matches
				return done(null, false, {
					message: 'Incorrect Password'
				});
			}
			return done(null, user);
		});
	}

	));