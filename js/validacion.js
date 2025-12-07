function validar() {
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  
  // Limpiar mensajes de error anteriores
  limpiarErrores();
  
  let errores = [];
  
  // Validar nombre
  if (!nombre || nombre.value.trim() === "") {
    errores.push("El nombre es obligatorio");
    marcarError(nombre);
  } else if (nombre.value.trim().length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres");
    marcarError(nombre);
  }
  
  // Validar email
  if (!email || email.value.trim() === "") {
    errores.push("El email es obligatorio");
    marcarError(email);
  } else if (!validarEmail(email.value)) {
    errores.push("El email no tiene un formato válido");
    marcarError(email);
  }
  
  // Validar mensaje
  if (mensaje && mensaje.value.trim() === "") {
    errores.push("El mensaje es obligatorio");
    marcarError(mensaje);
  } else if (mensaje && mensaje.value.trim().length < 10) {
    errores.push("El mensaje debe tener al menos 10 caracteres");
    marcarError(mensaje);
  }
  
  // Mostrar errores o enviar
  if (errores.length > 0) {
    alert("Por favor corrija los siguientes errores:\n\n• " + errores.join("\n• "));
    return false;
  } else {
    // Simular envío exitoso
    alert("¡Mensaje enviado exitosamente!\n\nNos pondremos en contacto contigo pronto.\n\nGracias por comunicarte con Turismo Coclé.");
    
    // Limpiar formulario
    if (nombre) nombre.value = "";
    if (email) email.value = "";
    if (mensaje) mensaje.value = "";
    
    const telefono = document.getElementById("telefono");
    const asunto = document.getElementById("asunto");
    if (telefono) telefono.value = "";
    if (asunto) asunto.value = "";
    
    return false; // Evitar el envío real del formulario
  }
}

function validarEmail(email) {
  // Expresión regular para validar email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function marcarError(elemento) {
  if (elemento) {
    elemento.style.borderColor = "#e74c3c";
    elemento.style.backgroundColor = "#ffe6e6";
  }
}

function limpiarErrores() {
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.style.borderColor = "#4a7c2c";
    input.style.backgroundColor = "white";
  });
}

// Agregar listeners para limpiar errores al escribir
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.style.borderColor = "#4a7c2c";
      this.style.backgroundColor = "white";
    });
  });
});