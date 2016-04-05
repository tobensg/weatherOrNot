var express = require('express');
var util = require('./lib/utility');
var partials = require('express-partials');
var bodyParser = require('body-parser');

var session = require('express-session');

var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Zipcode = require('./app/models/zipcode');
var Zipcodes = require('./app/collections/zipcodes');
var Zipconstraint = require('./app/models/zipconstraint');
var Zipconstraints = require('./app/collections/zipconstraints');


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', util.checkUser, function(req, res) {
  res.render('index');
});

app.get('/create', util.checkUser, function(req, res) {
  res.render('index');
});

app.get('/zips', util.checkUser, function(req, res) {
  // console.log('got links request');
  Zipcodes.reset().fetch().then(function(zips) {
    // console.log('build zips');
    res.send(200, zips.models);
  });
});

app.post('/zips', util.checkUser, function(req, res) {
  // var uri = req.body.url;
  var zip = req.body.zip;

  console.log('in links post***********************');
  // console.log(req.body);
  if (zip === undefined) {
    console.log ('we should be doing the store constraints tree');

    new Zipcode({ zipcode: req.body.relatedZip }).fetch().then(function(found) {
      if (found) {
        console.log('found a match.  showing attributes: ', found.attributes.id);
        Zipconstraints.create({
          zipcodeId: found.attributes.id,
          temperatureBoolean: req.body.temperatureBoolean,
          temperatureHigh: req.body.temperatureHigh,
          temperatureLow: req.body.temperatureLow,
          windBoolean: req.body.windBoolean,
          windHigh: req.body.windHigh,
          windLow: req.body.windLow,
          directionBoolean: req.body.directionBoolean,
          directionHigh: req.body.directionHigh,
          directionLow: req.body.directionLow
        }).then(function(newConstraint){
          res.send(200, newConstraint);
        })
      } else {
        console.log('no match... check your stuff: ', req.body.relatedZip);
        return res.send(404);
      }
    });

  } else {
    if (!util.isValidZip(zip)) {
      console.log('Not a valid zip: ', zip);
      return res.send(404);
    } else {
      new Zipcode({ zipcode: zip }).fetch().then(function(found) {
        if (found) {
          res.send(200, found.attributes);
        } else {
          util.getWeatherInfo(zip, function(err, response) {
            if (err) {
              console.log('**********Error reading ZIP heading: *****', err);
              return res.send(404);
            }
            Zipcodes.create({
              zipcode: zip,
              name: response.name,
              temperature: response.temp,
              wind: response.wind,
              direction: response.direction,
            })
            .then(function(newZip) {
              res.send(200, newZip);
            });
          });
        }
      });
    }
  }
});

/************************************************************/
// Write your authentication routes here
/************************************************************/


app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        res.redirect('/login');
      } else {
        user.comparePassword(password, function(match) {
          if (match) {
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
});

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});

app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  new User({ username: username })
    .fetch()
    .then(function(user) {
      if (!user) {
        // ADVANCED VERSION -- see user model
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(newUser) {
            util.createSession(req, res, newUser);
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
});

/************************************************************/
// Handle the wildcard route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/*', function(req, res) {
  new Link({ code: req.params[0] }).fetch().then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      var click = new Click({
        linkId: link.get('id')
      });

      click.save().then(function() {
        link.set('visits', link.get('visits') + 1);
        link.save().then(function() {
          return res.redirect(link.get('url'));
        });
      });
    }
  });
});

console.log('Shortly is listening on 4568');
app.listen(4568);