angular.module('blistings')
.controller('bListingsController', ['$scope', 'bListings',
  function($scope, bListings) {

    /* Get all the listings, then bind it to the scope */
    bListings.getAll().then(function(response) {
      $scope.blistings = response.data;
      console.log(response.data);
    });

    $scope.detailedInfo = undefined;

    $scope.addbListing = function() {
	  /*Save the article using the bListings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	    */
        if($scope.entry !== undefined) {
      $scope.blistings.push($scope.form);
            $scope.form = {};
            $scope.show = !$scope.show;
        }
        $scope.entry = undefined;
    };

    $scope.deletebListing = function(id) {
	   /**
        Delete the article using the bListings factory. If the removal is successful,
		navigate back to 'blisting.list'. Otherwise, display the error.
      */

       bListings.delete($scope.blistings[id]._id);
        $scope.blistings.splice(id,1);
        $scope.detailedInfo = undefined;
    };
    $scope.showDetails = function(id) {
      $scope.detailedInfo = $scope.blistings[id];
    };
    $scope.onClick = function() {
            $scope.show = !$scope.show;
        };
  }
]);


