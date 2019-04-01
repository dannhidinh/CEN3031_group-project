var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a",
  locale: "auto"
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
  .then(output => {
    if (output.status === "succeeded")
      document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
  })
}
