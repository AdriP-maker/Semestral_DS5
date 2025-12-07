// Crear estructura del chatbot
document.addEventListener('DOMContentLoaded', function() {
  // Crear elementos del chatbot
  const chatbotHTML = `
    <div id="chatbot">
      <button class="chat-button" onclick="toggleChat()">💬</button>
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <h3 style="margin: 0;">🤖 Asistente Turístico</h3>
          <button class="chat-close" onclick="toggleChat()">✖</button>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="message bot">
            ¡Hola! 👋 Soy tu asistente de Turismo Coclé. ¿En qué puedo ayudarte hoy?
          </div>
        </div>
        <div class="chat-input">
          <input type="text" id="chatInput" placeholder="Escribe tu mensaje..." onkeypress="if(event.key === 'Enter') enviarMensaje()">
          <button onclick="enviarMensaje()">📤</button>
        </div>
      </div>
    </div>
  `;
  
  // Insertar chatbot en el body
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
});

function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.toggle('active');
  
  // Focus en input cuando se abre
  if (chatWindow.classList.contains('active')) {
    document.getElementById('chatInput').focus();
  }
}

function enviarMensaje() {
  const input = document.getElementById('chatInput');
  const mensaje = input.value.trim();
  
  if (!mensaje) return;
  
  // Agregar mensaje del usuario
  agregarMensaje(mensaje, 'user');
  input.value = '';
  
  // Simular "escribiendo..."
  setTimeout(() => {
    const respuesta = obtenerRespuesta(mensaje.toLowerCase());
    agregarMensaje(respuesta, 'bot');
  }, 500);
}

