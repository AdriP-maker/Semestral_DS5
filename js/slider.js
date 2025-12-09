let imagenes = ["img/slide1.jpg", "img/slide2.jpeg", "img/slide3.jpeg"];
let i = 0;

setInterval(() => {
  i = (i + 1) % imagenes.length;
  document.getElementById("slide").src = imagenes[i];
}, 3000);
