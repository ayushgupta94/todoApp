var passport = require('passport');
var Strategy = require('passport-local').Strategy;

function init(){
  console.log("init")
  passport.use(new Strategy({
    session: false
  },
    function(username, password, done) {
      console.log('==============Security===============');
      validate({ username: username }, function (err, user) {
        console.log("cb========="+user);
        console.log(err);
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));       
}
  function validate(username,cb){
    console.log('==============validate==============='+JSON.stringify(username));
      if(username.username==="ayush"){
          return cb(null,"ayush");
      }
      else{
        return cb(new Error('User does not exist'));
      }
  }
  
  module.exports=init;