function validar() {
  if (nombre.value === "" || email.value === "") {
    alert("Campos obligatorios");
    return false;
  }
  return true;
}
