var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a",
  locale: "auto",
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png'
});
var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  checkoutHandler.open({
    name: "Checkout",
    description: "Purchase Cart",
    token: handleToken
  });
});


function handleToken(token) {
  fetch("/charge", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(token)
  })
  .then(response => {
    if (!response.ok)
      throw response;
    return response.json();
  })
  .then(output => {
    console.log("Purchase succeeded:", output);
  })
  .catch(err => {
    console.log("Purchase failed:", err);
  })
}
