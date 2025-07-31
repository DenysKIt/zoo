let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} грн`;
        const btn = document.createElement("button");
        btn.textContent = "Видалити";
        btn.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };
        li.appendChild(btn);
        cartItems.appendChild(li);
    });
    cartCount.textContent = cart.length;
}

function toggleCart() {
    const cartEl = document.getElementById("cart");
    cartEl.style.display = cartEl.style.display === "block" ? "none" : "block";
}