
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

  router.get('/', function(req, res) {
    res.render('pages/login', {
      loginFailed : false
    });
  });

  router.post('/login2', function(req, res) {
    res.redirect('/dashboard');
  });

  router.get('/dashboard', function(req, res) {
    res.render('pages/entity', {
    });
  });

  router.post('/entity', function(req, res) {
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    var email = req.body.email;
    var webpage = req.body.webpage;
    var urlLogo = req.body.urlLogo;
    var urlBanner = req.body.urlBanner;
    var category = req.body.category;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var geo = new GeoPoint({lat: lat, lng: lng});
    
    Entity.create({
      name : name,
      address : address,
      phone : phone,
      email : email,
      webpage : webpage,
      urlLogo : urlLogo,
      urlBanner : urlBanner,
      geo : geo,
      category : category
    }, function(err) {
      if(err) return res.sendStatus(404);
      res.redirect('/dashboard');
    });

  });

  app.use(router);
};