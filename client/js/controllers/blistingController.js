angular.module('blistings').controller('bListingsController', ['$scope', 'bListings',
  function($scope, bListings) {

    /* Get all the listings, then bind it to the scope */
    bListings.getAll().then(function(response) {

      $scope.blistings = response.data;

//    }, function(error) {
//      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;




    $scope.addListing = function() {

	  /*Save the article using the bListings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	    */
        if($scope.entry !== undefined) {


//      $scope.save = function(error) {
//        if(error) {
//          throw error;
//          console.log('Unable to add blisting');
//        }
//      };
      $scope.blistings.push($scope.form);
            $scope.form = {};
            $scope.show = !$scope.show;
        }
        $scope.entry = undefined;
    };

    $scope.deleteListing = function(id) {
	   /**
        Delete the article using the bListings factory. If the removal is successful,
		navigate back to 'blisting.list'. Otherwise, display the error.
      */

       bListings.delete($scope.blistings[id]._id);
        $scope.blistings.splice(id,1);
        $scope.detailedInfo = undefined;

//      $scope.delete = function(error, id) {
//        if(error) {
//          throw error;
//          console.log('Unable to delete blisting');
//        }
//      };
//      this.blistings.splice(id, 1);
    };

    $scope.showDetails = function(id) {
//    angular.element('#moreInfo').collapse("show");
      $scope.detailedInfo = $scope.blistings[id];
    };
        $scope.onClick = function() {
            $scope.show = !$scope.show;
        };

//    $scope.showDetails = function(index) {
//      $scope.detailedInfo = $scope.blistings[index];
//    };
  }
]);
