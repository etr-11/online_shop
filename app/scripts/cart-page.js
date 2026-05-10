const CART_KEY = "shopping_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.price);

    container.innerHTML += `
      <div>
        <img src="${item.image}" width="100">
        <h3>${item.name}</h3>
        <p>${item.price} ₽</p>
        <button onclick="removeItem(${index})">Удалить</button>
      </div>
    `;
  });

  totalPrice.textContent = total;
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

document.getElementById("clear-cart").onclick = () => {
  localStorage.removeItem(CART_KEY);
  renderCart();
};

renderCart();
