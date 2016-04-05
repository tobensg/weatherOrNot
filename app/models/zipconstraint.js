var db = require('../config');
// var Link = require('./link.js');

var Zipconstraint = db.Model.extend({
  tableName: 'zipconstraints',
  hasTimestamps: true,
  // link: function() {
  //   return this.belongsTo(Link, 'linkId');
  // }
});

module.exports = Zipconstraint;