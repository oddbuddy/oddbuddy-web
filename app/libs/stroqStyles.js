
// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);

    if (newTheme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    }

    localStorage.setItem('theme', newTheme);
}
function openDownloadModal() {
    const modal = document.getElementById('downloadModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// UPDATED: New function to close the download modal
function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// UPDATED: New event listener - Close modal when clicking outside
document.getElementById('downloadModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDownloadModal();
    }
});

// UPDATED: New event listener - Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDownloadModal();
    }
});

function showRecommendedStrip(platformTarget) {
    // Hide all strips first
    document.querySelectorAll('.recommended-strip').forEach(strip => {
        strip.style.display = 'none';
    });

    // Show strip for detected platform
    const targetOption = document.querySelector(`[data-platform="${platformTarget}"]`);
    if (targetOption) {
        const strip = targetOption.querySelector('.recommended-strip');
        if (strip) {
            strip.style.display = 'block';
        }
    }
}

// UPDATED: Modified detectPlatform function - removed URL properties, simplified return object
function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return {
            platform: 'android',
            icon: '📱',
            text: 'Download for Android',
            stripTarget: 'android' // UPDATED: Added stripTarget
        };
    }

    if (/Windows/.test(userAgent)) {
        return {
            platform: 'windows',
            icon: '💻',
            text: 'Download for Windows',
            stripTarget: 'windows-store' // UPDATED: Added stripTarget (prefer Store over Direct)
        };
    }

    if (/Mac/.test(userAgent)) {
        return {
            platform: 'mac',
            icon: '💻',
            text: 'Download for Mac',
            stripTarget: 'mac' // UPDATED: Added stripTarget
        };
    }

    return {
        platform: 'android',
        icon: '📱',
        text: 'Download STROQ',
        stripTarget: 'android' // UPDATED: Added stripTarget for fallback
    };
}

// UPDATED: Modified initialization - now updates button text and icon based on platform
document.addEventListener('DOMContentLoaded', function () {
    const platform = detectPlatform();
    document.getElementById('download-icon').textContent = platform.icon;
    document.getElementById('download-text').textContent = platform.text;
    const originalOpenModal = openDownloadModal;
    window.openDownloadModal = function () {
        originalOpenModal();
        showRecommendedStrip(platform.stripTarget); // UPDATED: Show strip for detected platform
    };
});

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all feature cards and benefit items
document.querySelectorAll('.feature-card, .benefit-item, .perfect-card').forEach(el => {
    observer.observe(el);
});

// Header scroll effect and scroll to top button
let lastScrollTop = 0;
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Header hide/show
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(-6px)'; // Keep the 6px overlap
    }

    // Scroll to top button visibility
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    document.body.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    }

    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });

    // Add stagger animation to perfect cards
    const perfectCards = document.querySelectorAll('.perfect-card');
    perfectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add some interactive effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    const speed = scrolled * 0.5;

    if (parallax) {
        document.documentElement.style.setProperty('--parallax-offset', `${speed}px`);
    }
});

// Add click ripple effect to buttons
document.querySelectorAll('.download-btn, .theme-toggle').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const rippleCSS = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
document.getElementById('year').textContent = new Date().getFullYear();
