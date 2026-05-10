document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const item = e.target.closest(".item");

      const cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

      cart.push({
        name: item.dataset.name,
        price: item.dataset.price,
        image: item.querySelector("img").src
      });

      localStorage.setItem("shopping_cart", JSON.stringify(cart));

      updateCartCount();
    });
  });

  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
