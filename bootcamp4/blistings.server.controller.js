
/* Dependencies */
var mongoose = require('mongoose'),
    bListing = require('../models/blistings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update bodega listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the bodega listing(s) as JSON in the response.

 */

/* Create a blisting */
exports.create = function(req, res) {
  /* Instantiate a bListing */
  var blisting = new bListing(req.body);
  /* Then save the blisting */
  blisting.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(blisting);
    }
  });
};

/* Show the current blisting */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.blisting);
};

/* Update a listing */
exports.update = function(req, res) {
  var blisting = req.blisting;

  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  blisting.bodname = req.body.bodname;
  blisting.bodaddress = {bodstreet: req.body.bodstreet,
                bodcity: req.body.bodcity, bodstate: req.results.bodstate,
                bodzip: req.results.bodzip,
                bodlat: req.results.bodlat, bodlong: req.results.bodlong};
  blisting.boddescr  = req.body.boddescr;
  blisting.bodimage  = req.body.bodimage;
  blisting.bodurl  = req.body.bodurl;
  blisting.vendor = {venname: req.results.venname, venmobile: req.results.venmobile,
    venaddress:{venstreet: req.results.venstreet,
      vencity: req.results.vencity, venstate: req.results.venstate, venzip: req.results.venzip,
      venlat: req.results.venlat, venlong: req.results.venlong},
           item: {itemname: req.res.itemname,
           itemdesc: req.res.itemdesc,
           itemprice: req.res.itemprice,
           itemexp: req.res.itemexp,
           itemqty: req.res.itemqty}};
  blisting.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(blisting);
    }
  });
};

/* Delete a blisting */
exports.delete = function(req, res) {
  var blisting = req.blisting;
  /* Remove the article */

  blisting.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });

//  bListing.findByIdAndRemove(blisting.id).exec(function(err) {
//    if(err) {
//     console.log(err);
//      res.status(400).send(err);
//    }
//    else {
//      res.status(200).send();
//    }
//  });
};

/* Retreive all the bodega listings, sorted alphabetically by blisting code */
exports.list = function(req, res) {

//  var blisting = req.blisting;
  bListing.find().sort('bodname').exec(function(err, blistings) {
    if(err) {
//      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(blistings);
    }
  });
};

/*
  Middleware: find a bodega listing by its ID, then pass it to the next request handler.

  Find the bodega listing using a mongoose query,
        bind it to the request object as the property 'blisting',
        then finally call next
 */
exports.blistingByID = function(req, res, next, id) {
  bListing.findById(id).exec(function(err, blisting) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.blisting = blisting;
      next();
    }
  });
};
