const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const root = document.documentElement;
const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', currentTheme);

const navList = document.getElementById('nav-menu');
const burger = document.querySelector('.burger');
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
});

navList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && navList.classList.contains('open')) {
        navList.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    }
});

function enableSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    const searchInput = document.getElementById('search');
    const typeFilter = document.getElementById('type-filter');

    const response = await fetch('projects.json');
    const projects = await response.json();

    const render = () => {
        const term = searchInput.value.toLowerCase().trim();
        const type = typeFilter.value;
        const filtered = projects.filter((project) => {
            const matchesType = type === 'all' || project.type === type;
            const text = `${project.title} ${project.summary} ${project.description} ${project.type}`.toLowerCase();
            const matchesText = term === '' || text.includes(term);
            return matchesType && matchesText;
        });

        grid.innerHTML = '';
        filtered.forEach((project) => {
            const card = document.createElement('article');
            card.className = 'card project-card reveal';
            card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-meta">
          <span>${project.type}</span>
          <span>${project.year}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <p class="project-description">${project.description}</p>
        <button class="toggle" type="button" aria-expanded="false">En savoir plus</button>
      `;

            const toggle = card.querySelector('.toggle');
            toggle.addEventListener('click', () => {
                const isOpen = card.classList.toggle('open');
                toggle.setAttribute('aria-expanded', String(isOpen));
                toggle.textContent = isOpen ? 'Fermer' : 'En savoir plus';
            });

            grid.appendChild(card);
        });

        setupReveal(grid.querySelectorAll('.reveal'));
    };

    // Populate filter options
    const types = Array.from(new Set(projects.map((p) => p.type)));
    types.forEach((type) => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        typeFilter.appendChild(option);
    });

    searchInput.addEventListener('input', render);
    typeFilter.addEventListener('change', render);
    render();
}

function setupReveal(elements = document.querySelectorAll('.reveal')) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
}

function initScrollReveal() {
    document.querySelectorAll('section, .card, .skill-card, .service, .timeline-item').forEach((el) => {
        el.classList.add('reveal');
    });
    setupReveal();
}

function initForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.reset();
        alert('Merci pour votre message ! Cette démo n\'envoie pas encore d\'email.');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initForm();
    enableSmoothScroll();
    loadProjects();
});