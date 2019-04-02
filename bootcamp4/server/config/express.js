const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    //cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    blistingsRouter = require('../routes/blistings.server.routes');

// stripe API bs
const keyPublishable = process.env.PUBLISHABLE_KEY,
      keySecret = process.env.SECRET_KEY,
      stripe = require("stripe")(keySecret);

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  const app = express(),
        router = express.Router();

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
  app.use('/api/blistings', blistingsRouter);

  /**
  Go to homepage for all routes not specified */
 //app.get('*', function(req, res) {
 //  res.redirect('/');
 //});

  app.all('/*', function(req, res) {
      res.sendFile(path.resolve('./client/index.html'));
  });

  // stripe bs
  blistingsRouter.get('/CartPage', function(req, res) {
    res.sendFile(path.join(__dirname + "/../../client/CartPage.html"));
    app.post("/charge", (req, res) => {
      let amount = 999;

      stripe.customers.create({
        email: req.body.email,
        card: req.body.id
      })
      .then(customer =>
        stripe.charges.create({
          amount,
          description: "Sample Charge",
          currency: "usd",
          customer: customer.id
        }))
      .then(charge => res.send(charge))
      .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });
    });
  });

  return app;
};
