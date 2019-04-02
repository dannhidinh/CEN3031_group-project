var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    //cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes');

// STRIPE: variables
var keyPublishable = 'pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a',
    keySecret = 'sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i',
    stripe = require("stripe")(keySecret),
    stripeRouter = express.Router();

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);
  mongoose.connect(config.db.buri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //app.use(cors());

  //body parsing middleware
  app.use(bodyParser.json());

  /**TODO
  Serve static files */
  app.use('/', express.static(path.join(__dirname, '/../../client')));
  app.use('/public', express.static(path.join(__dirname, '/../../public')));

  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/users', listingsRouter);

  // STRIPE: use router for requests to cart
  stripeRouter.get('/CartPage',function(req,res){
    res.sendFile(path.join(__dirname + '/../../client.html'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.post("/charge", (req, res) => {
      res.sendFile(path.join(__dirname + '/../../charge.html'));
      let amount = 999; // **change this so that it gets the price from the database
      stripe.customers.create({
        email: req.body.email,
        card: req.body.id
      })
      .then(customer =>
        stripe.charges.create({
          amount,
          description: "Sample Charge",
          currency: "usd",
          customer: customer.id // **edit maybe
        }))
      .then(charge => res.send(charge))
      .catch(err => {
        console.log("Error:", err);
        res.status(500).send({error: "Purchase Failed"});
      });
    });
  });

  /**TODO
  Go to homepage for all routes not specified */
 app.get('*', function(req, res) {
   res.redirect('/');
 });

  return app;
};
