let total = 0;
let items = [];

function agregarCarrito(precio, nombre) {
  total += precio;
  items.push({ nombre: nombre, precio: precio });
  
  document.getElementById("total").innerText = total;
  actualizarListaItems();
  
  // Animación visual
  const btn = event.target;
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => btn.style.transform = 'scale(1)', 100);
}

function actualizarListaItems() {
  const container = document.getElementById("itemsCarrito");
  if (!container) return;
  
  if (items.length === 0) {
    container.innerHTML = '<p style="color: white; opacity: 0.8;">El carrito está vacío</p>';
    return;
  }
  
  let html = '';
  items.forEach((item, index) => {
    html += `
      <div style="background: rgba(255,255,255,0.1); padding: 0.5rem; margin: 0.5rem 0; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
        <span>${item.nombre}</span>
        <span>$${item.precio}</span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function vaciarCarrito() {
  if (items.length === 0) {
    alert("El carrito ya está vacío");
    return;
  }
  
  if (confirm("¿Desea vaciar el carrito?")) {
    total = 0;
    items = [];
    document.getElementById("total").innerText = total;
    actualizarListaItems();
  }
}

function finalizar() {
  if (total === 0) {
    alert("El carrito está vacío. Agregue paquetes para continuar.");
    return;
  }
  
  let resumen = "Resumen de su compra:\n\n";
  items.forEach(item => {
    resumen += `• ${item.nombre}: $${item.precio}\n`;
  });
  resumen += `\nTotal: $${total}`;
  
  alert(resumen + "\n\n¡Gracias por su compra! Nos pondremos en contacto pronto.");
  
  total = 0;
  items = [];
  document.getElementById("total").innerText = total;
  actualizarListaItems();
}

// Inicializar la lista al cargar
if (document.getElementById("itemsCarrito")) {
  actualizarListaItems();
}