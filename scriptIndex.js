const CART_STORAGE_KEY = "ootd-Cart";
const themeBtn = document.getElementById("theme-btn");

window.addEventListener("load", () => {
  const nav = document.querySelector("nav");
  if (nav) nav.classList.add("loaded");

  const savedTheme = getCookie("site_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price) || 0
      };
      addToLocalCart(product);
      alert("Added to cart: " + product.name);
    });
  });
});

function addToLocalCart(product) {
  const cart = loadCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length);
  }
  return "";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
      setCookie("site_theme", "light", 30);
    } else {
      setCookie("site_theme", "dark", 30);
    }
  });
}