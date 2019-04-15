// import Dependencies
var router = require('express').Router(),
    keys = require('../config/config'),
    stripe = require('stripe')(keys.stripe.keySecret),;

router.post('/charge', (req, res, next) => {
  // get stripe token from client
  var stripeToken = req.body.stripeToken;
  // calculate charge
  var payment = Math.round(req.body.amount*100);
  // create stripe customer
  stripe.customers.create()
  //create customer bank account
  .then(function(customer) {
    return stripe.customers.createSource(customer.id, {
      source: stripeToken.id
    });
  })
  // create charging payment object
  .then(function(source) {
    return stripe.charges.create({
      amount: payment,
      currency: 'usd',
      customer: source.customer
    });
  })
  .then(function(charge) {
    res.json({
      success: true,
      message: 'Payment successful!'
    });
  })
  // catch errors
  .catch(function(err){
    res.json({
      success: false,
      message: 'An error occured. Payment failed.'
    });
  });
});

module.exports = router;
