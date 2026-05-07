const CONFIG = {
    valentineName: "Lu",

    pageTitle: "¿Quieres ser mi San Valentín? 💗",

    floatingEmojis: {
        hearts: ['💗', '✨', '🌸', '💖', '⭐', '🌟'],
        bears:  ['🧸', '💝']
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
        backgroundStart: "#06050c",      // Espacio oscuro del planetario
        backgroundEnd:   "#1a0515",      // Oscuro fucsia-profundo
        buttonBackground: "#b04888",     // Color mid del planeta 14 Feb
        buttonHover:      "#d880b8",     // Color hi del planeta 14 Feb
        textColor:        "#f0e6d2"      // Crema del planetario
    },

    animations: {
        floatDuration: "15s",           
        floatDistance: "50px",          
        bounceSpeed: "0.5s",            
        heartExplosionSize: 1.5         
    },

    music: {
        enabled: false
    }
};

window.VALENTINE_CONFIG = CONFIG;