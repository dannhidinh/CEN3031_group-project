var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);
  mongoose.connect(config.db.buri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  /**TODO
  Serve static files */
  app.use('/', express.static(path.join(__dirname, '/../../client')));
  app.use('/public', express.static(path.join(__dirname, '/../../public')));

  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/users', listingsRouter);

  /**TODO
  Go to homepage for all routes not specified */
 app.get('*', function(req, res) {
   res.redirect('/');
 });

  return app;
};
