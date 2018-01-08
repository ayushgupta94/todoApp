var mongoose=require('mongoose');
var bodyParser=require('body-parser');


//connect to the db
mongoose.connect('mongodb://ayush:root@ds129776.mlab.com:29776/todo');

//create a schema -this is like a blueprint

var todoSchema=new mongoose.Schema({
  item:String
});

var Todo= mongoose.model('Todo',todoSchema);

// var item1=Todo({item:'get Milk'}).save(function(err){
//   if(err){
//     throw err;
//   }
//   console.log("item saved");
// });
// var item2=Todo({item:'walk dog'}).save(function(err){
//   if(err){
//     throw err;
//   }
//   console.log("item saved");
// });
// var item3=Todo({item:'get protein'}).save(function(err){
//   if(err){
//     throw err;
//   }
//   console.log("item saved");
// });
// var item4=Todo({item:'buy Flowers'}).save(function(err){
//   if(err){
//     throw err;
//   }
//   console.log("item saved");
// });

//var data=[{item:'get Milk'},{item:'walk dog'},{item:'get protein'},{item:'Study Time'}]

var jsonParse=bodyParser.json();
var urlencodedParser= bodyParser.urlencoded({extended:false})
module.exports= function (app,passport){
  console.log('==============controller===============');

//sample
  app.get('/',function(req,res){
    console.log("==========================start 1========================req")
    console.log(req.session)
    console.log(req.user)
    console.log("==========================end 1==========================req");
    res.send("hi");
  })

  app.get('/todo',function(req,res){
    //get data from mongo db and pass it to the view
    Todo.find({},function(err,data) {
    if(err) throw err;
      res.render('todo',{todos:data});
    });
  })

  app.post('/todo',urlencodedParser,function(req,res){
    //get data from view and add it to mongo db
    var newTodo=Todo(req.body).save(function(err,data){
    if(err) throw err;
        res.json(data);
    })
  })

  app.delete('/todo/:item',function(req,res){
    //delete item from mongo
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if(err) throw err;
      res.json(data);
    })
  })


//   Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.

// req.login(user, function(err) {
//   if (err) { return next(err); }
//   return res.redirect('/users/' + req.user.username);
// });
// When the login operation completes, user will be assigned to req.user.

// Note: passport.authenticate() middleware invokes req.login() automatically. This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.
  app.post('/login',urlencodedParser,passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("==========================start ========================req")
    console.log(req.session)
    console.log(req.user)
    console.log("==========================end ==========================req");
    res.redirect('/');
  });

  //Passport exposes a logout() function on req (also aliased as logOut()) that can be called from any route handler which needs to terminate a login session. Invoking logout() will remove the req.user property and clear the login session (if any).

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
};
