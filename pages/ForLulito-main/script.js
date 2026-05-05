document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a Elementos ---
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    
    const readLetterButton = document.getElementById('readLetterButton');
    const showQuestionButton = document.getElementById('showQuestionButton');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const confirmButton = document.getElementById('confirmButton');

    // IDs exactos según tu HTML
    const introSection = document.getElementById('loveStatementSection');
    const photoSection = document.getElementById('photoSection');
    const letterSection = document.getElementById('letterContent');
    const questionSection = document.getElementById('finalQuestionSection');
    const celebrationSection = document.getElementById('confirmationScreen');

    // --- 1. Lógica de Música Global ---
    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicTime') || 0;

    if (music) {
        music.currentTime = musicCurrentTime;
        if (isMusicPlaying) {
            music.play().catch(() => console.log("Bloqueo de auto-play activo."));
            if(musicIcon) musicIcon.textContent = '🎵';
        }
    }

    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 1000);

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicIcon.textContent = '🎵';
                localStorage.setItem('musicPlaying', 'true');
            } else {
                music.pause();
                musicIcon.textContent = '🔇';
                localStorage.setItem('musicPlaying', 'false');
            }
        });
    }

    // --- 2. Flujo de Navegación (CORREGIDO) ---

    // Paso 1: Leer la Carta
    if (readLetterButton) {
        readLetterButton.addEventListener('click', () => {
            // Intentar reproducir música
            if (music) {
                music.play().catch(e => console.log("Audio iniciado tras interacción"));
                localStorage.setItem('musicPlaying', 'true');
                if(musicIcon) musicIcon.textContent = '🎵';
            }

            // Ocultar Intro y Fotos
            if (introSection) introSection.classList.add('hidden');
            if (photoSection) photoSection.classList.add('hidden');
            
            // Mostrar Carta
            if (letterSection) {
                letterSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Paso 2: Ir a la Pregunta Final
    if (showQuestionButton) {
        showQuestionButton.addEventListener('click', () => {
            if (letterSection) letterSection.classList.add('hidden');
            if (questionSection) {
                questionSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // --- 3. Botón No (Escurridizo) ---
    if (noButton) {
        const escape = () => {
            const x = Math.random() * (window.innerWidth - noButton.offsetWidth - 40);
            const y = Math.random() * (window.innerHeight - noButton.offsetHeight - 40);
            noButton.style.position = 'fixed';
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
            noButton.style.zIndex = "9999";
        };
        noButton.addEventListener('mouseover', escape);
        noButton.addEventListener('click', escape);
    }

    // --- 4. El "SÍ" y Celebración ---
    if (yesButton) {
        yesButton.addEventListener('click', () => {
            if (modalOverlay) modalOverlay.classList.remove('hidden');
        });
    }

    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            if (modalOverlay) modalOverlay.classList.add('hidden');
            if (questionSection) questionSection.classList.add('hidden');
            
            if (celebrationSection) {
                celebrationSection.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});