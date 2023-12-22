require('dotenv').config();
const express = require('express');
require('./config/mongoose');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const app = express();

const port = 3000;



// // Setting up the view engine
// app.set('view engine','ejs');
// app.set('views','./views');

// app.use(expressLayout);


app.use(session({
    secret:'my_secret-key', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 } 
  }));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./assets'));
app.use(express.json());
// express router
app.use('/', require('./routes'));  



app.listen(port,(error)=>{
    if(error){
        console.log(`Error is running server : ${error}`);
    }
    console.log(`Server is up and running on port: ${port}`);
})