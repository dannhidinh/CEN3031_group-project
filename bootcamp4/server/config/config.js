//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  stripe: {
    // Stripe Card API variables
   keySecret: 'sk_test_5szqSVkKfzjcxPvMPFSBLMxB00iWi4Ie9i', // change in accord to client
   keyPublishable: 'pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a', // change in accord to client
   //clientId: 'YOUR_STRIPE_CLIENT_ID', // actually change this to the clientID when finished
   //authorizeUri: 'https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://stripe.com/connect/default/oauth/test&client_id=ca_EpyZyX9wMEyLf6NTj8stN0SUVB2KiNVg&state={STATE_VALUE}',
   //tokenUri: 'https://connect.stripe.com/oauth/token'
  },
  db: {
    uri: 'mongodb://spolk:shpjr2502@ds145019.mlab.com:45019/bodega_users', //place the URI of your mongo database here.
    buri: 'mongodb://tflowers1:Turtle1@ds161804.mlab.com:61804/tyfadmin',
  },
 port: 8080
 //  var port = process.env.PORT || 8080
  // for heroku
};
/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */
