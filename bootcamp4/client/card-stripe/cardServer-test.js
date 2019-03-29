var stripe = require("stripe")("sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i");

// CARD INFORMATION
// create card
stripe.customers.createSource(
  "cus_EmbMjjAMWo22Gc",
  { source: "tok_mastercard" },
  function(err, card) {
    // asynchronously called
    if err throw err;
  }
);
// retrieve card
stripe.customers.retrieveCard(
  '"cus_EmbMjjAMWo22Gc"',
  '"card_1EJ2ABJ6O0ymFSXqVuM4vlMV"',
  function(err, card) {
    // asynchronously called
    if err throw err;
  }
);
// update card
stripe.customers.updateCard(
  "cus_EmbMjjAMWo22Gc",
  "card_1EJ2ABJ6O0ymFSXqVuM4vlMV",
  { name: "{name}" },
  function(err, card) {
    // asynchronously called
    if err throw err;
  }
);
// delete card
stripe.customers.deleteCard(
  "cus_EmbMjjAMWo22Gc",
  "card_1EJ2ABJ6O0ymFSXqVuM4vlMV",
  function(err, confirmation) {
    // asynchronously called
    if err throw err;
  }
);
// list cards
stripe.customers.listCards('cus_EmbMjjAMWo22Gc', function(err, cards) {
  // asynchronously called
  if err throw err;
});

// CUSTOMER
// create customer
stripe.customers.create({
  description: 'Customer for jenny.rosen@example.com',
  source: "tok_mastercard" // obtained with Stripe.js
}, function(err, customer) {
  // asynchronously called
  if err throw err;
});
// retrieve customer
stripe.customers.retrieve(
  'cus_EmdzMwIuOjn884',
  function(err, customer) {
    // asynchronously called
    if err throw err;
  }
);
// update customer
stripe.customers.update(
  'cus_EmdzMwIuOjn884',
  {metadata: {order_id: '6735'}},
    function(err, customer) {
    // asynchronously called
    if err throw err;
  }
);
// delete customer
stripe.customers.del(
  "cus_EmdzMwIuOjn884",
  function(err, confirmation) {
    // asynchronously called
    if err throw err;
  }
);
// list customers
stripe.customers.list(
  { limit: 3 },
  function(err, customers) {
    // asynchronously called
    if err throw err;
  }
);
