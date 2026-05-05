document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================
    // 1. LÓGICA DE NAVEGACIÓN (INICIO <-> GALERÍA)
    // ==========================================================
    const homeView = document.getElementById("home-view");
    const galleryView = document.getElementById("gallery-view");
    const openGalleryBtn = document.getElementById("openGalleryBtn");
    const backToHomeBtn = document.getElementById("backToHomeBtn");

    // Función para ir a la Galería
    if (openGalleryBtn) {
        openGalleryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (homeView && galleryView) {
                homeView.classList.add("hidden");
                galleryView.classList.remove("hidden");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Función para volver al Inicio
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (homeView && galleryView) {
                galleryView.classList.add("hidden");
                homeView.classList.remove("hidden");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Lógica para girar las cartas (Flip Cards) en la galería
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ==========================================================
    // 2. LÓGICA DEL CARRUSEL (PRESENTACIÓN)
    // ==========================================================
    const track = document.getElementById("carousel-track");
    if (track) {
        const slides = Array.from(track.children);
        const carouselNextBtn = document.getElementById("carouselNextBtn");
        const carouselPrevBtn = document.getElementById("carouselPrevBtn");
        const dots = document.querySelectorAll(".dot");

        if (slides.length > 0) {
            let carouselIndex = 0;
            let autoplayInterval;

            function updateCarousel() {
                track.style.transform = `translateX(-${carouselIndex * 100}%)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle("active", index === carouselIndex);
                });
            }

            function nextSlide() {
                carouselIndex = (carouselIndex + 1) % slides.length;
                updateCarousel();
            }

            function prevSlide() {
                carouselIndex = (carouselIndex === 0) ? slides.length - 1 : carouselIndex - 1;
                updateCarousel();
            }

            function startAutoplay() {
                if (autoplayInterval) clearInterval(autoplayInterval);
                autoplayInterval = setInterval(nextSlide, 5000);
            }

            function resetAutoplay() {
                clearInterval(autoplayInterval);
                startAutoplay();
            }

            if (carouselNextBtn) {
                carouselNextBtn.addEventListener("click", () => {
                    nextSlide();
                    resetAutoplay();
                });
            }

            if (carouselPrevBtn) {
                carouselPrevBtn.addEventListener("click", () => {
                    prevSlide();
                    resetAutoplay();
                });
            }

            dots.forEach((dot, index) => {
                dot.addEventListener("click", () => {
                    carouselIndex = index;
                    updateCarousel();
                    resetAutoplay();
                });
            });

            startAutoplay();
        }
    }

    // Función para activar las animaciones al hacer scroll
    const revealElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Una vez que se anima, dejamos de observarlo para ahorrar recursos
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // El elemento debe ser visible al 15% para activarse
        });

        // Buscamos todos los elementos con la clase 'reveal'
        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));
    };

    // Ejecutar al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        revealElements();

        // Si tienes el cambio de vista (Home a Galería), 
        // reinicia el observador para que las fotos nuevas también animen
        const openGalleryBtn = document.getElementById("openGalleryBtn");
        if (openGalleryBtn) {
            openGalleryBtn.addEventListener("click", () => {
                // Un pequeño delay para que el DOM se actualice antes de observar
                setTimeout(revealElements, 100);
            });
        }
    });
});