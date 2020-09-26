//require express
var express = require('express');

//create express objects, call express
var app = express();

//tell application to use EJS for templates 
app.set('view engine', 'ejs');

//get homepage /
app.get('/', function(req, res){
    //return something to home page 
    res.send('Hello World');
});

//server setup
app.listen(3000, function(){
    console.log('listening')
});