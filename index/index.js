// Мобильное меню
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Изменение навигации при прокрутке
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Эффект свечения для карточек
            if (entry.target.classList.contains('feature-card')) {
                setTimeout(() => {
                    entry.target.classList.add('glow');
                }, 300);
            }
            
            // Фон с свечением для всего раздела
            if (entry.target.id === 'features') {
                entry.target.classList.add('in-view');
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section-title, .feature-card, .audience-card, .footer-links li, .copyright, #features');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Дополнительный эффект при наведении
const featuresSection = document.getElementById('features');
const featureCards = document.querySelectorAll('.feature-card');

featuresSection.addEventListener('mouseenter', () => {
    featureCards.forEach(card => {
        card.style.transform = 'translateY(-5px)';
    });
});

featuresSection.addEventListener('mouseleave', () => {
    featureCards.forEach(card => {
        if (!card.matches(':hover')) {
            card.style.transform = 'translateY(0)';
        }
    });
});