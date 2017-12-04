var express=require('express');
var todoController= require('./controllers/todoController');
var app=express();

//set up template engine
app.set('view engine','ejs');

//static files

//Route specific
//app.use('/assets',express.static('./public'));

app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(process.env.PORT || 3000);
console.log(`listenting on port 3000`);
