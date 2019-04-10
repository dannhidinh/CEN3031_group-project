
var mongoose = require('mongoose'), 

    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  /* your code here */
  name: String,

  authority: String, //change to string that directly says 'vendor', 'admin', 'customer', etc. ?

  email: String,
  phone: String,
  password: Number,
  orderHist: [ { Product : String, transaction : {type: Date}} ], //take out date, save id

  cart: [ { productC : String, quantity : Number, price : Number} ], //make array of cards to get transaction ID for them, 
  //save date for credit card, save total price
  //maybe make order history just a list of carts, not its own array.
  created_at: {type: Date},
  updated_at: {type: Date},
  
  


/*

//suggested schema for products
  item: String, //product name
  quantity: Number, //amount dropping off/amount left
  cost: Number, //price of single product
  descrption: String, //textbox with extra info on product, eg nutrition, vegan or not, etc.
  exp: {type: Date}, //maybe instead take in string in format mm/dd/yyyy?; 
  //other function could take in current date and convert to same format as string then compare
  
  vendor: String, //name of vendor providing product, can automatically take from currentUser.name when logged in vendor adds item
  venaddr: String, //address(s) of vendor, one string or seperate strings for street, city, zip, etc.; 
  //coordinates necessary? asked for in sign up process or after?
  
  bodname: String, //name of bodega product is dropped off at; maybe use numbers to designate them?
  bodaddr: String, //same questions as venaddr
//documents seperated by item, with vendor, bodega, etc. being extra info

//or
vendor: String, //name of vendor
venaddr: String, //same as above
bodname: String, //same as above
bodaddr: String, //same as above
stock: [ { item: String, quantity: Number, cost: Number, description: String, exp: {type: Date} } ]
//documents are seperated by vendor, each vendor has array of products

*/
  




  //bodname: { type: String, required: true},
  //bodaddress: { bodstreet: String, bodcity: String, bodstate: String, bodzip: String,
  //  bodlat: Number, bodlong: Number},
  //boddescr: String,
  //bodimage: String,
  //bodurl: String,
  //Vendor: [ { venname: String,
  //          venmobile: String,
  //          venaddr: {venstreet: String, vencity: String, venstate: String, venzip: String, venlat: Number, venlong: Number},
  //          item: [ { itemname: String, itemdesc: String, price: Number, itemexp: {type: Date}, itemcode: String}]
  //          } ],  
  //venName: String,
  //venAddr: String,
  //venPro: [{item: String, quant: Number, price: Number}]


});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
  /* your code here */

  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }

  next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);


/* Export the model to make it avaiable to other parts of your Node application */

module.exports = User;

