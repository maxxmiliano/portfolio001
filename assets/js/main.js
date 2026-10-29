(function () {
  'use strict';
  var raiz = document.documentElement;
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- tema claro/escuro ---------- */
  var temaBtn = document.getElementById('tema-btn');
  function temaAtual() {
    var t = raiz.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function atualizaIcone() {
    var escuro = temaAtual() === 'dark';
    temaBtn.querySelector('i').className = 'bx ' + (escuro ? 'bx-sun' : 'bx-moon');
    temaBtn.setAttribute('aria-label', escuro ? 'Mudar para modo claro' : 'Mudar para modo escuro');
  }
  temaBtn.addEventListener('click', function () {
    var novo = temaAtual() === 'dark' ? 'light' : 'dark';
    raiz.setAttribute('data-theme', novo);
    try { localStorage.setItem('tema', novo === 'dark' ? 'escuro' : 'claro'); } catch (e) {}
    atualizaIcone();
  });
  atualizaIcone();

  /* ---------- menu do celular ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');
  function fechaMenu() {
    menu.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.querySelector('i').className = 'bx bx-menu';
  }
  menuBtn.addEventListener('click', function () {
    var abre = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abre);
    menuBtn.setAttribute('aria-expanded', String(abre));
    menuBtn.querySelector('i').className = 'bx ' + (abre ? 'bx-x' : 'bx-menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) fechaMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechaMenu(); });

  /* ---------- topo fixo + link ativo ---------- */
  var topo = document.getElementById('topo');
  var links = menu.querySelectorAll('a');
  var secoes = document.querySelectorAll('main section[id]');
  function aoRolar() {
    topo.classList.toggle('rolado', window.scrollY > 20);
    var atual = secoes[0].id;
    secoes.forEach(function (s) { if (window.scrollY >= s.offsetTop - 140) atual = s.id; });
    links.forEach(function (a) { a.classList.toggle('ativo', a.getAttribute('href') === '#' + atual); });
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ---------- aparecer ao rolar ---------- */
  var revela = document.querySelectorAll('.revela');
  if (!reduzMovimento && 'IntersectionObserver' in window) {
    raiz.classList.add('anima');
    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (it) {
        if (it.isIntersecting) { it.target.classList.add('visivel'); obs.unobserve(it.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revela.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
      obs.observe(el);
    });
  }

  /* ---------- carrossel de hobbies ---------- */
  var trilho = document.getElementById('carrossel');
  var pontos = document.getElementById('pontos');
  if (trilho) {
    var slides = trilho.querySelectorAll('.slide');
    slides.forEach(function () { pontos.appendChild(document.createElement('span')); });
    function passo() { return slides[0].getBoundingClientRect().width + 24; }
    function indice() { return Math.round(trilho.scrollLeft / passo()); }
    function marca() {
      var i = indice();
      Array.prototype.forEach.call(pontos.children, function (p, j) { p.classList.toggle('on', j === i); });
    }
    document.querySelectorAll('[data-carrossel]').forEach(function (b) {
      b.addEventListener('click', function () {
        var dir = b.getAttribute('data-carrossel') === 'prox' ? 1 : -1;
        var max = trilho.scrollWidth - trilho.clientWidth - 2;
        var alvo = trilho.scrollLeft + dir * passo();
        if (alvo > max + passo() / 2) alvo = 0;            // volta ao início
        else if (alvo < -passo() / 2) alvo = max;          // vai ao fim
        trilho.scrollTo({ left: alvo, behavior: reduzMovimento ? 'auto' : 'smooth' });
      });
    });
    trilho.addEventListener('scroll', function () { window.requestAnimationFrame(marca); }, { passive: true });
    marca();
  }

  /* ---------- formulário: abre WhatsApp ou e-mail com a mensagem ---------- */
  var form = document.getElementById('form-contato');
  var erro = document.getElementById('form-erro');
  if (form) {
    var zap = (form.dataset.whatsapp || '').replace(/\D/g, '');
    var email = form.dataset.email || '';
    var emailValido = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var assunto = form.assunto.value.trim();
      var msg = form.mensagem.value.trim();
      if (!nome || !msg) {
        erro.textContent = 'Preencha seu nome e a mensagem para enviar.';
        erro.hidden = false;
        (!nome ? form.nome : form.mensagem).focus();
        return;
      }
      erro.hidden = true;
      var texto = 'Olá, Maxmiliano! Sou ' + nome + '.' + (assunto ? '\nAssunto: ' + assunto : '') + '\n\n' + msg;
      var url;
      if (zap.length >= 10) {
        url = 'https://wa.me/' + zap + '?text=' + encodeURIComponent(texto);
      } else if (emailValido) {
        url = 'mailto:' + email + '?subject=' + encodeURIComponent(assunto || 'Contato pelo portfólio') +
              '&body=' + encodeURIComponent(texto);
      } else {
        erro.textContent = 'O envio ainda não está configurado. Use uma das redes ao lado.';
        erro.hidden = false;
        return;
      }
      window.open(url, '_blank', 'noopener');
    });
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
