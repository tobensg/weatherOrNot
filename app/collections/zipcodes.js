var db = require('../config');
var Zipcode = require('../models/zipcode');

var Zipcodes = new db.Collection();

Zipcodes.model = Zipcode;

module.exports = Zipcodes;
