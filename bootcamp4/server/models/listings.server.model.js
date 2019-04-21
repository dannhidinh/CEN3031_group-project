
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

  cart: [ { itemID: String, productC : String, quantity : Number, price : Number, trans: String} ], //make array of cards to get transaction ID for them, 
  orderHist: [ {total: String, cart: [ { itemID: String, productC : String, quantity : Number, price : Number, trans: String} ]} ],
  //save date for credit card, save total price
  //maybe make order history just a list of carts, not its own array.
  created_at: {type: Date},
  updated_at: {type: Date},
  

    itemname: {type: String},
    itemdesc: String,
    itemprice: Number,
    itemexp: {type: Date},
    itemqty: Number,
    itemcode: String,
    itempic: String,
    ibodnum: {type: Number},
    ivenuser: {type: String},

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