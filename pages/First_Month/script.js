document.addEventListener("DOMContentLoaded", () => {
    // Animaciones de scroll (reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
const track = document.getElementById("carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.getElementById("carouselNextBtn");
const prevBtn = document.getElementById("carouselPrevBtn");
const dotsContainer = document.getElementById("carousel-dots");

let currentSlide = 0;
const totalSlides = slides.length;

// Crear dots automáticamente
slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

nextBtn.addEventListener("click", () => {
    currentSlide++;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateCarousel();
});

// Auto slide
setInterval(() => {
    currentSlide++;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    updateCarousel();
}, 5000);