function agregarMensaje(texto, tipo) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${tipo}`;
  messageDiv.textContent = texto;
  messagesContainer.appendChild(messageDiv);
  
  // Scroll automático
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function obtenerRespuesta(mensaje) {
  // Sistema de respuestas por palabras clave
  
  // Saludos
  if (mensaje.includes('hola') || mensaje.includes('buenos') || mensaje.includes('buenas')) {
    return '¡Hola! 😊 ¿Te gustaría conocer nuestros destinos turísticos o información sobre paquetes?';
  }
  
  // Precios
  if (mensaje.includes('precio') || mensaje.includes('costo') || mensaje.includes('cuanto')) {
    return '💰 Nuestros paquetes turísticos van desde $100 hasta $350. Los más populares son:\n• Playa Blanca: $100\n• El Valle de Antón: $150\n• Tour Completo: $350\n¿Te interesa alguno en especial?';
  }
  
  // Paquetes
  if (mensaje.includes('paquete') || mensaje.includes('tour')) {
    return '🎒 Ofrecemos 5 paquetes principales:\n1. Playa Blanca ($100)\n2. El Valle de Antón ($150)\n3. Tour Arqueológico ($120)\n4. Chorro del Macho ($130)\n5. Tour Completo Coclé ($350)\nVisita nuestra sección de paquetes para más detalles.';
  }
  
  // Playa
  if (mensaje.includes('playa') || mensaje.includes('mar') || mensaje.includes('costa')) {
    return '🏖️ Las mejores playas de Coclé son Playa Blanca y Playa Farallón. Ofrecen arena blanca, aguas cristalinas y actividades como snorkel y buceo. ¿Te gustaría reservar?';
  }
  
  // El Valle
  if (mensaje.includes('valle') || mensaje.includes('anton') || mensaje.includes('montaña')) {
    return '🏔️ El Valle de Antón es un pueblo en el cráter de un volcán extinto. Famoso por su clima fresco, cascadas, pozos termales y mercado artesanal. ¡Un destino imperdible!';
  }
  
  // Arqueología
  if (mensaje.includes('arqueolog') || mensaje.includes('historia') || mensaje.includes('caño')) {
    return '🗿 El Parque Arqueológico El Caño es uno de los sitios precolombinos más importantes de Centroamérica. Descubre tumbas antiguas, petroglifos y la historia de nuestros ancestros.';
  }
  
  // Reservas
  if (mensaje.includes('reserva') || mensaje.includes('comprar') || mensaje.includes('adquirir')) {
    return '✅ Para hacer una reserva, ve a nuestra sección de Paquetes, selecciona el que prefieras y agrégalo al carrito. También puedes contactarnos al +507 6000-0000 o por email: info@turismococle.com';
  }
  
  // Horarios
  if (mensaje.includes('horario') || mensaje.includes('hora') || mensaje.includes('cuando')) {
    return '🕐 Nuestro horario de atención es:\nLunes a Domingo: 8:00 AM - 8:00 PM\nEstamos disponibles para consultas y reservas todos los días de la semana.';
  }
  
  // Contacto
  if (mensaje.includes('contacto') || mensaje.includes('llamar') || mensaje.includes('telefono') || mensaje.includes('email')) {
    return '📞 Puedes contactarnos por:\n• Teléfono: +507 6000-0000\n• Email: info@turismococle.com\n• Formulario web en la sección de Contacto\n¡Estamos para servirte!';
  }
  
  // Ubicación
  if (mensaje.includes('ubicacion') || mensaje.includes('donde') || mensaje.includes('direccion')) {
    return '📍 Nos encontramos en Penonomé, provincia de Coclé, República de Panamá. Coclé está en el centro del país, aproximadamente a 2 horas de la Ciudad de Panamá.';
  }
  
  // Actividades
  if (mensaje.includes('actividad') || mensaje.includes('hacer') || mensaje.includes('aventura')) {
    return '🎯 En Coclé puedes disfrutar de:\n• Playas y deportes acuáticos\n• Senderismo en montañas\n• Canopy y cascadas\n• Tours arqueológicos\n• Mercados artesanales\n• Pozos termales\n¿Qué tipo de aventura prefieres?';
  }
  
  // Duración
  if (mensaje.includes('duracion') || mensaje.includes('tiempo') || mensaje.includes('dias')) {
    return '⏱️ La duración de nuestros tours varía:\n• Tours de 1 día: Playa, Valle, Arqueología\n• Tour completo: 3 días / 2 noches\nPodemos personalizar la duración según tus necesidades.';
  }
  
  // Transporte
  if (mensaje.includes('transporte') || mensaje.includes('llegar') || mensaje.includes('bus')) {
    return '🚌 Todos nuestros paquetes incluyen transporte desde tu hotel o punto de encuentro. Contamos con vehículos cómodos y aire acondicionado para tu comodidad.';
  }
  
  // Clima
  if (mensaje.includes('clima') || mensaje.includes('temperatura') || mensaje.includes('lluvia')) {
    return '☀️ Coclé tiene clima tropical:\n• Costa: Cálido (28-32°C)\n• Valle: Fresco (18-24°C)\n• Temporada seca: Dic-Abril\n• Temporada lluviosa: May-Nov\n¡Siempre es buen momento para visitar!';
  }
  
  // Comida
  if (mensaje.includes('comida') || mensaje.includes('almuerzo') || mensaje.includes('restaurante')) {
    return '🍽️ Nuestros paquetes incluyen almuerzo típico panameño. Podrás disfrutar de platos locales como sancocho, arroz con pollo, pescado frito y más. ¡Una experiencia gastronómica completa!';
  }
  
  // Grupos
  if (mensaje.includes('grupo') || mensaje.includes('familia') || mensaje.includes('amigos')) {
    return '👥 ¡Perfectos para grupos! Ofrecemos descuentos para grupos de 6 o más personas. También personalizamos tours para familias, empresas o eventos especiales. Contáctanos para más información.';
  }
  
  // Juego
  if (mensaje.includes('juego') || mensaje.includes('diversion') || mensaje.includes('entretenimiento')) {
    return '🎲 ¡No te pierdas nuestro juego interactivo "Aventura en Coclé"! Es como serpientes y escaleras pero con temática turística. Encuentra la sección de Juegos en el menú.';
  }
  
  // Agradecimiento
  if (mensaje.includes('gracias') || mensaje.includes('excelente') || mensaje.includes('bien')) {
    return '😊 ¡De nada! Es un placer ayudarte. Si tienes más preguntas sobre Turismo en Coclé, no dudes en escribirme. ¡Que tengas un excelente día!';
  }
  
  // Despedida
  if (mensaje.includes('adios') || mensaje.includes('chao') || mensaje.includes('hasta luego')) {
    return '👋 ¡Hasta pronto! Esperamos verte pronto explorando las maravillas de Coclé. ¡Buen viaje! 🌴';
  }
  
  // Respuesta por defecto
  return '🤔 Interesante pregunta. Te puedo ayudar con información sobre:\n• Paquetes turísticos y precios\n• Destinos (playas, montañas, sitios arqueológicos)\n• Reservas y contacto\n• Actividades y horarios\n¿Sobre qué te gustaría saber?';
}