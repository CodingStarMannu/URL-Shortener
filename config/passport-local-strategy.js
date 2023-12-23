const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Function to generate authentication token
function generateAuthToken(user) {
  const token = jwt.sign({ userId: user.id }, 'my_secret-key', { expiresIn: '1h' });
  return token;
}

const local = new LocalStrategy({ usernameField: 'email' }, async function (email, password, done) {
  try {
    const user = await User.findOne({ email });

    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }

    // Generate authentication token
    user.token = generateAuthToken(user);
    console.log('Generated Token:', user.token);

    return done(null, user, { token: user.token }); 
  } catch (error) {
    console.log(`Error in finding user: ${error}`);
    return done(error);
  }
});

passport.use('local', local);

// serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user --> Passport');
    return done(err);
  }
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/user/login');
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
