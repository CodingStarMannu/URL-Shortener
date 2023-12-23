require('dotenv').config();
const express = require('express');
require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
require('./config/passport-local-strategy');
const app = express();
const cors = require('cors');
const path = require("path");


const port = process.env.PORT;


app.use(session({
    secret:[process.env.SECRET_KEY], 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 } 
  }));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(express.static(path.join(__dirname, "build")));

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// express router
app.use('/', require('./routes'));  



app.listen(port,(error)=>{
    if(error){
        console.log(`Error is running server : ${error}`);
    }
    console.log(`Server is up and running on port: ${port}`);
})