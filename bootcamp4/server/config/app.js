var config = require('./config'),
    mongoose = require('mongoose'),
    express = require('./express'),
    stripe = require('stripe')('sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.env.PORT || config.port, function() {
    console.log('App listening on port', this.address().port, app.settings.env );
  });
};
