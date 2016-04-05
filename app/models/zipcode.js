var db = require('../config');
// var Link = require('./link.js');

var Zipcode = db.Model.extend({
  tableName: 'zipcodes',
  hasTimestamps: true,
  // link: function() {
  //   return this.belongsTo(Link, 'linkId');
  // }
});

module.exports = Zipcode;