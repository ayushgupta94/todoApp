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


var urlencodedParser= bodyParser.urlencoded({extended:false})
module.exports= function (app){

//sample
  app.get('/',function(req,res){
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

};
