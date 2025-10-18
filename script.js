// Simple cart functionality
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    const cartSection = document.getElementById('cart');
    if (cart.length === 0) {
        cartSection.innerHTML = '<h2>Shopping Cart</h2><p>Your cart is empty.</p>';
    } else {
        let cartHTML = '<h2>Shopping Cart</h2><ul>';
        let total = 0;
        cart.forEach(item => {
            cartHTML += `<li>${item.name} - $${item.price}</li>`;
            total += item.price;
        });
        cartHTML += `</ul><p>Total: $${total}</p>`;
        cartSection.innerHTML = cartHTML;
    }
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.product button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const product = button.parentElement;
            const name = product.querySelector('h3').textContent;
            const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));
            addToCart(name, price);
        });
    });
});
