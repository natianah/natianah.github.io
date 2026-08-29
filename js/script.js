// ============================================================
// HERY TIANA RAZAFINIARIVO — PORTFOLIO
// Engineering × AI × IoT × PREMIUM
// ============================================================

// ── Révélation au scroll ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── Navigation ancrée + fermeture menu mobile ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('nav')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    closeMobileMenu();
  });
});

// ── Menu hamburger (mobile) ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
}

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (mobileMenu && hamburger) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// ── Mode sombre / clair ──
const themeToggle = document.getElementById('themeToggle');
const themeIconUse = document.querySelector('#themeIcon use');
let currentTheme = 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIconUse) themeIconUse.setAttribute('href', '#i-sun');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIconUse) themeIconUse.setAttribute('href', '#i-moon');
    localStorage.setItem('theme', 'dark');
  }
}

// Charge le thème sauvegardé ou la préférence système
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
} else {
  applyTheme('dark'); // Par défaut : mode sombre
}

themeToggle?.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ── Formulaire de contact via mailto ──
function envoyerEmail() {
  const nom = document.getElementById('f-nom')?.value.trim() || '';
  const email = document.getElementById('f-email')?.value.trim() || '';
  const objet = document.getElementById('f-objet')?.value.trim() || '';
  const msg = document.getElementById('f-msg')?.value.trim() || '';

  if (!nom || !email || !msg) {
    alert('Merci de remplir au minimum votre nom, email et message.');
    return;
  }

  const sujet = objet || 'Contact depuis mon portfolio';
  const corps = `Bonjour Hery Tiana,\n\nVous avez reçu un message depuis votre portfolio :\n\nDe : ${nom}\nEmail : ${email}\n\n${msg}\n\n---\nEnvoyé depuis hery-tiana.portfolio`;

  window.location.href = `mailto:herytianarazafiniarivo@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
}

window.envoyerEmail = envoyerEmail;