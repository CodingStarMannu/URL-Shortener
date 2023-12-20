const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGODB_URI;

mongoose.connect(DB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to mongoDB"));

db.once('open', (error)=>{
    if(error){
        console.log(`Error in connecting Database: ${error}`);
    }
    console.log('Connected to Database :: MongoDB');
});

module.exports = mongoose;