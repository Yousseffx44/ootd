// قائمة إطلالات جاهزة
const outfits = [
  "تيشرت أبيض + جينز أزرق + حذاء رياضي",
  "قميص أسود + بنطلون كلاسيك + حذاء جلد",
  "جاكيت جلد + تيشرت أبيض + بنطلون Slim Fit",
  "فستان كاجوال + حقيبة صغيرة + حذاء بكعب",
  "هودي رمادي + بنطلون رياضي + Sneakers"
];
const toggleBtn = document.getElementById("toggleTheme");



toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("theme-dark");
  document.body.classList.toggle("theme-light");
});


