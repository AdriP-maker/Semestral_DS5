let puntos = 0;
function sumar() {
  puntos++;
  document.getElementById("puntaje").innerText = puntos;
}
function restar() {
  // Verifica que el puntaje no sea negativo antes de restar
  if (puntos > 0) {
    puntos--;
    document.getElementById("puntaje").innerText = puntos;
  } else {
    alert("No se puede restar, el puntaje es 0");
  }
}