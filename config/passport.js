var passport = require('passport');
var localStrategy = require('passport-local');
var bcrypt = require('bcrypt-nodejs');

passport.use(new localStrategy(function (username, password, done) {
  Users.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {message: 'Credentials not recognized!'});
    }

    // compare  if user and pass are equal
    bcrypt.compare(password, user.password, function (err, res) {
      if (!res) {
        return done(null, false, {message: 'Credentials not recognized!'});
      }
      return done(null, user, 'Signin success');
    });
  });
}));
