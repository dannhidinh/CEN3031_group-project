<<<<<<< HEAD
/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* This Schema encompasses the inventory within the vendor at a bodega*/
var blistingSchema = new Schema({
     itemname: {type: String, required: true},
     itemdesc: String,
    itemprice: Number,
      itemexp: {type: Date},
      itemqty: Number,
     itemcode: String,
      itempic: String,
      ibodnum: {type: Number, required: true},
     ivenuser: {type: String, required: true},
   updated_at: Date,
   created_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
blistingSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at) {
    this.created_at = currentTime;
  }
  next();
});


/* Use your schema to instantiate a Mongoose model */
var bListing = mongoose.model('bListing', blistingSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = bListing;
=======
/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* This Schema encompasses the inventory within the vendor within the Bodega. Each 1 to many */
var blistingSchema = new Schema({
 bodname: { type: String, required: true},
 bodaddress: { bodstreet: String, bodcity: String, bodstate: String, bodzip: String,
    bodlat: Number, bodlong: Number},
 boddescr: String,
 bodimage: String,
 bodurl: String,
 Vendor: [ { venname: String,
            venmobile: String,
            venaddr: {venstreet: String, vencity: String, venstate: String, venzip: String, venlat: Number, venlong: Number},
            item: [ { itemname: String, itemdesc: String, price: Number, itemexp: {type: Date}, itemcode: String}]
            } ],
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
blistingSchema.pre('save', function(next) {
  var currentTime = new Date();
  this.updated_at = currentTime;
  if(!this.created_at) {
    this.created_at = currentTime;
  }

//  now = new Date();
//  this.updated_at = now;
//  if ( !this.created_at ) {
//    this.created_at = now;
//  }

  next();
});


/* Use your schema to instantiate a Mongoose model */
var bListing = mongoose.model('bListing', blistingSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = bListing;
>>>>>>> 8072be74574c39d6bb433acda32b50b74485dbf7
