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

    },

// Cart: actions are defined in listing.server.controller. Parameters are the variables and matching fields from listingcontroller
    //up to four fields in a row of data (document) can be updated
    //variables are named this way because it was originally created to manipulate carts, ended up being used for updating anything
    //action is to designate what is updated and how; rest of the parameter can be though of as general variables (except cart which only takes arrays)
    update: function(id, action, itemID, newItem, newQuant, newPrice, array){
      return $http.put('http://localhost:8080/api/users/' + id, {}, { params: { act: action, item: itemID, 
        product: newItem, amount: newQuant, cost: newPrice, cart: [array] } });

    },    

  };

  return methods;
});

//module.exports = "hello from factory";
