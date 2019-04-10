<<<<<<< HEAD
//Join Collections – use for Reorder if available
//MongoDB is not a relational db, but you can perform a left outer join using the $lookup stage.
// $lookup stage lets you specify a collection to join w/ the current collection, and which fields to match.
//Consider a "users" collection with past orders and a "bodega" collection with vendors and items:

//User.cart.items
//[
//  { _id: 1, item_id: 154, status: 1 }
//]
//Bodega.vendor.items
//[
//  { _id: 154, name: 'Chocolate Heaven' },
//  { _id: 155, name: 'Tasty Lemons' },
//  { _id: 156, name: 'Vanilla Dreams' }
//]
//
//Join the matching "items" document(s) to the "users" collection:
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('blisting').aggregate([
    { $lookup:
       {
         from: 'blisting',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});
//Save the code above in a file called "demo_mongodb_join.js" and run the file:
//Run "demo_mongodb_join.js"
//C:\Users\Your Name>node demo_mongodb_join.js
//Which will give you this result:
//[
//  { "_id": 1, "product_id": 154, "status": 1, "orderdetails": [
//    { "_id": 154, "name": "Chocolate Heaven" } ]
//  }
//]
//As you can see from the result above, the matching document from the products 
//collection is included in the orders collection as an array.

=======
//Join Collections – use for Reorder if available
//MongoDB is not a relational db, but you can perform a left outer join using the $lookup stage.
// $lookup stage lets you specify a collection to join w/ the current collection, and which fields to match.
//Consider a "users" collection with past orders and a "bodega" collection with vendors and items:

//User.cart.items
//[
//  { _id: 1, item_id: 154, status: 1 }
//]
//Bodega.vendor.items
//[
//  { _id: 154, name: 'Chocolate Heaven' },
//  { _id: 155, name: 'Tasty Lemons' },
//  { _id: 156, name: 'Vanilla Dreams' }
//]
//
//Join the matching "items" document(s) to the "users" collection:
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('blisting').aggregate([
    { $lookup:
       {
         from: 'blisting',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});
//Save the code above in a file called "demo_mongodb_join.js" and run the file:
//Run "demo_mongodb_join.js"
//C:\Users\Your Name>node demo_mongodb_join.js
//Which will give you this result:
//[
//  { "_id": 1, "product_id": 154, "status": 1, "orderdetails": [
//    { "_id": 154, "name": "Chocolate Heaven" } ]
//  }
//]
//As you can see from the result above, the matching document from the products 
//collection is included in the orders collection as an array.

>>>>>>> 8072be74574c39d6bb433acda32b50b74485dbf7
