var async = require('async');

var categorys = require('./category.json');
var entityTypes = require('./entity-type.json');
var entitys = require('./entity.json');
var events = require('./event.json');

module.exports = function(app, cb) {
  var Category = app.models.Category;
  var EntityType = app.models.EntityType;
  var Entity = app.models.Entity;
  var Event = app.models.Event;

  var db = app.dataSources.db;
  var ids = {};

  function importData(Model, data, cb) {
    Model.destroyAll(function(err) {
      if(err) {
        cb(err);
        return;
      }

      async.each(data, function(d, callback) {
        if(ids[Model.modelName] === undefined) {
          ids[Model.modelName] = 80;
        }
        d.id = ids[Model.modelName]++;
        Model.create(d, callback);
      }, cb);
    });
  }

  async.series([
    function(cb) {
      db.autoupdate(cb);
    },
    
    importData.bind(null, Category, categorys),
    importData.bind(null, EntityType, entityTypes),
    importData.bind(null, Entity, entitys),
    importData.bind(null, Event, events)

  ], function(err) {
    cb(err);
  });
};

if(require.main === module) {
  module.exports(require('../', function(err) {
    if(er) {
      console.log('Cannot import sample data - ', err);
    } else {
      console.log('Sample data imported!');
    }
  }));
}