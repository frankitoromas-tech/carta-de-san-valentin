/* ========================================
   PASO 1: DECLARAR VARIABLES DE ESTADO
   
   Estas variables guardan la información
   que necesita cambiar mientras usas la app
   ======================================== */

// Contador de cuántas veces intentaron decir "No"
let noCount = 0;

// ¿Ya dijeron que sí? (true/false)
let yesPressed = false;

// ¿Están cayendo rosas actualmente? (true/false)
let rosesActive = false;

// Variable que guarda el intervalo de las rosas
let roseInterval = null;


/* ========================================
   PASO 2: ARRAYS DE MENSAJES
   
   Listas con los textos que se mostrarán
   ======================================== */

// Mensajes que aparecen cuando intentan decir "No"
const messages = [
    "¿No estás segura?",
    "Piénsalo mejor...",
    "¿De verdad?",
    "Dame una oportunidad 💕",
    "Vamos, di que sí...",
    "No seas así 🥺",
    "Última oportunidad...",
    "Ya, no insistas más 💔"
];

// Mensajes de amor que se muestran aleatoriamente
const loveMessages = [
    "Estar contigo me inspira a ser mejor cada día",
    "Tu sonrisa ilumina hasta mis días más oscuros",
    "Contigo, cada momento se vuelve especial",
    "Eres la razón de mi felicidad",
    "Tu amor es el regalo más valioso que he recibido",
    "Me haces sentir completo",
    "Cada día a tu lado es una aventura maravillosa",
    "Eres mi persona favorita en todo el mundo",
    "Tu presencia hace que todo tenga sentido",
    "Gracias por existir y estar en mi vida"
];


/* ========================================
   PASO 3: OBTENER ELEMENTOS DEL HTML
   
   Guardamos referencias a los elementos
   que vamos a manipular con JavaScript
   ======================================== */

// Pantallas
const questionScreen = document.getElementById('questionScreen');
const cardScreen = document.getElementById('cardScreen');

// Botones de la primera pantalla
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');

// Elementos de texto
const warningMessage = document.getElementById('warningMessage');
const hint = document.getElementById('hint');

// Botones de la segunda pantalla
const btnNewMessage = document.getElementById('btnNewMessage');
const btnRoses = document.getElementById('btnRoses');
const messageText = document.getElementById('messageText');


/* ========================================
   PASO 4: FUNCIONES PRINCIPALES
   
   El código que hace que todo funcione
   ======================================== */

/**
 * FUNCIÓN: updateButtonSizes
 * 
 * Actualiza el tamaño de los botones según
 * cuántas veces intentaron decir "No"
 * 
 * CÓMO FUNCIONA:
 * - Botón SÍ: Empieza en 80px, crece 20px cada intento
 * - Botón NO: Empieza en 60px, encoge 5px cada intento (mínimo 40px)
 */
function updateButtonSizes() {
    // Calcular tamaño del botón "Sí"
    const yesSize = 80 + noCount * 20;
    
    // Calcular tamaño del botón "No" (mínimo 40px)
    const noSize = Math.max(40, 60 - noCount * 5);
    
    // Aplicar tamaños al botón "Sí"
    btnYes.style.width = yesSize + 'px';
    btnYes.style.height = yesSize + 'px';
    btnYes.style.fontSize = (yesSize / 4) + 'px';
    
    // Aplicar tamaños al botón "No"
    btnNo.style.width = noSize + 'px';
    btnNo.style.height = noSize + 'px';
    btnNo.style.fontSize = (noSize / 4) + 'px';
    
    // Si han intentado 7+ veces, hacer el botón "No" semi-transparente
    btnNo.style.opacity = noCount >= 7 ? '0.3' : '1';
}


/**
 * FUNCIÓN: moveNoButton
 * 
 * Mueve el botón "No" a una posición aleatoria
 * 
 * CÓMO FUNCIONA:
 * - Math.random() genera un número entre 0 y 1
 * - Lo multiplicamos por el rango deseado
 * - Lo centramos restando la mitad del rango
 */
function moveNoButton() {
    // Calcular posición X aleatoria (-150 a +150 píxeles)
    const newX = Math.random() * 300 - 150;
    
    // Calcular posición Y aleatoria (-100 a +100 píxeles)
    const newY = Math.random() * 200 - 100;
    
    // Aplicar la transformación al botón
    btnNo.style.transform = `translate(${newX}px, ${newY}px)`;
}


/**
 * FUNCIÓN: handleNoHover
 * 
 * Se ejecuta cuando el mouse se acerca al botón "No"
 * 
 * HACE:
 * 1. Mueve el botón a otra posición
 * 2. Incrementa el contador
 * 3. Muestra un mensaje de advertencia
 * 4. Actualiza el tamaño de los botones
 * 5. Muestra la pista después de 3 intentos
 */
