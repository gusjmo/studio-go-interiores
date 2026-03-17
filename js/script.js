// =====================
// NAV — encolhe e muda bg ao rolar
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
// ANIMAÇÃO DE ENTRADA (Staggered Reveal)
// =====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Pega o atraso definido no HTML ou usa 0
      const delay = entry.target.getAttribute('data-delay') || 0;
      
      // Aplica o timeout baseado no data-delay (ex: delay 1 = 150ms)
      setTimeout(() => {
        entry.target.classList.add('active');
      }, delay * 150);
      
      // Desobserva após animar uma vez
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Pega todos os itens que devem ser revelados
document.querySelectorAll('.reveal-item').forEach(el => {
  observer.observe(el);
});

// Efeito Parallax sutil no background do Hero ao mover o mouse (Apenas Desktop)
const heroBg = document.querySelector('.hero-bg');
const hero = document.querySelector('.hero');

if (window.innerWidth > 768 && heroBg && hero) {
  hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 20px move
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    heroBg.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    heroBg.style.transform = `scale(1.05) translate(0px, 0px)`;
  });
}

// =====================
// FORMULÁRIO e PROTEÇÃO
// =====================
const form = document.querySelector('.form');
let ultimoEnvio = 0;
const INTERVALO_MINIMO = 30000;

function validarFormulario(dados) {
  const nomeValido = dados.nome && dados.nome.length >= 3 && dados.nome.length <= 100;
  // RegEx básica para fone: permite ddd, numero, espacos, tracos e parenteses
  const telefoneValido = dados.telefone && /^[\d\s\(\)\-\+]{8,20}$/.test(dados.telefone);
  const emailValido = dados.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email);
  const objetivoValido = dados.objetivo && dados.objetivo.trim() !== '';

  const semHtml = !/[<>]/.test(dados.nome + dados.telefone + dados.email);
  
  return nomeValido && telefoneValido && emailValido && objetivoValido && semHtml;
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Proteção honeypot
    const honeypot = form.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value !== '') {
      return; // Stop silently for bots
    }

    // Proteção span/intervalo
    const agora = Date.now();
    if (agora - ultimoEnvio < INTERVALO_MINIMO) {
      alert('Aguarde alguns segundos antes de enviar novamente.');
      return;
    }

    // Coleta dados
    const dados = {
      nome: form.querySelector('#nome').value,
      telefone: form.querySelector('#telefone').value,
      email: form.querySelector('#email').value,
      objetivo: form.querySelector('#objetivo').value
    };

    if (!validarFormulario(dados)) {
      alert('Por favor, verifique se todos os dados foram preenchidos corretamente.');
      return;
    }

    // Atualiza ultimo envio
    ultimoEnvio = agora;

    // Monta a mensagem para WhatsApp
    const msg = `Olá, Gabriela! 👋\n\nMeu nome é *${dados.nome}*.\nE-mail: ${dados.email}\nObjetivo: ${dados.objetivo}\n\nGostaria de saber mais sobre o Método All Inclusive®.`;
    const url = `https://wa.me/5511945809774?text=${encodeURIComponent(msg)}`;
    
    // Efeito visual no botão de enviando...
    const btnSubmit = form.querySelector('.btn-submit');
    const originalText = btnSubmit.innerText;
    btnSubmit.innerText = "Redirecionando...";
    btnSubmit.style.opacity = 0.7;

    setTimeout(() => {
      window.open(url, '_blank');
      btnSubmit.innerText = originalText;
      btnSubmit.style.opacity = 1;
      form.reset(); // Limpa form opcionalmente
    }, 800);
    
  });
}


// =====================
// SCROLL SUAVE para âncoras
// =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if(targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      // Compensa fixed header height (aprox 70px)
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  });
});
