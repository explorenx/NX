var express = require('express');
var apiRoutes = express.Router();
//var restful = require('node-restful');
var User = require('./accountModel');
var passport	= require('passport');
var jwt         = require('jwt-simple');
var config = require('../../../config/database');
var _ = require('underscore');

var tokens = [];

function requiresAuthentication(request, response, next) {
    console.log(request.headers);
    var tok = getToken(request.headers);
    console.log('token - '+tok + ' Total tokens -' + tokens.length);
    if (tok) {
        var token = tok;
        if (_.where(tokens, token).length > 0) {
            var decodedToken = jwt.decode(token, config.secret);
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromTokens();
                response.end(401, "Your session is expired");
            }
        }
    }
    response.end(401, "No access token found in the request");
}

function removeFromTokens(token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}

// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.Email || !req.body.Password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      Name : req.body.Name,
      Email: req.body.Email,
      Password: req.body.Password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.', userId : newUser._id});
      }
      res.json({success: true, msg: 'Successful created new user.', userId : newUser._id});
    });
  }
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  console.log('Tokens - ' + tokens.length);

  User.findOne({
    Email: req.body.Email
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.Password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          //var token = jwt.encode(user, config.secret);
          // return the information including token as JSON

        var expires = new Date();
        expires.setDate((new Date()).getDate() + 5);
        var token = jwt.encode({
            userName: user.Email,
            role : user.Role,
            expires: expires
        }, config.secret);

        tokens.push(token);

          res.json({success: true, token: 'JWT ' + token, userDetails : { userRole : user.Role, id : user._id, name : user.Name }});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
apiRoutes.post('/logout', requiresAuthentication, function(request, response) {
    var token= request.headers.access_token;
    removeFromTokens(token);
    response.send(200);
});
 
// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!', userName : decoded.Email, password : decoded.password, id : decoded._id});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.access_token) {
    var parted = headers.access_token.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
// connect the api routes under /api/*
//app.use('/api', apiRoutes);

module.exports = apiRoutes;