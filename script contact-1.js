
window.addEventListener("load", () => {
  document.querySelector("nav").classList.add("loaded");
});


const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully ✅");
    form.reset();
  });
}

const themeBtn = document.getElementById("theme-btn");


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

themeBtn.addEventListener("click", () => {
    
    document.body.classList.toggle("light-theme");
    
   
    if(document.body.classList.contains("light-theme")) {
        setCookie("site_theme", "light", 30); 
    } else {
        setCookie("site_theme", "dark", 30);
    }
});


window.onload = () => {
    let savedTheme = getCookie("site_theme");
    if(savedTheme === "light") {
        document.body.classList.add("light-theme");
    }
};