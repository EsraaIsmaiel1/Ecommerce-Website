// Create an array to store the cart items
var cart = [];

// Function to add products to the cart
function addToCart(product) {
  cart.push(product);
  // Update the cart list in the HTML
  updateCartList();

  // Store the cart items in local storage
  storeCartItems();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  // Remove the item from the cart array based on the given index
  cart.splice(index, 1);

  // Update the cart list in the HTML
  updateCartList();

  // Store the cart items in local storage
  storeCartItems();
}

// Function to update the cart list in the HTML
function updateCartList() { 
  var cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  // Iterate over the cart array and create list items for each item
  for (var i = 0; i < cart.length; i++) {
  var item = cart[i];

    // Create a list item element
    var li = document.createElement("li");

    // Set the inner HTML of the list item to display the item details
    li.innerHTML = item.name + " - $" + item.price;

  // Create a remove button element
  var removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
  removeButton.onclick = (function (index) {
      return function () {
        removeFromCart(index);
      };
    })(i); // Using an immediately invoked function expression (IIFE) to capture the current index value

    // Append the remove button to the list item
    li.appendChild(removeButton);

    // Append the list item to the cart list
    cartList.appendChild(li);
  }

  // Calculate and display the total
  calculateTotal();
}

// Function to calculate the total cart value
function calculateTotal() {
  var total = 0;

  // Iterate over the cart items and sum up the prices
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }

  // Display the total in the HTML
  var totalElement = document.getElementById("total");
  if (totalElement) {
    totalElement.innerHTML = "Total: $" + total;
  }
}

// Function to store the cart items in local storage
function storeCartItems() {
  // Convert the cart array to a JSON string
  var cartItemsString = JSON.stringify(cart);

  // Store the JSON string in local storage
  localStorage.setItem("cartItems", cartItemsString);
}

// Function to retrieve the cart items from local storage
function retrieveCartItems() {
  // Retrieve the JSON string from local storage
  var cartItemsString = localStorage.getItem("cartItems");

  // Convert the JSON string to an array
  cart = JSON.parse(cartItemsString);

  // If the cart items are null or undefined, set the cart array to an empty array
  if (!cart) {
    cart = [];
  }

  // Update the cart list and total in the HTML
  updateCartList();
}

window.onload = retrieveCartItems;


