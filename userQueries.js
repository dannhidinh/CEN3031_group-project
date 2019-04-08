var fs = require('fs'),
    mongoose = require('mongoose'), 
    User = require('./UserSchema.js'), 
    config = require('./userConfig');
    
mongoose.connect(config.db.uri, { useNewUrlParser: true });

//Create
var upload = function() {

//	var testPass1 = "2502";
	/*
	var hash1 = 0, i, chr;
	var hash2 = 0, i, chr;
	if (testPass1.length === 0) return hash1;
	for (i = 0; i < testPass1.length; i++) {
		chr   = testPass1.charCodeAt(i);
    	hash1  = ((hash1 << 5) - hash1) + chr;
    	hash1 |= 0; // Convert to 32bit integer
  	}

  	var testPass2 = "belch";
	if (testPass2.length === 0) return hash2;
	for (i = 0; i < testPass2.length; i++) {
		chr   = testPass2.charCodeAt(i);
    	hash2  = ((hash2 << 5) - hash2) + chr;
    	hash2 |= 0; // Convert to 32bit integer
  	}
*/

	//var testP = "2502";
	//var testP2 = "belch";
	var hash1 = hasher("2502");
	var hash2 = hasher("belch");

	var user = new User ({
		name: "Steven",
		email: "@test",
		phone: "407-...",
		password: hash1,
  		orderHist: [
  			{
				Product: "salad",
				transaction: new Date()
			},
			{
				Product: "food",
				transaction: new Date()
			},
		],
		cart: [
			{
				productC: "burger",
				price: 5.99
			},
			{
				productC: "sub",
				price: 4.99
			},
		]
	});
	user.save((err,data) => {
      if(err) return console.error(err);
    });

 	var user = new User ({
		name: "Bob",
		email: "@belcher",
		phone: "808-...",
		password: hash2,
  		orderHist: [
  			{
				Product: "meat",
				transaction: new Date()
			},
			{
				Product: "lettuce",
				transaction: new Date()
			},
		],
		cart: [
			{
				productC: "fries",
				price: 1.99
			},
			{
				productC: "chips",
				price: 2.99
			},
		]
	});
	user.save((err,data) => {
      if(err) return console.error(err);
    });   

	console.log("test users added");

};

//Delete
var removeUser = function() {

  User.findOneAndDelete({ name: 'Steven' }, function (err, user) {
    if (err) return handleError(err);
  
    //console.log(user);
  });

 };

//Update
var updateUser = function() {

  User.update({ name: 'Bob' }, { email: "@linda" , updated_at: new Date()}, function (err, user) {
    if (err) return handleError(err);
  
  });

  //Listing.findOne({ code: 'PHL' }, function (err, listing) {
  //  if (err) return handleError(err);
  
  //  console.log(listing);
  //});

};

var newHist = function(){

  User.findOneAndUpdate({ name: 'Bob' }, { $addToSet: {orderHist: {Product: "onions", transaction: new Date()}} }, function (err, user) {
    if (err) return handleError(err);
  
  	//console.log(user.orderHist[0].Product);
  });

};

var newCart = function() {

  User.findOneAndUpdate({ name: 'Bob' }, { $addToSet: {cart: {productC: "onions", price: 3.99}} }, function (err, user) {
    if (err) return handleError(err);
  
  	//console.log(user.orderHist[0].Product);
  });

};

var finalPrice = function() {

	//var final = 0;
  User.findOne({name: 'Steven'}, function (err, user) {
    if (err) return handleError(err);
  	var final = 0;
  	for (var i = 0; i < user.cart.length; i++) {
  		//console.log(user.cart[i].price);
  		final += user.cart[i].price;
  	}
	console.log(final);
    //console.log(user.cart.length);
  });

	
	//while()

}


//Read
var retrieveAllUsers = function() {

  User.find(function (err, user) {
    if (err) return handleError(err);
  
    console.log(user);
  });

  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
};


var loginUser = function() {

//	var testPass = "2502";
	/*
	var hash = 0, i, chr;
	if (testPass.length === 0) return hash;
	for (i = 0; i < testPass.length; i++) {
		chr   = testPass.charCodeAt(i);
    	hash  = ((hash << 5) - hash) + chr;
    	hash |= 0; // Convert to 32bit integer
  	}	
*/
	var testEmail = "@test"
	var hash = hasher("2502");

    User.findOne({ email: testEmail, password: hash }, function (err, user) {
      if (err) return handleError(err);

      if (user != null){
      	console.log(user.name + " Logged in!");
      	//console.log(user.orderHist[2]);
      	//console.log(user.orderHist.Product);
      }
  	  else
  	  	console.log("Email and/or Password may be wrong. Sign up if you don't have an account.");
    });

};

var testFunction = function() {

/*
	var test = "belch";
	console.log(test);
	var hash = 0, i, chr;
	if (test.length === 0) return hash;
	for (i = 0; i < test.length; i++) {
		chr   = test.charCodeAt(i);
    	hash  = ((hash << 5) - hash) + chr;
    	hash |= 0; // Convert to 32bit integer
  	}	

  	console.log(hash);
  	*/

  	//var list = "first";
  	//console.log(list);
  	//var newThing = "second";
  	//list += "\n" + newThing;
  	//console.log(list);

		

};

var hasher = function(password){
	var hash = 0, i, chr;
	if (password.length === 0) return hash;
	for (i = 0; i < password.length; i++) {
		chr   = password.charCodeAt(i);
    	hash  = ((hash << 6) - hash) + chr;
    	hash |= 0; // Convert to 32bit integer
  	}

  	return hash;		

}
//upload();
//removeUser();
//updateUser();
//newHist();
//newCart();
//finalPrice();
//retrieveAllUsers();
loginUser();
//testFunction();