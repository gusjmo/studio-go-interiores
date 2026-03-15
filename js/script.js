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

  const nome = form.querySelector('input[type="text"]').value;
  const tel = form.querySelector('input[type="tel"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const obj = form.querySelector('select').value;

  const msg = `Olá, Gabriela! 👋\n\nMeu nome é *${nome}*.\nWhatsApp: ${tel}\nE-mail: ${email}\nObjetivo: ${obj}\n\nGostaria de saber mais sobre o Método All Inclusive®.`;

  const url = `https://wa.me/5511945809774?text=${encodeURIComponent(msg)}`;
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
// PROTEÇÃO ANTI-SPAM
let ultimoEnvio = 0;
const INTERVALO_MINIMO = 30000;

function validarFormulario(dados) {
  const nomeValido = dados.nome && dados.nome.length >= 3 && dados.nome.length <= 100;
  const telefoneValido = dados.telefone && /^[\d\s\(\)\-\+]{8,20}$/.test(dados.telefone);
  const mensagemValida = !dados.mensagem || dados.mensagem.length <= 500;
  const semHtml = !/[<>]/.test(dados.nome + dados.telefone + (dados.mensagem || ''));
  return nomeValido && telefoneValido && mensagemValida && semHtml;
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const honeypot = form.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value !== '') {
      e.preventDefault();
      return;
    }

    const agora = Date.now();
    if (agora - ultimoEnvio < INTERVALO_MINIMO) {
      e.preventDefault();
      alert('Aguarde alguns segundos antes de enviar novamente.');
      return;
    }

    const dados = {
      nome: form.querySelector('input[name="nome"], input[name="name"]')?.value || '',
      telefone: form.querySelector('input[name="telefone"], input[name="phone"], input[name="whatsapp"]')?.value || '',
      mensagem: form.querySelector('textarea')?.value || ''
    };

    if (!validarFormulario(dados)) {
      e.preventDefault();
      alert('Por favor, verifique os dados preenchidos.');
      return;
    }

    ultimoEnvio = agora;
  });
});

