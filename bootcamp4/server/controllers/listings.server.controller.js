/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/listings.server.model.js');

console.log("Page used");

//creates a new 'user'; could either actually be a user or a product
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

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.user);
};

/* Update a listing */
exports.update = function(req, res) {

  var user = req.user;

//changes action depending act set here and in controllers; necessary because there can be only one put function
    if (req.query.act == 'add') {
//used to add to cart, can now take parameter!

  //console.log(user.orderHist[0]._id);
/* 
    User.findOneAndUpdate({ name: user.name, "orderHist._id": user.orderHist[user.orderHist.length-1]._id }, 
      {$addToSet: {"orderHist.$.cart": {productC: req.query.product, quantity: req.query.amount, price: req.query.cost}} }, 
      function(err, user) {

      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      else{
        
      }
    });
    
     
    User.findOne({ name: user.name }, function (err, user) {
      if (err) return handleError(err);
      
      else{
        res.json(user);
      }
    });
*/
    User.findOneAndUpdate({ name: user.name }, 
      {$push: {cart: {itemID: req.query.item, productC: req.query.product, quantity: req.query.amount, price: req.query.cost}} }, 
      function(err, user) {

      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      else{
        
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
            } else {
                //console.log("got here");
            }
        });


        User.findOne({name: user.name}, function (err, user) {
            if (err) return handleError(err);

            else {
                res.json(user);
            }
        });
  }
  else if(req.query.act == 'toHist'){
    //console.log(user.name);
    //console.log(req.query.cart);
    var converted = JSON.parse(req.query.cart);
    //console.log(converted[0].productC);
    console.log(req.query.cost);
    var final = req.query.cost.toString();
    //final = "Total Price (w/tax): " + final;
    console.log(final);
//for (var i = Things.length - 1; i >= 0; i--) {
//  Things[i]
//}

  for (var i = 0; i < converted.length; i++) {
    //console.log(converted[i].itemID);
    //console.log(converted[i].quantity);
    //console.log(converted[i].itemID);
    //console.log(product.itemname);
    //var newQTY = product.itemqty - converted[i].quantity;
            
    User.findOneAndUpdate({ _id: converted[i].itemID }, { $inc: { itemqty: converted[i].quantity*-1 } }, function(err, user) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
    });
      

    
  }


    User.findOneAndUpdate({ name: user.name }, { $push: {orderHist: {total: final, cart: converted} } }, function(err, user) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      else{
        //console.log("got here");
      }
    });


    User.findOneAndUpdate({ name: user.name }, { $set: {cart: [] } }, function(err, user) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }
      else{
        //console.log("got here");
      }
    });    
     
    User.findOne({ name: user.name }, function (err, user) {
      if (err) return handleError(err);
      
      else{
        //console.log(user.name);
        res.json(user);
      }
    });

  }
//used to change username in user page
    else if (req.query.act == 'newName') {

        var newName = req.query.product;
        console.log(user.name);
        console.log(newName);

        User.findOneAndUpdate({name: user.name}, {name: newName}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });


        User.findOne({email: user.email}, function (err, user) {
            if (err) return handleError(err);

            else {
                console.log("new users name " + user.name);
                res.json(user);
            }
        });

    }

//used to change phone in userpage
    else if (req.query.act == 'newTel') {

        var newTel = req.query.product;

        User.findOneAndUpdate({name: user.name}, {phone: newTel}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });


        User.findOne({name: user.name}, function (err, user) {
            if (err) return handleError(err);

            else {
                //console.log("new users name " + user.name);
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
            } else {
                //console.log("got here");
            }
        });


        User.findOne({name: user.name}, function (err, user) {
            if (err) return handleError(err);

            else {
                //console.log("new users name " + user.name);
                res.json(user);
            }
        });

    }
/*
// the following else blocks are used to change vendor fields
    else if (req.query.act == 'newItemQty') {
        var newiqty = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {itemqty: newiqty}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemPrice') {
        var newiprice = req.query.item;
        User.findOneAndUpdate({_id: user._id}, {itemprice: newiprice}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemExp') {
        var newiexp = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {itemexp: newiexp}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemDesc') {
        var newidesc = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {itemdesc: newidesc}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemCode') {
        var newicode = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {itemcode: newicode}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemName') {
        var newiname = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {itemname: newiname}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newItemPic') {
        var newipic = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {itempic: newipic}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newIBodNum') {
        var newibnum = req.query.item;
//user is name of entire document (row) that contains users, vendors, items, transactions...)
        User.findOneAndUpdate({_id: user._id}, {ibodnum: newibnum}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    } else if (req.query.act == 'newIVenUser') {
        var newiven = req.query.item;
        User.findOneAndUpdate({_id: user._id}, {ivenuser: newiven}, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                //console.log("got here");
            }
        });
    }
*/
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
