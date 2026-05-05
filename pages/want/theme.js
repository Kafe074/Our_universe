// =================================================
// 🎨 THEME ADAPTER - CONECTANDO CONFIG CON DISEÑO
// =================================================

// Update CSS variables from configuration
function applyTheme() {
    const config = window.VALENTINE_CONFIG;
    
    // Verificación de seguridad para evitar errores si CONFIG no carga
    if (!config || !config.colors || !config.animations) {
        console.error("❌ VALENTINE_CONFIG no encontrado. Asegúrate de que config.js cargue primero.");
        return;
    }

    const root = document.documentElement;

    // Apply colors (Blanco, Lilas y Morados)
    root.style.setProperty('--background-color-1', config.colors.backgroundStart);
    root.style.setProperty('--background-color-2', config.colors.backgroundEnd);
    root.style.setProperty('--button-color', config.colors.buttonBackground);
    root.style.setProperty('--button-hover', config.colors.buttonHover);
    root.style.setProperty('--text-color', config.colors.textColor);

    // Apply animation settings
    root.style.setProperty('--float-duration', config.animations.floatDuration);
    root.style.setProperty('--float-distance', config.animations.floatDistance);
    root.style.setProperty('--bounce-speed', config.animations.bounceSpeed);
    root.style.setProperty('--heart-explosion-size', config.animations.heartExplosionSize);

    console.log("✨ Tema aplicado con éxito: Lu Edition 💜");
}

// Apply theme when the page loads
window.addEventListener('DOMContentLoaded', applyTheme);

// Re-aplicar por si acaso el DOM ya estaba listo (falla común en algunos hostings)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    applyTheme();
}