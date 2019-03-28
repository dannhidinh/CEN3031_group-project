var stripe = require("stripe")("sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i");

// create card
stripe.customers.createSource(
  "cus_EmbMjjAMWo22Gc",
  { source: "tok_mastercard" },
  function(err, card) {
    // asynchronously called
  }
);

// retrieve card
stripe.customers.retrieveCard(
  '"cus_EmbMjjAMWo22Gc"',
  '"card_1EJ2ABJ6O0ymFSXqVuM4vlMV"',
  function(err, card) {
    // asynchronously called
  }
);

// update card
stripe.customers.updateCard(
  "cus_EmbMjjAMWo22Gc",
  "card_1EJ2ABJ6O0ymFSXqVuM4vlMV",
  { name: "{name}" },
  function(err, card) {
    // asynchronously called
  }
);

// delete card
stripe.customers.deleteCard(
  "cus_EmbMjjAMWo22Gc",
  "card_1EJ2ABJ6O0ymFSXqVuM4vlMV",
  function(err, confirmation) {
    // asynchronously called
  }
);

// list cards
stripe.customers.listCards('cus_EmbMjjAMWo22Gc', function(err, cards) {
  // asynchronously called
});
