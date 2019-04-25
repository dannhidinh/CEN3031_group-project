/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/listings.server.model.js');

//creates a new 'user'; could either actually be a user or a product; both are stored in database as 'user'
exports.create = function(req, res) {

  var user = new User(req.body);

  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });

};

//send back the user as json from the request
exports.read = function(req, res) {

  res.json(req.user);
};

//decides action depending on act set here and in controllers
exports.update = function(req, res) {

  var user = req.user;

//adds items to currentUser's cart; finds current user in the database, then puts incoming item info in their cart
  if (req.query.act == 'add') {


    User.findOneAndUpdate({ name: user.name }, 
      {$push: {cart: {itemID: req.query.item, productC: req.query.product, quantity: req.query.amount, price: req.query.cost}} }, 

      function(err, user) {

        if(err) {
          console.log(err);
          res.status(400).send(err);
        }

    });
         
    User.findOne({ name: user.name }, function (err, user) {
      
      if (err) return handleError(err);
      
      else{
        res.json(user);
      }

    });

  }
  
//used to delete from cart
  else if (req.query.act == 'delete') {

    User.findOneAndUpdate({name: user.name}, {$pull: {cart: {_id: req.query.item}}}, function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
    });


    User.findOne({name: user.name}, function (err, user) {
        if (err) return handleError(err);

        else {
            res.json(user);
        }
    });

  }

//post-checkout functionality
  else if(req.query.act == 'toHist'){

//converts passed cart to a working object
    var converted = JSON.parse(req.query.cart);

//gets final(post tax) price of order and converts to string
//conversion necessary because numbers ending in 0 (e.g. 12.30) are saved and displayed from database without the 0 (e.g. 12.3)
    var final = req.query.cost.toString();

//lowers quantity of products available by the amount from recent purchase; finds them by itemID stored in cart
    for (var i = 0; i < converted.length; i++) {

      User.findOneAndUpdate({ _id: converted[i].itemID }, { $inc: { itemqty: converted[i].quantity*-1 } }, function(err, user) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        }
      });

    }

//stores current cart and the final price in currentUser's orderHist array
    User.findOneAndUpdate({ name: user.name }, { $push: {orderHist: {total: final, cart: converted} } }, function(err, user) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
    });

//empties current cart to prepare for next order
    User.findOneAndUpdate({ name: user.name }, { $set: {cart: [] } }, function(err, user) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }

    });    
     
    User.findOne({ name: user.name }, function (err, user) {
      if (err) return handleError(err);     

      else{
        res.json(user);
      }

    });

  }

//used to change username in user page
  else if (req.query.act == 'newName') {

    var newName = req.query.product;

    User.findOneAndUpdate({name: user.name}, {name: newName}, function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
    });


    User.findOne({email: user.email}, function (err, user) {
        if (err) return handleError(err);

        else {
          res.json(user);
        }
    });

  }

//used to change phone number of user in userpage
  else if (req.query.act == 'newTel') {

    var newTel = req.query.product;

    User.findOneAndUpdate({name: user.name}, {phone: newTel}, function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
    });


    User.findOne({name: user.name}, function (err, user) {
      if (err) return handleError(err);

      else {
        res.json(user);
      }
    });

  }

//used to change email in user page
  else if (req.query.act == 'newMail') {

    var newMail = req.query.product;

    User.findOneAndUpdate({name: user.name}, {email: newMail}, function (err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
    });


    User.findOne({name: user.name}, function (err, user) {
      if (err) return handleError(err);

      else {
        res.json(user);
      }
    });


    }
// the following else blocks are used to change vendor fields
    else if (req.query.act == 'newItemQty') {
        var newiqty = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itemqty: newiqty}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemPrice') {
        var newiprice = req.query.product;
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itemprice: newiprice}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemExp') {
        var newiexp = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itemexp: newiexp}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemDesc') {
        var newidesc = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itemdesc: newidesc}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemCode') {
        var newicode = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itemcode: newicode}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemName') {
        var newItemName = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itemname: newItemName}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
 //                console.log(newItemName);
//                res.status(200).send();
            }
        });
    } else if (req.query.act == 'newItemPic') {
        var newipic = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {itempic: newipic}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newIBodNum') {
        var newibnum = req.query.product;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {ibodnum: newibnum}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newIVenUser') {
        var newiven = req.query.product;
        User.findOneAndUpdate({ivenuser: user.ivenuser}, {ivenuser: newiven}, {ibodnum: value}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
//                res.status(200).send();
            }
        });
    }
};

/* Delete a document */
exports.delete = function(req, res) {
  var user = req.user;

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

/*Retreive all documents in the database (both real users and products)*/
exports.list = function(req, res) {

  var user = req.user;
  User.find().sort('._id').exec(function(err, users) {
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
  Middleware: find a user by its ID, then pass it to the next request handler.

  Find the user using a mongoose query,
        bind it to the request object as the property 'user',
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
