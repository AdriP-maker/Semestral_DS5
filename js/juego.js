// ====================================
// JUEGO: AVENTURA TURÍSTICA EN COCLÉ
// Serpientes y Escaleras - Temática de Turismo
// ====================================

// Variables globales del juego
let posicionJugador = 0;
let movimientosTotales = 0;
let puedeJugar = true;

// Escaleras: casilla inicial -> casilla final (aventuras que te hacen avanzar)
const escaleras = {
  3: 22,   // Playa Blanca - descubrimiento inicial
  8: 26,   // El Valle de Antón - ascenso a la montaña
  13: 46,  // Chorro del Macho - gran salto de aventura
  20: 44,  // Pozos Termales - experiencia relajante
  28: 50,  // Mercado Artesanal - cultura local
  36: 57,  // Parque Arqueológico El Caño - historia ancestral
  51: 67,  // Mirador - vistas panorámicas
  62: 81,  // Reserva Natural - biodiversidad
  71: 91,  // Vista Panorámica - cerca de la meta
  80: 99   // Última aventura - casi en la cima
};

// Serpientes: casilla inicial -> casilla final (obstáculos que te hacen retroceder)
const serpientes = {
  17: 7,   // Camino cerrado por mantenimiento
  31: 14,  // Lluvia intensa - debes regresar
  47: 25,  // Desvío en la carretera
  53: 33,  // Tráfico pesado
  56: 37,  // Camino en mal estado
  64: 42,  // Cierre temporal del sitio
  74: 60,  // Deslizamiento de tierra
  87: 68,  // Mantenimiento de instalaciones
  92: 75,  // Derrumbe en el camino
  98: 79   // Último obstáculo antes de la meta
};

// Iconos emoji para decorar las casillas del tablero
const iconos = ['🏖️', '🏔️', '🌊', '🗿', '🌲', '🦜', '🌺', '🏕️', '⛰️', '🌴'];

/**
 * Función principal: Crea el tablero de juego
 * Genera 100 casillas en formato zigzag (como el juego tradicional)
 */
function crearTablero() {
  const tablero = document.getElementById('tablero');
  
  // Validar que el elemento exista
  if (!tablero) {
    console.error('Error: No se encontró el elemento con id "tablero"');
    return;
  }
  
  tablero.innerHTML = '';
  
  // Crear 100 casillas en orden zigzag (de abajo hacia arriba)
  // Fila 9 (bottom): 91-100 (izq a der)
  // Fila 8: 81-90 (der a izq)
  // Fila 7: 71-80 (izq a der)
  // ... y así sucesivamente
  for (let fila = 9; fila >= 0; fila--) {
    for (let col = 0; col < 10; col++) {
      let numero;
      
      // Calcular número de casilla según el patrón zigzag
      if (fila % 2 === 0) {
        // Filas pares: de derecha a izquierda
        numero = fila * 10 + (10 - col);
      } else {
        // Filas impares: de izquierda a derecha
        numero = fila * 10 + (col + 1);
      }
      
      // Crear elemento de casilla
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `cell-${numero}`;
      
      // Agregar número de casilla (visible en esquina superior izquierda)
      const cellNumber = document.createElement('span');
      cellNumber.className = 'cell-number';
      cellNumber.textContent = numero;
      cell.appendChild(cellNumber);
      
      // Determinar el icono y tipo de casilla
      let icono = iconos[Math.floor(Math.random() * iconos.length)];
      
      // Verificar si la casilla es una escalera
      if (escaleras[numero]) {
        cell.classList.add('escalera');
        icono = '🪜';
        cell.title = `¡Escalera! Sube hasta la casilla ${escaleras[numero]}`;
      } 
      // Verificar si la casilla es una serpiente
      else if (serpientes[numero]) {
        cell.classList.add('serpiente');
        icono = '🐍';
        cell.title = `¡Serpiente! Baja hasta la casilla ${serpientes[numero]}`;
      }
      
      // Agregar el icono emoji a la casilla
      const emojiSpan = document.createElement('span');
      emojiSpan.textContent = icono;
      emojiSpan.style.fontSize = '1.2rem';
      cell.appendChild(emojiSpan);
      
      // Agregar casilla al tablero
      tablero.appendChild(cell);
    }
  }
  
  // Posicionar el jugador en la posición inicial
  actualizarPosicionJugador();
}

/**
 * Actualiza la posición visual del jugador en el tablero
 * Remueve la posición anterior y coloca al jugador en la nueva casilla
 */
function actualizarPosicionJugador() {
  // Remover todas las instancias anteriores del jugador
  document.querySelectorAll('.player').forEach(p => p.remove());
  
  // Solo mostrar jugador si está en una casilla válida (1-100)
  if (posicionJugador > 0 && posicionJugador <= 100) {
    const cell = document.getElementById(`cell-${posicionJugador}`);
    
    if (cell) {
      // Crear elemento visual del jugador
      const player = document.createElement('div');
      player.className = 'player';
      player.textContent = '🚶'; // Emoji de persona caminando
      cell.appendChild(player);
    }
  }
  
  // Actualizar panel de información
  document.getElementById('posicionActual').textContent = posicionJugador;
  document.getElementById('movimientos').textContent = movimientosTotales;
}

/**
 * Lanza el dado y anima el resultado
 * Genera un número aleatorio entre 1 y 6
 */
