
/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {
  /* Instantiate a Listing */
  var user = new User(req.body);
  /* Then save the listing */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.user);
};

/* Update a listing */
exports.update = function(req, res) {
  var user = req.user;
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phone = req.body.phone;
  //listing.address = req.body.address;
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(user);
    }
  });

};

/* Delete a listing */
exports.delete = function(req, res) {
  var user = req.user;
  /** TODO **/
  /* Remove the article */
  User.findByIdAndRemove(user.id).exec(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.status(200).send();
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /** TODO **/
  /* Your code here */
  var user = req.user;
  User.find().sort('email').exec(function(err, users) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else {
      res.json(users);

    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
