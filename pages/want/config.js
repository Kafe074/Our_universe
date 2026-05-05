const CONFIG = {
    valentineName: "Lu",

    pageTitle: "¿Quieres ser mi San Valentín? 💗",

    floatingEmojis: {
        hearts: ['💜', '🤍', '✨', '☁️', '🌸'],  
        bears: ['🧸', '🐻'] 
    },

    questions: {
        first: {
            text: "¿Te gusto?",                                     
            yesBtn: "Si",                                             
            noBtn: "No",                                               
            secretAnswer: "¡No me gustas, te amo! ❤️"             
        },
        second: {
            text: "¿Cuánto me amas?",                                  
            startText: "¡Así de mucho!",                               
            nextBtn: "Siguiente ❤️"                                     
        },
        third: {
            text: "¿Quieres ser mi San Valentín este 14 de febrero de 2026? 🌹", 
            yesBtn: "Si, acepto!",                                             
            noBtn: "No"                                                 
        }
    },

    loveMessages: {
        extreme: "WOOOOW Me amas demasiado!! 🥰",  
        high: "¡Hasta el infinito y más allá! 🚀",     
        normal: "Y mucho más! 🥰"                         
    },

    celebration: {
        title: "¡Soy la persona más afortunada del mundo! 💓",
        message: "¡Sere tu San Valentín para siempre!",
        emojis: "💜"  
    },

    colors: {
        backgroundStart: "#ffffff",      // Blanco
        backgroundEnd: "#f3e5f5",        // Lavanda muy clarito
        buttonBackground: "#b39ddb",     // Lila para los botones
        buttonHover: "#9575cd",          // Morado suave al pasar el mouse
        textColor: "#673ab7"             // Morado oscuro para lectura clara
    },

    animations: {
        floatDuration: "15s",           
        floatDistance: "50px",          
        bounceSpeed: "0.5s",            
        heartExplosionSize: 1.5         
    },

    music: {
        enabled: true,                     
        autoplay: true,                    
        musicUrl: "Carlos Rivera - Te Esperaba (Lyric Video).mp3", 
        startText: "🎵",        
        stopText: "🔇",         
        volume: 0.5                        
    }
};

window.VALENTINE_CONFIG = CONFIG;