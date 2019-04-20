var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    //cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    stripeRouter = require('../routes/card.server.routes'); // FOR STRIPE

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));


  //app.use(cors());

  //body parsing middleware
  app.use(bodyParser.json());

  /**
  Serve static files */
  app.use('/', express.static(path.join(__dirname, '/../../client')));
  app.use('/public', express.static(path.join(__dirname, '/../../public')));

  /**
  Use the listings router for requests to the api */

   app.use('/api/users', listingsRouter);

  // STRIPE - API route
  app.use('/api/card', stripeRouter);
  // STRIPE - CRUD routes
  app.use('/../routes', require('../routes/card.server.routes'));



  /**
  Go to homepage for all routes not specified */

    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('./client/index.html'));
    });

  return app;
};
