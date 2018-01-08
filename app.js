var express=require('express');
var passport = require('passport');
var todoController= require('./controllers/todoController');
var Security=require('./Security.js')
var app=express();

//Passport just provides the mechanism to handle authentication leaving the onus of implementing session-handling ourselves 
//and for that we will be using express-session

//req.session is just a json object that gets persisted by the express-session middleware, using a store of your choice e.g. Mongo or Redis
//without using express-session no cookie will be stored at client browser.Check cookie in Chrome Dev Tools->Application->Cookies
var expressSession = require('express-session');

app.use(expressSession({secret: 'mySecretKey'}));
require('./Security')(app);
//set up template engine
app.set('view engine','ejs');


//static files
//Route specific
//app.use('/assets',express.static('./public'));
app.use(express.static('./public'));


app.use(passport.initialize());
app.use(passport.session())

//Passport also needs to serialize and deserialize user instance from a session store in order to support login sessions, 
//so that every subsequent request will not contain the user credentials. It provides two methods serializeUser and 
//deserializeUser for this purpose:
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
  });
//fire controllers
todoController(app,passport);

//listen to port
app.listen(process.env.PORT || 3000);
console.log(`listenting on port 3000`);
