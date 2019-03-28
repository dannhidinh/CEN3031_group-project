var stripe = require("stripe")("sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i");
stripe.charges.retrieve("ch_1EIzdLJ6O0ymFSXqbBEguCj0", {
  api_key: "sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i",
  expand: ["customer"],
});
stripe.charges.create({
  amount: 999,
  currency: "usd",
  source: "tok_amex",
  description: "Example charge"
  },{
    idempotency_key: "AKBlM0uKaTZCCsPC"
  }, function(err, charge) {
    if err throw err;
    // asynchronously called
});

/*
const token = request.body.stripeToken;
(async () => {
  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    description: 'Test charge',
    source: token,
    statement_descriptor: 'Custom descriptor',
  });
})();
*/

// failed charges, error handling - EDIT
var message = "Error: Your card has been declined";
switch (err.type) {
  case 'StripeCardError':
    err.message;
    break;
  case 'RateLimitError':
    // invalid parameters
    break;
  case 'StripeAPIError':
    // internal error with Stripe's API
    break;
  case 'StripeConnectionError':
    // error with https communication
    break;
  case 'StripeAuthenticationError':
    // used incorrect API key
    break:
  default:
    // other unexpected erorrs;
    break;
}
