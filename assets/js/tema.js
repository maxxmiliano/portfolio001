// Aplica o tema salvo antes da página aparecer (evita "piscar").
(function () {
  try {
    var t = localStorage.getItem('tema');
    if (t === 'claro' || t === 'escuro') {
      document.documentElement.setAttribute('data-theme', t === 'escuro' ? 'dark' : 'light');
    }
  } catch (e) { /* armazenamento indisponível: segue o sistema */ }
})();
