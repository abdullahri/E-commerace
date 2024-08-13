
function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderProducts(products) {
    const productItems = document.getElementById('product-items');
    productItems.innerHTML = '';

    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${product.title}</strong>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
        `;
        productItems.appendChild(li);
    });
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${item.title}</strong>
            <p>$${item.price.toFixed(2)}</p>
            <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
            <span>Quantity: ${item.quantity}</span>
            <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
            <button class="delete" onclick="removeFromCart(${index})">Delete</button>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const price = parseFloat(document.getElementById('price').value);
    const description = document.getElementById('description').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push({ title, price, description });
    localStorage.setItem('products', JSON.stringify(products));

    renderProducts(products);

    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
});

function addToCart(productIndex) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const product = products[productIndex];
    const cartProduct = cart.find(p => p.title === product.title);

    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart(cart);
    renderCart();
}

function changeQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    }
    updateCart(cart);
    renderCart();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    updateCart(cart);
    renderCart();
}

function init() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    renderProducts(products);
    renderCart();
}

init();
