var config = require('./config'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.env.PORT || 8080, function() {
    console.log('App listening on port', this.address().PORT, app.settings.env );
  });
};
