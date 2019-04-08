/*
var app = angular.module("directoryApp", []);
app.controller("ListingsController", ListingsController);
function ListingsController($scope) {
  $scope.price = 000;
}
setTimeout(function(){
  var price = document.getElementById("calcRow").value;
  var price = $("#calcRow").finalPrice();
}, 1000); */

var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a",
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: "auto"
});

var button = document.getElementById("buttonCheckout");

button.addEventListener("click", function(ev) {
  var amount = $("#finalPayment").val()*100;
  checkoutHandler.open({
    name: "Checkout",
    description: "Purchase Cart",
    amount: final, // get amount from listingController
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
