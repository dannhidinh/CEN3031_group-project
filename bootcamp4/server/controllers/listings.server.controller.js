/* Dependencies */
var mongoose = require('mongoose'),
    //{User, Product} = require('../models/listings.server.model.js');
    User = require('../models/listings.server.model.js');
    //Produc = require('../models/listings.server.model.js');
    //Data = require('../models/listings.server.model.js');
console.log("Page used");
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */
 //console.log(Data.User);
/*
  Data.User.findOne({ name: 'Steven' }, function (err, usert) {
    if (err) return handleError(err);
    
    else{
      console.log("found User: " + usert);
      //res.json(usert);
    }
  });

  Data.Product.findOne({ item: 'burgers' }, function (err, usert) {
    if (err) return handleError(err);
    
    else{
      console.log("found Product: " + usert);
      //res.json(usert);
    }
  });  
*/

//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://127.0.0.1:27017/";
/*
//MongoClient.connect(db.uri, function(err, db) {
  //if (err) throw err;
  //var dbo = db("bodega_users");
  db.uri.collection('users').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'name',
         foreignField: 'item',
         as: 'prods'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    //db.close();
  });
//});
*/
/* Create a listing */
exports.create = function(req, res) {
  /* Instantiate a Listing */
console.log("authority: " + req.body.authority);
//  if(req.body.authority == 'product'){
//    var user = new Product(req.body);
//  }
//  else
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
  //console.log("used");
  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  /*
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
*/
console.log(req.query.act);

//changes action depending act set here and in controllers; necessary because there can be only one put function
if(req.query.act == 'add'){
//used to add to cart, can now take parameter!
  console.log(user.name);
  console.log(req.query.item);
  console.log(req.query.product);
  console.log(req.query.amount);
  console.log(req.query.cost);
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
      {$push: {cart: {productC: req.query.product, quantity: req.query.amount, price: req.query.cost}} }, 
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
  else if(req.query.act == 'delete'){

  User.findOneAndUpdate({ name: user.name }, { $pull: {cart: {_id: req.query.item}} }, function(err, user) {
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
      res.json(user);
    }
  });
  }
  else if(req.query.act == 'toHist'){
    //console.log(user.name);
    //console.log(req.query.cart);
    var converted = JSON.parse(req.query.cart);
    //console.log(converted[0].productC);
    //console.log(user.orderHist);
//for (var i = Things.length - 1; i >= 0; i--) {
//  Things[i]
//}

    User.findOneAndUpdate({ name: user.name }, { $push: {orderHist: {cart: converted} } }, function(err, user) {
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
  else if(req.query.act == 'newName'){
  
  var newName = req.query.product;
  console.log(user.name);
  console.log(newName);
  
  User.findOneAndUpdate({ name: user.name }, {name: newName}, function(err, user) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    else{
      //console.log("got here");
    }
  });
  
   
  User.findOne({ email: user.email }, function (err, user) {
    if (err) return handleError(err);
    
    else{
      console.log("new users name " + user.name);
      res.json(user);
    }
  }); 
     
  }

//used to change phone in userpage
  else if(req.query.act == 'newTel'){
  
  var newTel = req.query.product;
  
  User.findOneAndUpdate({ name: user.name }, {phone: newTel}, function(err, user) {
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
      //console.log("new users name " + user.name);
      res.json(user);
    }
  }); 
     
  }  

//used to change email in user page
  else if(req.query.act == 'newMail'){
  
  var newMail = req.query.product;
  
  User.findOneAndUpdate({ name: user.name }, {email: newMail}, function(err, user) {
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
      //console.log("new users name " + user.name);
      res.json(user);
    }
  }); 
     
  } 

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
