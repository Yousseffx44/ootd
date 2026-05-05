let questions = document.querySelectorAll(".question");

questions.forEach(function(item){

    item.addEventListener("mouseover", function(){
        item.style.backgroundColor = "#111";
        item.style.transition = "0.3s";
    });

    item.addEventListener("mouseout", function(){
        item.style.backgroundColor = "transparent";
    });

});


const themeBtn = document.getElementById("theme-btn");
const body = document.body;


themeBtn.addEventListener("click", function() {
    body.classList.toggle("light-theme");
    if (body.classList.contains("light-theme")) {
        themeBtn.innerText = "Switch them";
    } else {
        themeBtn.innerText = "Switch them";
    }
});