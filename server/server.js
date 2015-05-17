var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var path = require('path');

var app = module.exports = loopback();

app.middleware('initial', bodyParser.urlencoded({
  extended : true
}));

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.set('view engine', 'jade');
app.set('json spaces', 2);
app.set('views', path.resolve(__dirname, '../client'));

app.use(loopback.cookieParser(app.get('cookieSecret')));
app.use(loopback.session({
  secret: 'appsdo',
  saveUninitialized: true,
  resave: true
}));

var websitePath = path.resolve(__dirname, '../client');
app.use(loopback.static(websitePath));
app.use(loopback.urlNotFound());
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
