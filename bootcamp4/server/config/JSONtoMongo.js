"use strict";
/* Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    bListing = require('../models/blistings.server.model.js'),
    config = require('./config.js'),
    blistingsJSON = require('./blistings.json');
/* Connect to your database */

mongoose.connect(config.db.uri);
/*Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database */
var myListing = fs.readFile('blistings.json', 'utf8', function(err, data) {
    if (err)
        throw err;

    var blistings = JSON.parse(data);
    // grab the user model
    // create and save
    bListing.insertMany(blistings.entries, function (err, data) {
        if (err) throw err;
    });
});

/*Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.*/
