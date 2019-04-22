//var Data = require('../models/listings.server.model.js');

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

  $scope.test = function(id, name, qty, cost){
      console.log(id);
      console.log(name);
      console.log(qty);
      console.log(cost);


  };

//adds product from homepage to currentUser's cart

  $scope.addProduct = function(){

console.log($scope.newItem.itemname);
console.log($scope.newItem.itemqty);
console.log($scope.newItem.itemprice);
      console.log($scope.newItem.itempic);
      console.log($scope.newItem.ibodnum);
      console.log($scope.newItem.ivenuser);
      Users.create({itemname: $scope.newItem.itemname, itemdesc: $scope.newItem.itemdesc, itemqty: $scope.newItem.itemqty,
          itemexp: $scope.newItem.itemexp, itemcode: $scope.newItem.itemcode, itempic: $scope.newItem.itempic,
          ibodnum: $scope.newItem.ibodnum, ivenuser: $scope.currentUser.name,
          itemprice: $scope.newItem.itemprice, authority: 'product'}).then(function(response){


      Users.getAll().then(function(response) {
          $scope.users = response.data;
          //console.log("here");
          //$scope.loggedIn($scope.newUser.name, testPass);
      }, function(error) {
          console.log('Unable to add user', error);
        });
      });
  }

//method to change currentUser's username; also checks if new name is already in use, cancels update if it is
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