function handleNoHover() {
    // Mover el botón
    moveNoButton();
    
    // Incrementar contador (máximo: longitud del array de mensajes)
    noCount = Math.min(noCount + 1, messages.length - 1);
    
    // Mostrar el mensaje correspondiente
    warningMessage.textContent = messages[noCount];
    
    // Reiniciar la animación de sacudida
    warningMessage.style.animation = 'none';
    setTimeout(() => {
        warningMessage.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
    
    // Mostrar pista después de 3 intentos
    if (noCount >= 3) {
        hint.style.display = 'block';
    }
    
    // Actualizar tamaños de botones
    updateButtonSizes();
}


/**
 * FUNCIÓN: handleYesClick
 * 
 * Se ejecuta cuando hacen clic en "Sí"
 * 
 * HACE:
 * 1. Oculta la pantalla de pregunta
 * 2. Muestra la pantalla de carta
 * 3. Pone el primer mensaje de amor
 */
function handleYesClick() {
    console.log('¡Botón SÍ presionado!'); // Para debugging
    
    // Ocultar la pantalla de pregunta
    questionScreen.style.display = 'none';
    questionScreen.classList.remove('active');
    
    // Mostrar la pantalla de carta
    cardScreen.style.display = 'block';
    cardScreen.classList.add('active');
    
    // Mostrar el primer mensaje de amor
    messageText.textContent = loveMessages[0];
}


/**
 * FUNCIÓN: getNewMessage
 * 
 * Genera un mensaje de amor aleatorio
 * 
 * CÓMO FUNCIONA:
 * - Math.random() genera número entre 0 y 1
 * - Lo multiplicamos por la longitud del array
 * - Math.floor() lo redondea hacia abajo
 */
function getNewMessage() {
    // Generar índice aleatorio
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    
    // Obtener mensaje aleatorio
    const randomMessage = loveMessages[randomIndex];
    
    // Mostrar el mensaje
    messageText.textContent = randomMessage;
}


/**
 * FUNCIÓN: createRose
 * 
 * Crea una rosa que cae por la pantalla
 * 
 * HACE:
 * 1. Crea un nuevo elemento HTML (div)
 * 2. Le asigna estilos aleatorios
 * 3. Lo agrega a la pantalla
 * 4. Lo elimina después de 5 segundos
 */
function createRose() {
    // Crear elemento div
    const rose = document.createElement('div');
    
    // Agregar clase CSS
    rose.className = 'rose';
    
    // Contenido: emoji de rosa
    rose.textContent = '🌹';
    
    // Posición horizontal aleatoria (0% a 100%)
    rose.style.left = Math.random() * 100 + '%';
    
    // Empieza arriba de la pantalla
    rose.style.top = '-10%';
    
    // Duración aleatoria de caída (3 a 5 segundos)
    rose.style.animationDuration = (3 + Math.random() * 2) + 's';
    
    // Agregar a la pantalla de carta
    cardScreen.appendChild(rose);
    
    // Eliminar después de 5 segundos para no acumular elementos
    setTimeout(() => rose.remove(), 5000);
}


/**
 * FUNCIÓN: toggleRoses
 * 
 * Activa/desactiva las rosas que caen
 * 
 * CÓMO FUNCIONA:
 * - setInterval() ejecuta una función repetidamente
 * - clearInterval() detiene la ejecución
 */
function toggleRoses() {
    // Cambiar el estado (true ↔ false)
    rosesActive = !rosesActive;
    
    if (rosesActive) {
        // ACTIVAR ROSAS
        
        // Cambiar texto del botón
        btnRoses.textContent = 'Detener rosas 🌹';
        
        // Agregar clase CSS para cambiar color
        btnRoses.classList.add('roses-active');
        
        // Crear una rosa cada 200 milisegundos (0.2 segundos)
        roseInterval = setInterval(createRose, 200);
        
    } else {
        // DESACTIVAR ROSAS
        
        // Cambiar texto del botón
        btnRoses.textContent = 'Revivir rosas 🌹';
        
        // Quitar clase CSS
        btnRoses.classList.remove('roses-active');
        
        // Detener la creación de rosas
        clearInterval(roseInterval);
    }
}


/* ========================================
   PASO 5: CONECTAR EVENTOS
   
   Aquí conectamos las funciones con los
   eventos del usuario (clics, hover, etc.)
   ======================================== */

// Cuando el mouse se acerca al botón "No" → mover botón
btnNo.addEventListener('mouseenter', handleNoHover);

// Cuando tocan el botón "No" en móvil → mover botón
btnNo.addEventListener('touchstart', function(e) {
    e.preventDefault();  // Evita comportamiento por defecto
    handleNoHover();
});

// Cuando hacen clic en "Sí" → cambiar a pantalla de carta
btnYes.addEventListener('click', handleYesClick);

// Cuando hacen clic en "Nuevo mensaje" → generar mensaje aleatorio
btnNewMessage.addEventListener('click', getNewMessage);

// Cuando hacen clic en "Revivir rosas" → activar/desactivar rosas
btnRoses.addEventListener('click', toggleRoses);


/* ========================================
   PASO 6: INICIALIZACIÓN
   
   Código que se ejecuta cuando carga la página
   ======================================== */

// Establecer tamaños iniciales de los botones
updateButtonSizes();

// Verificar que todo se cargó correctamente
console.log('✅ Script cargado correctamente');
console.log('Botón SÍ:', btnYes);
console.log('Botón NO:', btnNo);
console.log('Pantalla pregunta:', questionScreen);
console.log('Pantalla carta:', cardScreen);
const musicIntro = document.getElementById("musicIntro");
const musicFinal = document.getElementById("musicFinal");

