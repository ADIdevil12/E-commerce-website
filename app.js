document.addEventListener('DOMContentLoaded', () => {
    let navCart = document.querySelector(".nav-cart .w1");
    let closeCart = document.querySelector(".showCart .close");
    let cart = document.querySelector(".showCart");
    let cartItems = []; // Array to store cart items

    // Event listener to open the cart
    navCart.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior
        // Toggle the visibility of the cart
        cart.classList.toggle("visible");
        updateCartDisplay(); // Update cart display when opened
    });

    // Event listener to close the cart
    closeCart.addEventListener('click', () => {
        cart.classList.remove("visible");
    });

    // Fetch the products from the JSON file
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateProducts(data); // Call function to populate products
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    // Function to populate the products in the shop section
    function populateProducts(products) {
        const shopSection = document.querySelector('.shop-section');
        
        // Clear existing content in shopSection
        shopSection.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('box');
            productDiv.innerHTML = `
                <div class="box-content">
                    <h2>${product.name}</h2>
                    <div class="box-image" style="background-image: url(${product.image});"></div>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>&#8377 ${product.price}</h4>
                </div>
                <div class="corn">
                    <a href="#" class="add-to-cart" data-product='${JSON.stringify(product)}'>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </a>
                </div>
            `;
            shopSection.appendChild(productDiv);
        });

        // Add event listeners to all "add to cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default anchor click behavior
                const product = JSON.parse(button.getAttribute('data-product'));
                addToCart(product);
            });
        });
    }

    // Function to add product to cart
    function addToCart(product) {
        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if it already exists
        } else {
            cartItems.push({ ...product, quantity: 1 }); // Add new product with quantity
        }
        updateCartDisplay();
        updateCartCount(); // Update cart count
    }

    // Function to update the cart display
    function updateCartDisplay() {
        const cartDisplay = document.querySelector('.ListCart');
        cartDisplay.innerHTML = ''; // Clear existing cart display

        let totalAmount = 0; // Initialize total amount

        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <div class="image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="name">${item.name}</div>
                <div class="totalPrice">₹${item.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" data-name="${item.name}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-name="${item.name}">+</span>
                </div>
            `;
            cartDisplay.appendChild(itemDiv);
            totalAmount += item.price * item.quantity; // Calculate total amount
        });

        // Display the total amount
        const totalDisplay = document.createElement('div');
        totalDisplay.classList.add('totalAmount');
        totalDisplay.innerHTML = `<h3>Total: ₹${totalAmount}</h3>`;
        cartDisplay.prepend(totalDisplay); // Add total amount at the top

        // Add event listeners for quantity adjustment
        const minusButtons = document.querySelectorAll('.minus');
        const plusButtons = document.querySelectorAll('.plus');

        minusButtons.forEach(button => {
            button.addEventListener('click', () => {
                adjustQuantity(button.dataset.name, -1);
            });
        });

        plusButtons.forEach(button => {
            button.addEventListener('click', () => {
                adjustQuantity(button.dataset.name, 1);
            });
        });
    }

    // Function to update cart count displayed
    function updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems; // Update count
    }

    // Function to adjust quantity
    function adjustQuantity(name, change) {
        const item = cartItems.find(item => item.name === name);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cartItems = cartItems.filter(item => item.name !== name); // Remove item if quantity is zero
            }
            updateCartDisplay();
            updateCartCount(); // Update count when quantity changes
        }
    }

    // Function to redirect to the payment page
    document.querySelector('.checkOut').addEventListener('click', () => {
        redirectToPayment();
    });

    function redirectToPayment() {
        if (cartItems.length > 0) {
            window.location.href = 'payment.html'; // Redirect to payment page
        } else {
            alert("Your cart is empty. Please add items to the cart before proceeding to checkout.");
        }
    }
});
