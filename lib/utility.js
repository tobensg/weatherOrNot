var request = require('request');
var parser = require('json-parser');

// exports.getUrlTitle = function(url, cb) {
//   request(url, function(err, res, html) {
//     if (err) {
//       console.log('Error reading url heading: ', err);
//       return cb(err);
//     } else {
//       var tag = /<title>(.*)<\/title>/;
//       var match = html.match(tag);
//       var title = match ? match[1] : url;
//       return cb(err, title);
//     }
//   });
// };


exports.getWeatherInfo = function (zip, cb) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial&APPID=5c680e5d8c8f29befb9f1c239dfae90b';
  request(url, function(err, res, html) {
    if (err) {
      console.log('----------------------Error reading url for zip heading: ', err);
      return cb(err);
    } else {
      var weatherObject = {};
      var newObj=parser.parse(html);
      // console.log (newObj.name, newObj.main.temp, newObj.wind.speed, newObj.wind.deg, newObj.weather[0].description, newObj.clouds.all);
      // var tag = /\"name\":\"(.*)\",/;
      // var match = html.match(tag);
      weatherObject.name = newObj.name;
      
      // tag = /\"temp\":(.*),\"press/;
      // match = html.match(tag);
      weatherObject.temp = newObj.main.temp;

      // tag = /\"speed\":(.*),\"deg/;
      // match = html.match(tag);
      weatherObject.wind = newObj.wind.speed;

      // tag = /\"deg\":(\d*.\d*)},\"/;
      // match = html.match(tag);
      weatherObject.direction = newObj.wind.deg;

      // console.log ('in GWI response is ***************************', weatherObject);
      // console.log('the rest: ', html);
      // console.log (res);
      return cb(err, weatherObject);
    }
  });
};

var rValidZip = /^\d{5}(?:[-\s]\d{4})?$/i;

exports.isValidZip = function(zip) {
  return zip.match(rValidZip);
}; 

/************************************************************/
// Add additional utility functions below
/************************************************************/


var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/');
    });
};