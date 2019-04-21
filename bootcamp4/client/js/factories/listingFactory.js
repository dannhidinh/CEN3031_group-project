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


// Cart: actions are defined in listing.server.controller. Parameters are the variables and matching fields from listingcontroller
    //up to four fields in a row of data (document) can be updated
    update: function(id, action, itemID, newItem, newQuant, newPrice, array){
      return $http.put('http://localhost:8080/api/users/' + id, {}, { params: { act: action, item: itemID, 
        product: newItem, amount: newQuant, cost: newPrice, cart: [array] } });

    },

    //removeCart: function(id, itemID){
    //  return $http.put('http://localhost:8080/api/users/' + id, {}, { params: { item: itemID } });
    //}

    

  };

  return methods;
});

//module.exports = "hello from factory";
