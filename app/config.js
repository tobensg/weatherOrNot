var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
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


module.exports = db;