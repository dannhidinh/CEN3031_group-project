var handler = StripeCheckout.configure({
  key: 'pk_test_iTugFek1yZMY2i7fqgtKnauz00RFrdnY7a',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  }
});

// connect this to some backend stuff
document.getElementById('customButton').addEventListener('click', function(e) {
  // Open Checkout with further options:
  handler.open({
    name: 'Purchase',
    description: 'Checkout Cart',
    amount: 2000 //change, connect to database or smth
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});
