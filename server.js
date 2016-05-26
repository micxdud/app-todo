    // set up
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration
    mongoose.connect('mongodb://user:user@jello.modulusmongo.net:27017/in6uTiqo');     // connect to mongoDB database on modulus.io
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define model
    var Todo = mongoose.model('Todo', {
        text : String,
        email: String,
        isCompleted : Boolean
    });
    
    // todo handler
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });
    
    // filter tasks
    app.get('/api/todos/filter/:completition/:owner/:email', function(req, res) {

        if(req.params.completition == 'all'){
            
            if(req.params.owner == 'all'){
                // use mongoose to get all todos in the database
                Todo.find(function(err, todos) {
        
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
        
                    res.json(todos); // return all todos in JSON format
                });
            }else{
                Todo.find({email : req.params.email}, function(err, todos) {
    
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
        
                    res.json(todos); // return all todos in JSON format
                });
            }
        }else{

            var completed = false;
            
            if(req.params.completition == 'done'){
                completed = true;
            }

            if(req.params.owner == 'all'){
                // use mongoose to get completed or incompleted todos
                Todo.find({isCompleted : completed}, function(err, todos) {
        
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
        
                    res.json(todos); // return all todos in JSON format
                });
            }else{
                // use mongoose to get completed or incompleted todos
                Todo.find({isCompleted : completed, email : req.params.email}, function(err, todos) {
        
                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)
        
                    res.json(todos); // return all todos in JSON format
                });
            }
        }
    });

    // create todo and send back all todos after creation
    app.post('/api/todos/:completition/:owner/:email', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            email : req.body.email,
            isCompleted : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            if(req.params.completition == 'all'){
            
                if(req.params.owner == 'all'){
                    // use mongoose to get all todos in the database
                    Todo.find(function(err, todos) {
            
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }else{
                    Todo.find({email : req.params.email}, function(err, todos) {
        
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }
            }else{
    
                var completed = false;
                
                if(req.params.completition == 'done'){
                    completed = true;
                }
    
                if(req.params.owner == 'all'){
                    // use mongoose to get completed or incompleted todos
                    Todo.find({isCompleted : completed}, function(err, todos) {
            
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }else{
                    // use mongoose to get completed or incompleted todos
                    Todo.find({isCompleted : completed, email : req.params.email}, function(err, todos) {
            
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }
            }
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id/:completition/:owner/:email', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            if(req.params.completition == 'all'){
            
                if(req.params.owner == 'all'){
                    // use mongoose to get all todos in the database
                    Todo.find(function(err, todos) {
            
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }else{
                    Todo.find({email : req.params.email}, function(err, todos) {
        
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }
            }else{
    
                var completed = false;
                
                if(req.params.completition == 'done'){
                    completed = true;
                }
    
                if(req.params.owner == 'all'){
                    // use mongoose to get completed or incompleted todos
                    Todo.find({isCompleted : completed}, function(err, todos) {
            
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }else{
                    // use mongoose to get completed or incompleted todos
                    Todo.find({isCompleted : completed, email : req.params.email}, function(err, todos) {
            
                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                            res.send(err)
            
                        res.json(todos); // return all todos in JSON format
                    });
                }
            }
        });
    });
    
    // complete or incomplete todo
    app.post('/api/todos/complete/:todo_id/:completition/:owner/:email', function(req, res) {
        Todo.findById(req.params.todo_id, function(err, todo) {
            if(todo){
                if(todo.isCompleted){
                    todo.isCompleted = false;
                }else{
                    todo.isCompleted = true;
                }
                
                todo.save(function(err) {
                  if (err)
                    console.log('error')
                  else
                    console.log('success')
                });
                
                if(req.params.completition == 'all'){
            
                    if(req.params.owner == 'all'){
                        // use mongoose to get all todos in the database
                        Todo.find(function(err, todos) {
                
                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err)
                                res.send(err)
                
                            res.json(todos); // return all todos in JSON format
                        });
                    }else{
                        Todo.find({email : req.params.email}, function(err, todos) {
            
                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err)
                                res.send(err)
                
                            res.json(todos); // return all todos in JSON format
                        });
                    }
                }else{
        
                    var completed = false;
                    
                    if(req.params.completition == 'done'){
                        completed = true;
                    }
        
                    if(req.params.owner == 'all'){
                        // use mongoose to get completed or incompleted todos
                        Todo.find({isCompleted : completed}, function(err, todos) {
                
                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err)
                                res.send(err)
                
                            res.json(todos); // return all todos in JSON format
                        });
                    }else{
                        // use mongoose to get completed or incompleted todos
                        Todo.find({isCompleted : completed, email : req.params.email}, function(err, todos) {
                
                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err)
                                res.send(err)
                
                            res.json(todos); // return all todos in JSON format
                        });
                    }
                }
            }
        });
    });
    
    

    // listen
    app.listen(8080);
    console.log("App listening on port 8080");