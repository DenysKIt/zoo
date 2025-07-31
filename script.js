
let products = [], cart = [];

window.onload = () => {
    fetch('products.json')
        .then(r => r.json())
        .then(data => {
            products = data;
            renderProducts(products);
        });
};

function renderProducts(list) {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    list.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>Ціна: ${p.price} грн</p>
      <button onclick="addToCart('${p.name}', ${p.price})">До кошика</button>
    `;
        container.appendChild(div);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const list = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    list.innerHTML = '';
    cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} — ${item.price} грн
      <button onclick="removeItem(${i})">×</button>`;
        list.appendChild(li);
    });
    count.textContent = cart.length;
}

function removeItem(i) {
    cart.splice(i, 1);
    updateCart();
}

function toggleCart() {
    const c = document.getElementById('cart');
    c.style.display = c.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
    if (!cart.length) {
        alert('Ваш кошик порожній!');
        return;
    }
    let total = cart.reduce((sum, i) => sum + i.price, 0);
    alert(`Ви замовили ${cart.length} товарів, загальна сума: ${total} грн. Дякуємо!`);
    cart = [];
    updateCart();
    toggleCart();
}

document.addEventListener("DOMContentLoaded", () => {
    const orderBtn = document.getElementById("order-btn");
    if (orderBtn) {
        orderBtn.addEventListener("click", checkout);
    }
});

function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    let sortedProducts = [...products];

    if (sortValue === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(sortedProducts);
}
