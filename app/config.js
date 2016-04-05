var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/weather.sqlite')
  }
});
var db = require('bookshelf')(knex);

/************************************************************/
// Add additional schema definitions below
/************************************************************/


db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('zipcodes').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('zipcodes', function (zipcode) {
      zipcode.increments('id').primary();
      zipcode.string('zipcode', 12).unique();
      zipcode.string('name',100);
      zipcode.string('temperature', 30);
      zipcode.string('wind', 30);
      zipcode.string('direction', 30);
      zipcode.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('zipconstraints').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('zipconstraints', function (zipconstraint) {
      zipconstraint.increments('id').primary();
      zipconstraint.integer('zipcodeId');
      zipconstraint.integer('temperatureBoolean', 1);
      zipconstraint.integer('temperatureHigh');
      zipconstraint.integer('temperatureLow');
      zipconstraint.integer('windBoolean', 1);
      zipconstraint.integer('windHigh');
      zipconstraint.integer('windLow');
      zipconstraint.integer('directionBoolean', 1);
      zipconstraint.integer('directionHigh');
      zipconstraint.integer('directionLow');
      zipconstraint.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


module.exports = db;