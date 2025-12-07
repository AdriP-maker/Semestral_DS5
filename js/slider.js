let imagenes = ["img/slide1.jpg", "img/slide2.jpg", "img/slide3.jpg"];
let i = 0;

setInterval(() => {
  i = (i + 1) % imagenes.length;
  document.getElementById("slide").src = imagenes[i];
}, 3000);
