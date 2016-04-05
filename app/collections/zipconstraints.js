var db = require('../config');
var Zipconstraint = require('../models/zipconstraint');

var Zipconstraints = new db.Collection();

Zipconstraints.model = Zipconstraint;

module.exports = Zipconstraints;
