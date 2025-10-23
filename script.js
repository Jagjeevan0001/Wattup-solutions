// Simple cart functionality
let cart = [];

// User accounts storage (in a real app, this would be on a server)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    const cartSection = document.getElementById('cart');
    if (cart.length === 0) {
        cartSection.innerHTML = '<h2>Shopping Cart</h2><p>Your cart is empty.</p><button id="continue-shopping">Continue Shopping</button>';
    } else {
        let cartHTML = '<h2>Shopping Cart</h2><ul>';
        let total = 0;
        cart.forEach(item => {
            cartHTML += `<li>${item.name} - ₹${item.price}</li>`;
            total += item.price;
        });
        cartHTML += `</ul><p>Total: ₹${total}</p><button id="continue-shopping">Continue Shopping</button>`;
        cartSection.innerHTML = cartHTML;
    }
}

// Sign In functionality
function signIn(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        alert('Sign in successful!');
        // Update UI to show user is signed in
        updateUserStatus();
        return true;
    } else {
        alert('Invalid email or password.');
        return false;
    }
}

// Create Account functionality
function createAccount(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return false;
    }
    if (users.find(u => u.email === email)) {
        alert('Email already exists.');
        return false;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please sign in.');
    return true;
}

// Update user status in UI
function updateUserStatus() {
    const nav = document.querySelector('nav ul');
    if (currentUser) {
        nav.innerHTML += `<li>Welcome, ${currentUser.name}!</li>`;
    }
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const name = product.querySelector('h3').textContent;
            const price = parseFloat(product.querySelector('p').textContent.replace('₹', '').replace(',', ''));
            addToCart(name, price);
        });
    });

    // Continue Shopping button event delegation
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'continue-shopping') {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Sign In form
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            signIn(email, password);
        });
    }

    // Create Account form
    const createForm = document.getElementById('create-form');
    if (createForm) {
        createForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('create-name').value;
            const email = document.getElementById('create-email').value;
            const password = document.getElementById('create-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            createAccount(name, email, password, confirmPassword);
        });
    }

    // Shop Now button
    const shopNowBtn = document.getElementById('shop-now');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Update user status on load
    updateUserStatus();
});
