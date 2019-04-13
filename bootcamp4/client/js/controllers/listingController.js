angular.module('users').controller('ListingsController', ['$scope', 'Users',  
  function($scope, Users) {
    //var msg = require('../factories/listingFactory.js');
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

//IGNORE, used for general testing

  $scope.test = function(){
      console.log(msg.test);

  };

  $scope.newName = function(name){
    console.log(name);
      if (name == undefined || name == ""){
        return;
      }

  for (var i = 0; i < $scope.users.length; i++) {
    if ($scope.users[i].name == name){
      $scope.newResult = "Name is already in use";     
      return;
    }
  }

      Users.update($scope.currentUser._id, 'newName', 0, 
        name).then(function(response){
      Users.getAll().then(function(response) {
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }
        //console.log($scope.currentUser);
        if ($scope.currentUser == null) {
          $scope.result = "Incorrect Username or Password";
        }
        else{
          $scope.result = "";
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;
          //console.log(curr);
          console.log($scope.currentUser.name);
          // Store
          sessionStorage.setItem("current", JSON.stringify(curr));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

        //$scope.finalPrice();

      }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }); 
  }

  $scope.newTel = function(tel){
      console.log(tel);
      if (tel == undefined || tel == ""){
        return;
      }
      Users.update($scope.currentUser._id, 'newTel', 0, 
        tel).then(function(response){
      Users.getAll().then(function(response) {
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }
        //console.log($scope.currentUser);
        if ($scope.currentUser == null) {
          $scope.result = "Incorrect Username or Password";
        }
        else{
          $scope.result = "";
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;
          //console.log(curr);
          //console.log($scope.currentUser.name);
          // Store
          sessionStorage.setItem("current", JSON.stringify(curr));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

        //$scope.finalPrice();

      }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      });     
  }

  $scope.newMail = function(newMail){
    if (newMail == undefined || newMail == ""){
        return;
    }
  for (var i = 0; i < $scope.users.length; i++) {
    if ($scope.users[i].email == newMail){
      $scope.newResult = "Email is already in use";      
      return;
    }

  }
      Users.update($scope.currentUser._id, 'newMail', 0, 
        newMail).then(function(response){
      Users.getAll().then(function(response) {
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }
        //console.log($scope.currentUser);
        if ($scope.currentUser == null) {
          $scope.result = "Incorrect Username or Password";
        }
        else{
          $scope.result = "";
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;
          //console.log(curr);
          //console.log($scope.currentUser.name);
          // Store
          sessionStorage.setItem("current", JSON.stringify(curr));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

        //$scope.finalPrice();

      }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      });    

  }

//calculates price amounts when button is pressed
    $scope.finalPrice = function(){
      
      var amount = 0;
      for (var i = 0; i < $scope.currentUser.cart.length; i++) {
        
        amount += $scope.currentUser.cart[i].price * $scope.currentUser.cart[i].quantity;
      }
      $scope.before = amount.toFixed(2);

      var uftax = amount*.06;
      $scope.tax = uftax.toFixed(2);

      amount = amount + uftax;
      $scope.final = amount.toFixed(2);
          
      
      // STRIPE - checkout form
      var checkoutHandler = StripeCheckout.configure({
        key: "pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a",
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: "auto"
      });
      var button = document.getElementById("buttonCheckout");
      button.addEventListener("click", function(ev) {
        checkoutHandler.open({
          name: "Checkout",
          description: "Purchase Cart",
          amount: ($scope.final)*100,
          token: handleToken
        });
        ev.preventDefault();
      });
      function handleToken(token) {
        fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(token)
        })
        .then(output => {
          if (output.status === "succeeded")
            document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
        })
      }
      
    }

//carries user between htmls
  window.addEventListener('DOMContentLoaded', (event) => {


      if (typeof(Storage) !== "undefined") {
          // Retrieve
          var isNew = JSON.parse(sessionStorage.getItem("checksIf"));
          var newInfo = JSON.parse(sessionStorage.getItem("info"));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

//logs in newly sign-uped user
      if (isNew == 'yes') {
        console.log(newInfo.password);
            Users.getAll().then(function(response) {
            $scope.users = response.data;
            $scope.loggedIn(newInfo.name, newInfo.password);
          }, function(error) {
            console.log('Unable to retrieve listings:', error);
          });
        
        isNew = 'no';
        sessionStorage.setItem("checksIf", JSON.stringify(isNew));
      }


      if (typeof(Storage) !== "undefined") {
          // Retrieve
          $scope.currentUser = JSON.parse(sessionStorage.getItem("current"));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
/*
      if (isNew === 'yes') {
        if (typeof(Storage) !== "undefined") {
          console.log("logs user in");
          // Retrieve
          $scope.currentUser = JSON.parse(sessionStorage.getItem("current"));
        } else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
      }        
*/
//updates cart price dynamically
        $scope.finalPrice();
  });

  $scope.signOut = function(){
    $scope.currentUser = undefined;
    sessionStorage.setItem("current", null);
    console.log(sessionStorage.getItem("current"));
    $scope.result = "";
  }


    $scope.loggedIn = function(testName, testPass){
console.log("used");


//console.log($scope.users[2].name);
        if ($scope.currentUser != null){
          $scope.result = "Sign out current user";
          return;
        }

        var hash = 0, i, chr;
        if (testPass.length === 0) return hash;
        for (i = 0; i < testPass.length; i++) {
          chr   = testPass.charCodeAt(i);
            hash  = ((hash << 6) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }

//cant get mongoose methods to work, leaving this here to try again later
      /*
      $scope.users.findOne({ name: testName, password: hash }, function (err, user) {
        if (err) return handleError(err);

        if (user != null){
          console.log(user.name + " Logged in!\n");
        }
        else
          console.log("Email and/or Password may be wrong. Sign up if you don't have an account.");
      });      
      */

      for (var i = 0; i < $scope.users.length; i++) {
        if(($scope.users[i].name === testName && $scope.users[i].password === hash) || 
          ($scope.users[i].email === testName && $scope.users[i].password === hash)){
          $scope.currentUser = $scope.users[i];
          break;
        }
      }

      if ($scope.currentUser == null) {
        $scope.result = "Incorrect Username/Email or Password";
      }
      else{
        $scope.result = "";
      }

      if (typeof(Storage) !== "undefined") {
        var curr = $scope.currentUser;

        // Store
        sessionStorage.setItem("current", JSON.stringify(curr));
      } 
      else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      }

    };
//adds new customer user; authority = 0
    $scope.addListing = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	    */
//resets upResults between sign attempts
      $scope.upResult = "";

//checks if all fields got data
      if ($scope.newUser.name == undefined || $scope.newUser.password == undefined || 
        $scope.newUser.email == undefined || $scope.newUser.phone == undefined){
          
          $scope.upResult = "Fill in all fields";
        $scope.newUser.name = undefined;
        $scope.newUser.password = undefined;
        $scope.newUser.email = undefined;
        $scope.newUser.phone = undefined;
        return;
      }


//checks if name or email is already in database (maybe dont check name because people share names, 
//or treat as unique username)
  for (var i = 0; i < $scope.users.length; i++) {
    if ($scope.users[i].name == $scope.newUser.name){
      $scope.upResult = "Name is already in use";
        $scope.newUser.name = undefined;
        $scope.newUser.password = undefined;
        $scope.newUser.email = undefined;
        $scope.newUser.phone = undefined;      
      return;
    }
    else if ($scope.users[i].email == $scope.newUser.email){
      $scope.upResult = "Email is already in use";
        $scope.newUser.name = undefined;
        $scope.newUser.password = undefined;
        $scope.newUser.email = undefined;
        $scope.newUser.phone = undefined;      
      return;
    }

  }


//converts incoming password to hashed number
      var testPass = $scope.newUser.password;
      //console.log(testPass);
        var hash = 0, i, chr;
        if (testPass.length === 0) return hash;
        for (i = 0; i < testPass.length; i++) {
          chr   = testPass.charCodeAt(i);
            hash  = ((hash << 6) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }
          $scope.newUser.password = hash;

//original add code from Nhi, didn't seem to work
/*
      $scope.save = function(error) {
        //console.log("used");
        if(error) {
          throw error;
          console.log('Unable to add listing');
        }
      };
      console.log($scope.newUser);
      $scope.users.push($scope.newUser);
      console.log($scope.users[3]);
      $scope.newUser = {};
*/


console.log(testPass);
//WHERE USER IS ACTUALLY ADDED DONT REMOVE

    Users.create({name: $scope.newUser.name, password: $scope.newUser.password, 
      email: $scope.newUser.email, phone: $scope.newUser.phone, authority: 'member'}).then(function(response){
      Users.getAll().then(function(response) {
          $scope.users = response.data;
          //console.log("here");
          //$scope.loggedIn($scope.newUser.name, testPass);
      }, function(error) {
          console.log('Unable to add user', error);
        });
      });    
     

      if (typeof(Storage) !== "undefined") {
        var isNew = 'yes';
        $scope.newUser.password = testPass;
        var newInfo = $scope.newUser;
//console.log("stores yes and info");
        // Store
        sessionStorage.setItem("checksIf", JSON.stringify(isNew));
        sessionStorage.setItem("info", JSON.stringify(newInfo));
      } 
      else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      }
      
    //$scope.loggedIn($scope.newUser.name, testPass);
  



   document.location.reload(true);


//resets newUser values between attempts
    //$scope.newUser.name = undefined;
    //$scope.newUser.password = undefined;
    //$scope.newUser.email = undefined;
    //$scope.newUser.phone = undefined;


    };
    

//adds to cart and refreshes currentUser data
    $scope.addToCart = function(){

console.log($scope.newItem.productC);
console.log($scope.newItem.quantity);
console.log($scope.newItem.price);

      Users.update($scope.currentUser._id, 'add', 0, 
        $scope.newItem.productC, $scope.newItem.quantity, $scope.newItem.price).then(function(response){
      Users.getAll().then(function(response) {
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }
        //console.log($scope.currentUser);
        if ($scope.currentUser == null) {
          $scope.result = "Incorrect Username or Password";
        }
        else{
          $scope.result = "";
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;
          //console.log(curr);

          // Store
          sessionStorage.setItem("current", JSON.stringify(curr));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

        $scope.finalPrice();

      }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }); 

    }

    $scope.removeFromCart = function(itemID){
      //console.log($scope.currentUser._id);
      //console.log(itemID);
      //this.currentUser.cart.splice(itemID,1);
      console.log("remove used");
      Users.update($scope.currentUser._id, 'delete', itemID).then(function(response){
      Users.getAll().then(function(response) {
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }
        //console.log($scope.currentUser);
        if ($scope.currentUser == null) {
          $scope.result = "Incorrect Username or Password";
        }
        else{
          $scope.result = "";
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;
          //console.log(curr);

          // Store
          sessionStorage.setItem("current", JSON.stringify(curr));
        } 
        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }   

        $scope.finalPrice();       
      }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      }); 
    }

    $scope.deleteListing = function(id) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
      */
      $scope.delete = function(error, id) {
        if(error) {
          throw error;
          console.log('Unable to delete listing');
        }
      };
      this.users.splice(id, 1);
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.users[index];
    };
  }
]);
