module.exports = function(Entity) {
  Entity.nearby = function(here, page, max, fn) {
    if(typeof page === 'function') {
      fn = page;
      page = 0;
      max = 0;
    }

    if(typeof max === 'function') {
      fn = max;
      max = 0;
    }

    var limit = 10;
    page = page || 0;
    max = Number(max || 0.1);
    // console.log('---->', page ,max);

    Entity.find({
      // find locations near the provided GeoPoint
      where: {
        geo: {
          near: here,
          maxDistance: max
        }
      },
      include: 'events'
    }, fn);
  };

  // Fix 10 request per second
  var lookupGeo = require('function-rate-limit')(5, 1000, function() {
    var geoService = Entity.app.dataSources.geo;
    geoService.geocode.apply(geoService, arguments);
  });

  Entity.beforeSave = function(next, loc) {
    if(loc.geo) return next();

    lookupGeo(loc.street, loc.city, loc.state,
      function(err, result) {
        if(result && result[0]) {
          loc.geo = result[0].lng + ',' + result[0].lat;
          next();
        } else {
          next(new Error('could not find location'));
        }
    });
  };

  Entity.setup = function() {
    Entity.base.setup.apply(this, arguments);

    this.remoteMethod('nearby', {
      description: 'Find nearby entities around the geo point', 
      accepts: [
        {arg: 'here', type: 'GeoPoint', required: true, description: 'geo location (lng, lat)'},
        {arg: 'page', type: 'Number', description: 'number of pages (10 default) '},
        {arg: 'max', type: 'Number', description: 'Max distance in miles'}
      ],
      returns: {arg: 'entities', root: true},
      http: { verb: 'GET' }
    });
  };

  Entity.setup();
};
