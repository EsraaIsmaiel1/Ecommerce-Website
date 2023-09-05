

function validateForm() {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var message = document.getElementById("message").value;
{
  if (username.length < 3 ) {
    document.getElementById("namelocation").innerHTML= " Please enter your name"
  }
  else{
    document.getElementById("namelocation").style.display= "none"
  }
}

 { if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      document.getElementById("emaillocation").innerHTML= "Email is invalid";
  }
  else{
    document.getElementById("emaillocation").style.display= "none"
  }
}

 { if (phoneNumber.length < 8) {
    document.getElementById("numberlocation").innerHTML=  "Phone Number must be at least 8 characters long";
  }
  else{
    document.getElementById("numberlocation").style.display= "none"
  }
}
{
  if (!message){
    document.getElementById("messagelocation").innerHTML=  " Please enter your message";
  }
  else{
    document.getElementById("messagelocation").style.display= "none"
  }
}
}


$(document).ready(function () {

  $(".filter-button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {

      $('.filter').show('1000');
    } else {

      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');

    }


    if ($(".filter-button").removeClass("active")) {
      $(this).removeClass("active");
    }
    $(this).addClass("active");

  });

});

var shoppingCart = (function () {
	// =============================
	// Private methods and propeties
	// =============================
	cart = [];

	// Constructor
	function Item(name, price, count) {
		this.name = name;
		this.price = price;
		this.count = count;
	}

	// Save cart
	function saveCart() {
		localStorage.setItem('shoppingCart', JSON.stringify(cart));
	}

	// Load cart
	function loadCart() {
		cart = JSON.parse(localStorage.getItem('shoppingCart'));
	}
	if (localStorage.getItem("shoppingCart") != null) {
		loadCart();
	}


	// =============================
	// Public methods and propeties
	// =============================
	var obj = {};

	// Add to cart
	obj.addItemToCart = function (name, price, count) {
		for (var item in cart) {
			if (cart[item].name === name && cart[item].price === price) {
				cart[item].count++;
				saveCart();
				return;
			}
		}
		var item = new Item(name, price, count);
		cart.push(item);
		saveCart();
	}
	// Set count from item
	obj.setCountForItem = function (name, count) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart[i].count = count;
				break;
			}
		}
	};
	// Remove item from cart
	obj.removeItemFromCart = function (name) {
		for (var item in cart) {
			if (cart[item].name === name) {
				cart[item].count--;
				if (cart[item].count === 0) {
					cart.splice(item, 1);
				}
				break;
			}
		}
		saveCart();
	}

	// Remove all items from cart
	obj.removeItemFromCartAll = function (name) {
		for (var item in cart) {
			if (cart[item].name === name) {
				cart.splice(item, 1);
				break;
			}
		}
		saveCart();
	}

	// Clear cart
	obj.clearCart = function () {
		cart = [];
		saveCart();
	}

	// Count cart 
	obj.totalCount = function () {
		var totalCount = 0;
		for (var item in cart) {
			totalCount += cart[item].count;
		}
		return totalCount;
	}

	// Total cart
	obj.totalCart = function () {
		var totalCart = 0;
		for (var item in cart) {
			totalCart += cart[item].price * cart[item].count;
		}
		return Number(totalCart.toFixed(2));
	}

	// List cart
	obj.listCart = function () {
		var cartCopy = [];
		for (i in cart) {
			item = cart[i];
			itemCopy = {};
			for (p in item) {
				itemCopy[p] = item[p];

			}
			itemCopy.total = Number(item.price * item.count).toFixed(2);
			cartCopy.push(itemCopy)
		}
		return cartCopy;
	}

	// cart : Array
	// Item : Object/Class
	// addItemToCart : Function
	// removeItemFromCart : Function
	// removeItemFromCartAll : Function
	// clearCart : Function
	// countCart : Function
	// totalCart : Function
	// listCart : Function
	// saveCart : Function
	// loadCart : Function
	return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
	event.preventDefault();
	var name = $(this).data('name');
	var price = Number($(this).data('price'));
	shoppingCart.addItemToCart(name, price, 1);
	displayCart();
});

// Clear items
$('.clear-cart').click(function () {
	shoppingCart.clearCart();
	displayCart();
});


function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = "";
	for (var i in cartArray) {
		output += "<tr>"
			+ "<td>" + cartArray[i].name + "</td>"
			+ "<td>(" + cartArray[i].price + ")</td>"
			+ "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
			+ "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
			+ "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
			+ "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
			+ " = "
			+ "<td>" + cartArray[i].total + "</td>"
			+ "</tr>";
	}
	$('.show-cart').html(output);
	$('.total-cart').html(shoppingCart.totalCart());
	$('.total-count').html(shoppingCart.totalCount());
}

displayCart();