//Passes the currentUser's id, action name, followed by values or variables to pass. 
//(the '0' is to take up the unused ItemID parameter in listingFactory)
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
//this if else block controls passing of user between html pages
//updates sessionStorage with changed currentUser
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

    $scope.newItemName = function(iname){
        console.log(iname);
        if (iname == undefined || iname == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemName', 0,
            iname).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newItemDesc = function(idesc){
        console.log(idesc);
        if (idesc == undefined || idesc == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemDesc', 0,
            idesc).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newItemPrice = function(iprice){
        console.log(iprice);
        if (iprice == undefined || iprice == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemPrice', 0,
            iprice).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newItemExp = function(iexp){
        console.log(iexp);
        if (iexp == undefined || iexp == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemExp', 0,
            iexp).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newItemQty = function(iqty){
        console.log(iqty);
        if (iqty == undefined || iqty == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemQty', 0,
            iqty).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newItemCode = function(icode){
        console.log(icode);
        if (icode == undefined || icode == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemCode', 0,
            icode).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newItemPic = function(ipic){
        console.log(ipic);
        if (ipic == undefined || ipic == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newItemPic', 0,
            ipic).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newIBodNum = function(ibnum){
        console.log(ibnum);
        if (ibnum == undefined || ibnum == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newIBodNum', 0,
            ibnum).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
            }, function(error) {
                console.log('Unable to retrieve listings:', error);
            });
        });
    }

    $scope.newIVenUser = function(iven){
        console.log(iven);
        if (iven == undefined || iven == ""){
            return;
        }
        Users.update($scope.currentUser._id, 'newIVenUser', 0,
            iven).then(function(response){
            Users.getAll().then(function(response) {
                $scope.users = response.data;
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

//calculates price dynamically when item is added or removed to cart
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

//carries user between htmls; pulls currentUser data out of sessionStorage on page load
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

//updates cart price dynamically
        $scope.finalPrice();
  });

//effectively signs out user by making currentUser undefined and emptying sessionStorage
  $scope.signOut = function(){
    $scope.currentUser = undefined;
    sessionStorage.setItem("current", null);
    console.log(sessionStorage.getItem("current"));
    $scope.result = "";
  }

//logs in user by checking name/email and password
    $scope.loggedIn = function(testName, testPass){
console.log("used");

//prevents user from loggin in if another user is already logged in
        if ($scope.currentUser != null){
          $scope.result = "Sign out current user";
          return;
        }

//hashes testPass in order to compare with pre-hashed passwords in database
        var hash = 0, i, chr;
        if (testPass.length === 0) return hash;
        for (i = 0; i < testPass.length; i++) {
          chr   = testPass.charCodeAt(i);
            hash  = ((hash << 6) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }

//looks for user that has a matching name and password, or email and password and sets them as currentUser
      for (var i = 0; i < $scope.users.length; i++) {

        if(($scope.users[i].name === testName && $scope.users[i].password === hash) || 

          ($scope.users[i].email === testName && $scope.users[i].password === hash)){
          $scope.currentUser = $scope.users[i];
          break;
        }
      }

//error response if no users matched name/email and password
      if ($scope.currentUser == null) {
        $scope.result = "Incorrect Username/Email or Password";
      }
      else{
        $scope.result = "";
      }

//stores currentUser in sessionStorage to be carried between pages
      if (typeof(Storage) !== "undefined") {
        var curr = $scope.currentUser;

        // Store
        sessionStorage.setItem("current", JSON.stringify(curr));

      } 

      else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      }

    };

//adds new permanent-customer user; authority = 'member'; addListing name is holdover from school assignment
    $scope.addListing = function() {

//resets upResults between sign attempts
      $scope.upResult = "";

//checks if all fields got data

      if ($scope.newUser.name == undefined || $scope.newUser.password == undefined || 
        $scope.newUser.email == undefined || $scope.newUser.phone == undefined || $scope.newUser.vpassword == undefined){
          

        $scope.upResult = "Fill in all fields";
        //resets newUser between attempts

        $scope.newUser.name = undefined;
        $scope.newUser.password = undefined;
        $scope.newUser.vpassword = undefined;
        $scope.newUser.email = undefined;
        $scope.newUser.phone = undefined;
        return;
      }



//checks if name or email is already in database
      for (var i = 0; i < $scope.users.length; i++) {
        if ($scope.users[i].name == $scope.newUser.name){
          $scope.upResult = "User name is already in use";
          $scope.newUser.name = undefined;
          $scope.newUser.password = undefined;
          $scope.newUser.vpassword = undefined;
          $scope.newUser.email = undefined;
          $scope.newUser.phone = undefined;      
          return;
        }
        else if ($scope.users[i].email == $scope.newUser.email){
          $scope.upResult = "Email is already in use";
          $scope.newUser.name = undefined;
          $scope.newUser.password = undefined;
          $scope.newUser.vpassword = undefined;
          $scope.newUser.email = undefined;
          $scope.newUser.phone = undefined;      
          return;
        }


      }

//verifies password
  if ($scope.newUser.password != $scope.newUser.vpassword) {
    $scope.upResult = "Passwords did not match";
    return;
  }

//converts incoming password to hashed number
      var testPass = $scope.newUser.password;
        var hash = 0, i, chr;
        if (testPass.length === 0) return hash;
        for (i = 0; i < testPass.length; i++) {
          chr   = testPass.charCodeAt(i);
            hash  = ((hash << 6) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }
          $scope.newUser.password = hash;


//Where user is actually added

    Users.create({name: $scope.newUser.name, password: $scope.newUser.password, 

      email: $scope.newUser.email, phone: $scope.newUser.phone, authority: 'member'}).then(function(response){
      Users.getAll().then(function(response) {
          $scope.users = response.data;

      }, function(error) {
          console.log('Unable to add user', error);
        });

      });    
     
//logs user in after sucessful sign up
      if (typeof(Storage) !== "undefined") {
        var isNew = 'yes';
        $scope.newUser.password = testPass;
        var newInfo = $scope.newUser;

        // Store
        sessionStorage.setItem("checksIf", JSON.stringify(isNew));
        sessionStorage.setItem("info", JSON.stringify(newInfo));

      } 
      else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      }
      

//reloads page to trigger log in

   document.location.reload(true);

    };

//adds vendor user; authority = 'vendor'; used by admin to create vendor users
$scope.addVendor = function() {

//resets upResults between sign attempts
  $scope.upResult = "";

//checks if all fields got data
  if ($scope.newUser.name == undefined || $scope.newUser.password == undefined || 
    $scope.newUser.email == undefined || $scope.newUser.phone == undefined || $scope.newUser.vpassword == undefined){
      
    $scope.upResult = "Fill in all fields";
    $scope.newUser.name = undefined;
    $scope.newUser.password = undefined;
    $scope.newUser.vpassword = undefined;
    $scope.newUser.email = undefined;
    $scope.newUser.phone = undefined;
    return;
  }


//checks if name or email is already in database
  for (var i = 0; i < $scope.users.length; i++) {
    if ($scope.users[i].name == $scope.newUser.name){
      $scope.upResult = "Name is already in use";
      $scope.newUser.name = undefined;
      $scope.newUser.password = undefined;
      $scope.newUser.vpassword = undefined;
      $scope.newUser.email = undefined;
      $scope.newUser.phone = undefined;      
      return;
    }
    else if ($scope.users[i].email == $scope.newUser.email){
      $scope.upResult = "Email is already in use";
      $scope.newUser.name = undefined;
      $scope.newUser.password = undefined;
      $scope.newUser.vpassword = undefined;
      $scope.newUser.email = undefined;
      $scope.newUser.phone = undefined;      
      return;
    }

  }

  if ($scope.newUser.password != $scope.newUser.vpassword) {
    $scope.upResult = "Passwords did not match";
    return;
  }

//converts incoming password to hashed number
  var testPass = $scope.newUser.password;
  var hash = 0, i, chr;
  if (testPass.length === 0) return hash;
  for (i = 0; i < testPass.length; i++) {
    chr   = testPass.charCodeAt(i);
      hash  = ((hash << 6) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
  $scope.newUser.password = hash;

  Users.create({name: $scope.newUser.name, password: $scope.newUser.password, 
    email: $scope.newUser.email, phone: $scope.newUser.phone, authority: 'vendor'}).then(function(response){
    Users.getAll().then(function(response) {
        $scope.users = response.data;

    }, function(error) {
        console.log('Unable to add user', error);
      });
    });    

 document.location.reload(true);

  };
    


//adds to cart and refreshes currentUser data
    $scope.addToCart = function(id, name, qty, cost){


//Pass the specific id of the item gotten, name of item, qty wanted, and cost per item

      Users.update($scope.currentUser._id, 'add', id, 

        name, qty, cost).then(function(response){
      Users.getAll().then(function(response) {
//gets updated version of user from data base, puts it in currentUser and in sessionStorage
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;

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

//removes specific item from cart
    $scope.removeFromCart = function(itemID){

//passes currentUser's id in order to find right cart, 'delete' action to specify type of "update", and the ID of the item to be deleted
      Users.update($scope.currentUser._id, 'delete', itemID).then(function(response){
      Users.getAll().then(function(response) {
//gets updated version of user from data base, puts it in currentUser and in sessionStorage        
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;

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

//post-checkout database changes; puts cart in currentUser's order history, includes date of order, 
//reduces quanitity of products in the database by which and how many were gotten in the order
    $scope.toHist = function(){
  

  //gets date and puts it into mm/dd/yyyy format

      var date = new Date;
      date = date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();

//stores date in cart
      for (var i = 0; i < $scope.currentUser.cart.length; i++) {
        $scope.currentUser.cart[i].trans = date;
        console.log($scope.currentUser.cart[i].trans);
      }

//**test code to get latest transaction ID without making a new order; might get reworked as a "I forgot my order ID and need to see it again" button
      if ($scope.currentUser.cart.length == 0) {
        console.log("Cart is empty");
        console.log($scope.currentUser.orderHist[$scope.currentUser.orderHist.length - 1]._id);
        var cartID = $scope.currentUser.orderHist[$scope.currentUser.orderHist.length - 1]._id;
        $scope.transID = cartID.substr(18,6).toUpperCase();
        return;
      }

//passes currentUser's id, 'toHist' action, the final price of the order, and the current cart; 
//the 0's are to fill the parameters to get $scope.currentUser.cart in the right parameter spot (needed to be passed as an array, see listingFactory)
//$scope.final didn't necassarily need to be where it is but that variable in listingFactory is named 'cost' so I thought... 
//I'd put it there for some consistency
      Users.update($scope.currentUser._id, 'toHist', 0, 0, 0, $scope.final, $scope.currentUser.cart).then(function(response){
      Users.getAll().then(function(response) {
//gets updated user from database, stores it in currentUser and sessionStorage
        $scope.users = response.data;
        for (var i = 0; i < $scope.users.length; i++) {
          if($scope.users[i].name === $scope.currentUser.name){
            $scope.currentUser = $scope.users[i];
            break;
          }
        }

        if (typeof(Storage) !== "undefined") {
          var curr = $scope.currentUser;

          // Store
          sessionStorage.setItem("current", JSON.stringify(curr));

        } 

        else {
          document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }

//generates order ID by getting mongoose generated ._id from the latest cart put in orderHist and saving the last six digits
        var cartID = $scope.currentUser.orderHist[$scope.currentUser.orderHist.length - 1]._id;
        $scope.transID = cartID.substr(18, 6).toUpperCase();

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

    // conditions for admin page views
    $scope.isMember = function(index) {
      if($scope.users[index].authority == "member")
        return true;
      else
        return false;
    };
    $scope.isVendor = function(index) {
      if($scope.users[index].authority == "vendor")
        return true;
      else
        return false;
    };
    $scope.isProduct = function(index) {
      if($scope.users[index].authority == "product")
        return true;
      else
        return false;
    };

    // login page - for having a trigger thing to tell user about password requirements
    // from www.java2s.com
    $(window).load(function() {
      $('input[type=password]').popover({trigger:'focus'});
    });

  }
]);
