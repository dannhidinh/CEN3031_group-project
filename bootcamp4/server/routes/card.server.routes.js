
// Dependencies
var keyPublishable = 'pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a',
    keySecret = 'sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i',
    express = require('express'),
    router = express.Router(),
    stripe = require('stripe')(keySecret),
    bodyParser = require('body-parser');

router.post("/charge", (req, res) => {
  //let amount = 999;


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
