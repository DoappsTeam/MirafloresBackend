var importer = require('../sample-data/import');

module.exports = function(app) {
  if(app.datasources.db.name !== 'Memory') return;

  console.log("Start importing data");
  app.importing = true;

  importer(app, function(err) {
    delete app.importing;
    if(err) {
      console.error('Cannot import data - ', err);
    } else {
      console.log('Sample data imported');
    }
    app.emit('import deone', err);
  });
};