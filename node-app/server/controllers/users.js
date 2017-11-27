var mongoose = require('mongoose');

var User = mongoose.model('User');
var bcrypt = require('bcryptjs');

// Google auth
  var CLIENT_ID = "273487283165-bqorn91iag31tck4dejddojqhskllsvs.apps.googleusercontent.com"
  var GoogleAuth = require('google-auth-library');
  var auth = new GoogleAuth;
  var client = new auth.OAuth2(CLIENT_ID, '', '');

module.exports = {

  front_page: function(req, res){
    res.render('index',{})
  },

  // Google token validation
  token_signin: function(req, res){
    var token = req.body.idtoken;
    console.log(token);
    // sub: 40983980002302 - to store info
    client.verifyIdToken(
        token,
        CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
          var payload = login.getPayload();
          var userid = payload['sub'];
          console.log("user Id: " + userid);
          console.dir(payload);

          // checking if email is verified by Google
          if(payload['email_verified']){
            // do store userId or sub(subject as userId) in database as Primary key
            console.log("user authorized");
            res.status(200).send('success');

          // else go to login registration page
          } else {
            res.status(200).send('failed');
          }

        });
  },

  dashboard: function(req, res){
  },

  user_profile: function(req, res){
  }

}
