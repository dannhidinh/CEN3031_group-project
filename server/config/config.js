//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password


module.exports = {
  db: {
    uri: 'mongodb://tflowers1:Turtle1@ds161804.mlab.com:61804/tyfadmin',
    //place the URI of your mongo database here.
  },
 port: 8080
 //  var port = process.env.PORT || 8080
  // for heroku
};

/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */
