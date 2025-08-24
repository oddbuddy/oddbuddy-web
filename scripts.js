const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

(function () {
    const root = document.documentElement;
    const btn = document.getElementById('themeBtn');
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    function apply(theme) {
        if (theme === 'light') { root.setAttribute('data-theme', 'light') } else { root.removeAttribute('data-theme') }
        localStorage.setItem('theme', theme);
        // change logo from queryselectorall 'brand-logo'
        const logos = document.querySelectorAll('.brand-logo')
        if (theme === 'light') {
            logos.forEach(logo => {
                logo.src = './assets/images/oddbuddylogocolor.png';
            });
        } else {
            logos.forEach(logo => {
                logo.src = './assets/images/oddbuddylogowhite.png';
            });
        }
    }
    apply(saved || (prefersLight ? 'light' : 'dark'));
    btn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        apply(isLight ? 'dark' : 'light');
    });
})();

// Simple tilt effect
document.querySelectorAll('[data-tilt]').forEach(card => {
    let rAF; const max = 8;
    function onMove(e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height; // 0..1
        const rx = (0.5 - y) * max;
        const ry = (x - 0.5) * max;
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(() => {
            card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
    }
    function reset() { card.style.transform = 'rotateX(0) rotateY(0)' }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();


// Contact form submit
const form = document.getElementById('contactForm');
const formstatus = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    formstatus.textContent = 'Sending…';

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    let data = {
        name: name,
        email: email,
        subject: subject,
        query: message
    }

    const body = JSON.stringify(data);

    fetch("https://script.google.com/macros/s/AKfycbww24PTd6LgBC_fpwWqzRrQham461waHrIst8bLeTnvIW-gTh3yihqJ23wvd7ZaVeDe8Q/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: body
    }).then((result) => {
        formstatus.textContent = `Thanks, ${data.name || 'friend'}! We\'ll get back to you at ${data.email}.`;
    }).catch((error) => {
        formstatus.textContent = `Oops, something went wrong. Please try again.`;
    }).finally(() => {
        form.reset();
    });
});
