
const STORAGE_KEY = "ootd-Cart";
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalSection = document.getElementById("carttotal");
const cartAmount = document.getElementById("cart-amount");
const emptyCartMessage = document.querySelector(".empty-cart");

window.addEventListener("load", renderCart);

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function renderCart() {
  const cart = loadCart();
  cartItemsContainer.innerHTML = "";

  if (!cart.length) {
    emptyCartMessage.style.display = "block";
    cartTotalSection.style.display = "none";
    cartAmount.textContent = "0.00";
    return;
  }

  emptyCartMessage.style.display = "none";
  cartTotalSection.style.display = "block";

  let total = 0;
  cart.forEach((item, index) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">x${item.quantity}</span>
      <span class="item-price">${item.price.toFixed(2)} EGP</span>
      <span class="item-line-total">${lineTotal.toFixed(2)} EGP</span>
      <button class="remove-button" type="button">Remove</button>
    `;

    li.querySelector(".remove-button").addEventListener("click", () => removeFromCart(index));
    cartItemsContainer.appendChild(li);
  });

  cartAmount.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  const cart = loadCart();
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function showCheckout() {
  const cart = loadCart();
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }
  alert("Thank you for your purchase! Your order has been placed successfully.");
  saveCart([]);
  renderCart();
}