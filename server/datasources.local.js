var extend = require('util')._extend;
var DB = process.env.DB || 'memory';
var DATASTORES = {
  memory: {
      
  },
  mongodb: {
    host: '0.0.0.0',
    database: 'dbmiraflores',
    username: 'admin',
    password: '123456',
    port: 27017
  }
};

if (! (DB in DATASTORES)) {
  console.error("Invalid DB");
  process.exit();
}

var connector = DB === 'memory' ? DB: 'loopback-connector-' + DB;
var config = extend({connector:connector}, DATASTORES[DB]);

module.exports = {
  db: config
};