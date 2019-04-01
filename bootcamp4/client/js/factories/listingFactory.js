angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/users');
    },
  
  create: function(user) {
    return $http.post('http://localhost:8080/api/users', user);
    }, 

    delete: function(id) {
      return $http.delete('http://localhost:8080/api/users/' + id);

     /**TODO
        return result of HTTP delete method
       */

    },

    updateCart: function(id){
      return $http.put('http://localhost:8080/api/users/' + id);
    }

    

  };

  return methods;
});
