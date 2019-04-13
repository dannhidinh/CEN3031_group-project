module.exports.start = function() {
  // STRIPE
  var config = require('./config'),
      mongoose = require('mongoose'),
      express = require('./express'),
      // current secret key is for test
      // change in accordance to client
      stripe = require('stripe')('sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i');

  var app = express.init();
  app.listen(process.env.PORT || config.port, function() {
    console.log('App listening on port', this.address().port, app.settings.env );
  });
};
