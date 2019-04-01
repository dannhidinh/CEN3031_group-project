//This file holds any configuration variables we may need 
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://spolk:shpjr2502@ds145019.mlab.com:45019/bodega_users', //place the URI of your mongo database here.
    buri: 'mongodb://tflowers1:Turtle1@ds161804.mlab.com:61804/tyfadmin',
  },
  port: 8080
};
/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */
