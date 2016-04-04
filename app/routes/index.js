var express = require('express');
var router = express.Router();
var keys = require('../keys');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('serving get');
  res.render('index', { key: keys.DarkSkyForecastAPI });
});

module.exports = router;
