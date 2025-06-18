// Elementos del DOM
const envelope = document.getElementById('envelope');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const finalMessage = document.getElementById('finalMessage');
const heartsAnimation = document.getElementById('heartsAnimation');

// Abrir sobre al hacer clic
envelope.addEventListener('click', function() {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
    }
});

// Botón Sí
btnYes.addEventListener('click', function(e) {
    e.stopPropagation();
    showFinalMessage();
    createFallingHearts();
});

// Botón No - se mueve aleatoriamente HACIA ARRIBA
btnNo.addEventListener('click', function(e) {
    e.stopPropagation();
    moveNoButton();
});

// Función para mover el botón No SOLO HACIA ARRIBA
function moveNoButton() {
    const letter = btnNo.closest('.letter');
    
    // Obtener las dimensiones de la carta
    const letterWidth = letter.offsetWidth;
    const btnWidth = btnNo.offsetWidth;
    
    // Definir márgenes para mantener el botón dentro de la carta
    const margin = 15;
    const maxX = letterWidth - btnWidth - margin;
    
    // LIMITADO SOLO A LA PARTE SUPERIOR - zona del título y párrafo
    const minY = 10; // Muy cerca del borde superior
    const maxY = 50; // Solo en la parte superior, debajo del título
    
    // Generar posición aleatoria EN LA PARTE SUPERIOR ÚNICAMENTE
    const randomX = Math.random() * (maxX - margin) + margin;
    const randomY = Math.random() * (maxY - minY) + minY;
    
    // Asegurar que esté en la parte superior
    let finalX = randomX;
    let finalY = randomY;
    
    // Evitar superposición con el texto del encabezado
    if (finalY < 35) {
        // Si está muy arriba, mover hacia los lados
        finalX = finalX > letterWidth / 2 ? maxX - 10 : margin + 10;
        finalY = Math.max(finalY, 35);
    }
    
    btnNo.style.position = 'absolute';
    btnNo.style.left = finalX + 'px';
    btnNo.style.top = finalY + 'px';
    
    // Añadir animación de shake
    btnNo.classList.add('shake');
    setTimeout(() => {
        btnNo.classList.remove('shake');
    }, 500);
}

// Mostrar mensaje final
function showFinalMessage() {
    finalMessage.classList.add('show');
    
    // Ocultar el sobre después de un momento
    setTimeout(() => {
        envelope.style.opacity = '0.3';
    }, 500);
}

// Crear corazones que caen
function createFallingHearts() {
    const hearts = ['💖', '💕', '💗', '💝', '🌹', '✨', '💘', '💞', '🥰', '😍'];
    
    // Corazones cayendo
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            heartsAnimation.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }

    // Corazones con efecto pulse alrededor del mensaje
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const pulseHeart = document.createElement('div');
            pulseHeart.className = 'pulse-heart';
            pulseHeart.textContent = '💖';
            
            // Posición alrededor del mensaje final
            const angle = (i * 45) * Math.PI / 180;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            pulseHeart.style.left = '50%';
            pulseHeart.style.top = '50%';
            pulseHeart.style.transform = `translate(${x}px, ${y}px)`;
            
            document.body.appendChild(pulseHeart);
            
            setTimeout(() => {
                pulseHeart.remove();
            }, 2000);
        }, i * 200);
    }
}

// Crear efecto de corazones al hacer hover en el botón Sí
btnYes.addEventListener('mouseenter', function() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const miniHeart = document.createElement('div');
            miniHeart.textContent = '💕';
            miniHeart.style.position = 'absolute';
            miniHeart.style.fontSize = '12px';
            miniHeart.style.color = '#ff6b9d';
            miniHeart.style.pointerEvents = 'none';
            miniHeart.style.animation = 'float 1s ease-out forwards';
            
            const rect = btnYes.getBoundingClientRect();
            miniHeart.style.left = (rect.left + Math.random() * rect.width) + 'px';
            miniHeart.style.top = (rect.top - 10) + 'px';
            
            document.body.appendChild(miniHeart);
            
            setTimeout(() => {
                miniHeart.remove();
            }, 1000);
        }, i * 100);
    }
});

// Prevenir que el botón No sea clickeable con el teclado
btnNo.addEventListener('keydown', function(e) {
    e.preventDefault();
    moveNoButton();
});