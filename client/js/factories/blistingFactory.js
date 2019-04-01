//for heroku, delete http://localhost:8080
angular.module('blistings', []).factory('bListings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/blistings');
    },

	create: function(blisting) {
	  return $http.post('http://localhost:8080/api/blistings', blisting);
    },

    delete: function(id) {
	   /**
        return result of HTTP delete method
       */
      return $http.delete('http://localhost:8080/api/blistings', id);
    },

      read: function (id) {
          return $http.get('http://localhost:8080/api/blistings/' + id);
      },

      update: function (id, blisting) {
          return $http.put('http://localhost:8080/api/blistings/' + id, blisting);
      },
  };

  return methods;
});
