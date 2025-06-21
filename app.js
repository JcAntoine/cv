// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    addSmoothScrolling();
    setupIntersectionObserver();
}

function addSmoothScrolling() {
    // Add smooth scrolling to any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupIntersectionObserver() {
    // Add animation when sections come into view
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .section {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .experience-item, .education-item {
        transition: all 0.3s ease;
    }
    
    .experience-item:hover, .education-item:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    .language-item:hover {
        background-color: var(--color-secondary-hover);
    }
`;

document.head.appendChild(animationStyles);

// Add focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.btn')) {
        e.target.style.outline = '2px solid var(--color-primary)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('.btn')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
});

// Initialize sections animation on load
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('animate-in');
        }, index * 150);
    });
});