const express = require('express');
require('./config/mongoose');
const app = express();

const port = 3000;


app.listen(port,(error)=>{
    if(error){
        console.log(`Error is running server : ${error}`);
    }
    console.log(`Server is up and running on port: ${port}`);
})