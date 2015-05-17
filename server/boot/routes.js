
module.exports = function(app) {

  var Entity = app.models.Entity
     ,Event  = app.models.Event;

  var router = app.loopback.Router();

  //$ curl -X POST --data "lat=12.332&lng=7.333&date=2,12,2015,13:30" http://localhost:8080/init
  router.post('/init', function(req, res) {
    var lat = req.body.lat;
    var lng = req.body.lng;
    var date = req.body.date;
    lat = parseFloat(lat);
    lat += 40;
    date = date.split(',');
    console.log('----> ', lat, lng, date[2]);
    res.send("OK");
  });

  app.use(router);
};