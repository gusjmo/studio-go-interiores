// =====================
// NAV — encolhe ao rolar
// =====================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// =====================
// ANIMAÇÃO DE ENTRADA
// Elementos aparecem ao entrar na tela
// =====================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.etapa, .res-card, .serv-card, .dep-card, .dor-item'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});


// =====================
// FORMULÁRIO
// Redireciona para WhatsApp ao enviar
// =====================
const form = document.getElementById('leadForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome   = form.querySelector('input[type="text"]').value;
  const tel    = form.querySelector('input[type="tel"]').value;
  const email  = form.querySelector('input[type="email"]').value;
  const obj    = form.querySelector('select').value;

  const msg = `Olá, Gabriela! 👋\n\nMeu nome é *${nome}*.\nWhatsApp: ${tel}\nE-mail: ${email}\nObjetivo: ${obj}\n\nGostaria de saber mais sobre o Método All Inclusive®.`;

  const url = `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});


// =====================
// SCROLL SUAVE
// Para links de âncora (#contato, etc.)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
