let total = 0;

function agregarCarrito(precio) {
  total += precio;
  document.getElementById("total").innerText = total;
}

function finalizar() {
  alert("Compra realizada por $" + total);
  total = 0;
  document.getElementById("total").innerText = total;
}
