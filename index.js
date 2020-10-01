//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require mongoose
var mongoose = require("mongoose");
//create express object, call express
var app = express();
//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));


//connection information for Mongo
const Todo = require('./models/todo.model');
const mongoDB =  'mongodb+srv://testConnection:b8RwqJYgo4hD1xhe@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Couple of items todo
var tasks = [];

//completed items
var completed = [];

//get home page /
app.get('/', function(req, res){
    //query to mongoDB
    Todo.find(function(err, todo){
        if(err){
           console.log(err); 
        }else{
            console.log(todo);
            for(i=0, i<todo.length;i++){
                if(todo[i].done){
                    completed.push(todo[i].item);
                }else{

                }
            }
        }
    });
    //return something to home page
    res.render('index', {tasks: tasks, completed: complete}); //add completed variable to ejs ex {a:a, b:b}
});

//add post method /addtask
app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    tasks.push(newTask);
    //return index
    res.redirect('/');
});

app.post('/removetask', function(req, res){
    var removeTask = req.body.check;
    //push to completed
    if(typeof removeTask === 'string'){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }else if(typeof removeTask === 'object'){
        for (var i = 0; i < removeTask.length; i++){
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
        }
    }
    res.redirect('/');
});

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});