function lanzarDado() {
  // Verificar si el jugador puede lanzar el dado
  if (!puedeJugar) return;
  
  puedeJugar = false;
  const dado = document.getElementById('dado');
  
  if (!dado) {
    console.error('Error: No se encontró el elemento con id "dado"');
    return;
  }
  
  dado.classList.add('rolling');
  
  // Animación del dado: cambiar números rápidamente
  let contador = 0;
  const intervalo = setInterval(() => {
    // Mostrar números aleatorios durante la animación
    dado.textContent = Math.floor(Math.random() * 6) + 1;
    contador++;
    
    // Después de 10 iteraciones (1 segundo), mostrar resultado final
    if (contador >= 10) {
      clearInterval(intervalo);
      
      // Generar resultado final del dado
      const resultado = Math.floor(Math.random() * 6) + 1;
      dado.textContent = resultado;
      dado.classList.remove('rolling');
      
      // Actualizar display del último dado lanzado
      document.getElementById('ultimoDado').textContent = resultado;
      
      // Mover al jugador según el resultado
      moverJugador(resultado);
    }
  }, 100);
}

/**
 * Mueve al jugador la cantidad de pasos indicada por el dado
 * Valida que no se pase de la casilla 100
 * @param {number} pasos - Número de casillas a avanzar
 */
function moverJugador(pasos) {
  movimientosTotales++;
  const nuevaPosicion = posicionJugador + pasos;
  
  // Regla: Debes caer exactamente en 100 para ganar
  if (nuevaPosicion > 100) {
    mostrarMensaje('⚠️ ¡Necesitas el número exacto para llegar a 100!', 'warning');
    puedeJugar = true;
    return;
  }
  
  // Animación: mover paso a paso en lugar de saltar directamente
  let pasoActual = 0;
  const intervalo = setInterval(() => {
    posicionJugador++;
    pasoActual++;
    actualizarPosicionJugador();
    
    // Cuando se completen todos los pasos
    if (pasoActual >= pasos) {
      clearInterval(intervalo);
      verificarCasilla();
    }
  }, 300); // 300ms entre cada paso
}

/**
 * Verifica si la casilla actual tiene escalera, serpiente o es la meta
 * Aplica las reglas del juego según el tipo de casilla
 */
function verificarCasilla() {
  const mensaje = document.getElementById('mensaje');
  
  if (!mensaje) {
    console.error('Error: No se encontró el elemento con id "mensaje"');
    puedeJugar = true;
    return;
  }
  
  // Verificar si el jugador llegó a la meta (casilla 100)
  if (posicionJugador === 100) {
    mostrarMensaje(
      `🎉 ¡FELICITACIONES! ¡Has completado el tour por Coclé en ${movimientosTotales} movimientos!`, 
      'success'
    );
    
    // Preguntar si quiere jugar de nuevo después de 2 segundos
    setTimeout(() => {
      if (confirm('¡Juego completado! ¿Deseas jugar de nuevo?')) {
        reiniciarJuego();
      }
    }, 2000);
    return;
  }
  
  // Verificar si cayó en una escalera (aventura)
  if (escaleras[posicionJugador]) {
    const destino = escaleras[posicionJugador];
    mostrarMensaje(
      `🪜 ¡Encontraste una aventura! Avanzas de la casilla ${posicionJugador} a la ${destino}`, 
      'success'
    );
    
    // Después de 2 segundos, mover al destino de la escalera
    setTimeout(() => {
      posicionJugador = destino;
      actualizarPosicionJugador();
      mensaje.style.display = 'none';
      puedeJugar = true;
    }, 2000);
    return;
  }
  
  // Verificar si cayó en una serpiente (obstáculo)
  if (serpientes[posicionJugador]) {
    const destino = serpientes[posicionJugador];
    mostrarMensaje(
      `🐍 ¡Oh no! Encontraste un obstáculo. Retrocedes de la casilla ${posicionJugador} a la ${destino}`, 
      'danger'
    );
    
    // Después de 2 segundos, mover al destino de la serpiente
    setTimeout(() => {
      posicionJugador = destino;
      actualizarPosicionJugador();
      mensaje.style.display = 'none';
      puedeJugar = true;
    }, 2000);
    return;
  }
  
  // Casilla normal: continuar jugando
  puedeJugar = true;
}

/**
 * Muestra un mensaje al jugador con estilo según el tipo
 * @param {string} texto - Mensaje a mostrar
 * @param {string} tipo - 'success', 'danger' o 'warning'
 */
function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById('mensaje');
  
  if (!mensaje) {
    console.error('Error: No se encontró el elemento con id "mensaje"');
    return;
  }
  
  mensaje.textContent = texto;
  mensaje.style.display = 'block';
  
  // Aplicar estilos según el tipo de mensaje
  if (tipo === 'success') {
    mensaje.style.background = '#90EE90'; // Verde claro
    mensaje.style.borderColor = '#2d5016'; // Verde oscuro
  } else if (tipo === 'danger') {
    mensaje.style.background = '#FFB6C1'; // Rosa claro
    mensaje.style.borderColor = '#6b4423'; // Marrón
  } else {
    mensaje.style.background = '#f5f5dc'; // Crema
    mensaje.style.borderColor = '#2d5016'; // Verde
  }
}

/**
 * Reinicia el juego a su estado inicial
 * Resetea posición, movimientos y limpia mensajes
 */
function reiniciarJuego() {
  posicionJugador = 0;
  movimientosTotales = 0;
  puedeJugar = true;
  
  // Resetear display del último dado
  const ultimoDado = document.getElementById('ultimoDado');
  if (ultimoDado) {
    ultimoDado.textContent = '-';
  }
  
  // Ocultar mensajes
  const mensaje = document.getElementById('mensaje');
  if (mensaje) {
    mensaje.style.display = 'none';
  }
  
  // Actualizar posición del jugador (volver al inicio)
  actualizarPosicionJugador();
}

// ====================================
// INICIALIZACIÓN DEL JUEGO
// ====================================

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', crearTablero);
} else {
  // El DOM ya está cargado
  crearTablero();
}