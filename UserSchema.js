var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  /* your code here */
  name: String,
  email: String,
  phone: String,
  password: Number,
  orderHist: [ { Product : String, transaction : {type: Date}} ],
  cart: [ { productC : String, price : Number} ],
  created_at: {type: Date},
  updated_at: {type: Date}


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