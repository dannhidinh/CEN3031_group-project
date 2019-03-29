angular.module('users').controller('ListingsController', ['$scope', 'Users',
  function($scope, Users) {
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    //$scope.currentUser = undefined;
    $scope.detailedInfo = undefined;

    $scope.test = function(){
      console.log($scope.currentUser);
    }


    $scope.loggedIn = function(testName, testPass){
      //console.log($scope.users.length);
        //var testPass = '2502';
      //var hasher = function(password){
        var hash = 0, i, chr;
        if (testPass.length === 0) return hash;
        for (i = 0; i < testPass.length; i++) {
          chr   = testPass.charCodeAt(i);
            hash  = ((hash << 6) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }

          //return hash;    

      //}
      //console.log(hash)
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
        if($scope.users[i].name === testName && $scope.users[i].password === hash){
          $scope.currentUser = $scope.users[i];
          break;
        }
      }
      console.log($scope.currentUser);
     //console.log($scope.currentUser.orderHist[0].transaction.getMonth());
    };

    $scope.addListing = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	    */
      var testPass = $scope.newUser.password;
      console.log(testPass);
        var hash = 0, i, chr;
        if (testPass.length === 0) return hash;
        for (i = 0; i < testPass.length; i++) {
          chr   = testPass.charCodeAt(i);
            hash  = ((hash << 6) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
          }
          $scope.newUser.password = hash;

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

    Users.create({name: $scope.newUser.name, password: $scope.newUser.password, email: $scope.newUser.email, phone: $scope.newUser.phone}).then(function(response){
      Users.getAll().then(function(response) {
          $scope.users = response.data;
      }, function(error) {
          console.log('Unable to retrieve listings:', error);
        });
      });    

      
    };

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
