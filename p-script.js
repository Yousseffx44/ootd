function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

const products = [
    {Id: 1, name: "Gray Hoodie", price: 1100, imgSrc: "1068.png" },
    {Id: 2, name: "Over Size T-Shirt", price: 800, imgSrc: "1436.png" },
    {Id: 3, name: "Cargo Pants", price: 1300, imgSrc: "1461.png" },
    {Id: 4, name: "Graphic T-Shirt", price: 600, imgSrc: "jeans.png" },
    {Id: 5, name: "White T-Shirt", price: 850, imgSrc: "engi.png" },
    {Id: 6, name: "Wide Leg Pants", price: 1500, imgSrc: "1212.jpg" },
    {Id: 7, name: "casual outfit", price: 2000, imgSrc: "download3.jpg" },
    {Id: 8, name: "classic outfit", price: 1800, imgSrc: "Men Summer.jpg" },
    {Id: 9, name: "formal outfit", price: 2100, imgSrc: "download.jpg" },
    {Id: 10, name: "classic outfit", price: 2500, imgSrc: "Ensemble gris.jpg" },
    {Id: 11, name: "classic outfit", price: 2500, imgSrc: "Michela recommend.jpg" },
    {Id: 12, name: "classic outfit", price: 2500, imgSrc: "qamis.png" }
];

function renderProducts() {
  const productsSection = document.getElementById("products");
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.imgSrc}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} EGP</p>
      <button class="add-to-cart" data-id="${product.Id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
    `;
    productsSection.appendChild(productDiv);
  });
}

const STORAGE_KEY = "ootd-Cart";

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

function addToCart(product) {
  let cart = loadCart();
  const existingItem = cart.find(item => item.Id === product.Id);
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      Id: product.Id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  
  saveCart(cart);
  calculateCartTotal();
  showAddedNotification(product.name);
}

function calculateCartTotal() {
  const cart = loadCart();
  let total = 0;
  
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  
  return total;
}

function showAddedNotification(productName) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #D4AF37;
    color: #000;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 9999;
    font-weight: bold;
    animation: slideIn 0.3s ease-out;
  `;
  alert(`Added to cart: ${productName} `);
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

window.addEventListener("load", renderProducts);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    const product = {
      Id: parseInt(btn.dataset.id),
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price)
    };
    addToCart(product);
  }
});
