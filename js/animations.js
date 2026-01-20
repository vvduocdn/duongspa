/* Animation and Scroll Effects */

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.feature-card, .service-card, .price-item, .package-card, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.service-image');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // Simulate image load
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    });
});

// Add counter animation for prices
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('vi-VN') + 'đ';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('vi-VN') + 'đ';
        }
    }, 16);
}

// Observe price elements
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const priceText = entry.target.textContent.replace(/[.,đ]/g, '');
            const priceValue = parseInt(priceText);
            if (!isNaN(priceValue)) {
                animateCounter(entry.target, priceValue);
            }
        }
    });
}, { threshold: 0.5 });

// Observe all price elements
document.querySelectorAll('.price').forEach(price => {
    priceObserver.observe(price);
});