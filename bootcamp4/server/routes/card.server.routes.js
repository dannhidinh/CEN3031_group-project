// import Dependencies
/*
var router = require('express').Router(),
    keys = require('../config/config'),
    stripe = require('stripe')(keys.stripe.keySecret);

router.post('/charge', (req, res, next) => {
  // get stripe token from client
  var stripeToken = req.body.stripeToken;
  // calculate charge
  var payment = Math.round(req.body.amount*100);
  //let payment = 999;
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
*/
//const keyPublishable = process.env.PUBLISHABLE_KEY;
//const keySecret = process.env.SECRET_KEY;

var keyPublishable = 'pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a',
    keySecret = 'sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i';

var express = require("express"),
    stripe = require("stripe")(keySecret),
    bodyParser = require("body-parser");

var router = require('express').Router();

router.post("/charge", (req, res) => {
  let amount = req.body.amount;

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


module.exports = router;
