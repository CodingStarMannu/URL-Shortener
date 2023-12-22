
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('../config/passport-local-strategy');

// Controller for user signup
module.exports.signup = async function (req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log('Received data:', { name, email, password, confirmPassword });
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Creating a new user
    const newUser = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Error in user signup: ${error}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for user login
module.exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.error(`Error in user login: ${err}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.error(`Error in user login: ${err}`);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
};


