// 1. Mostra no talão o horário de hoje (hora de Lisboa).
//    Sem JavaScript, o talão mostra o horário completo.
// 2. Mede a altura real do talão fixo para que o fim da página e o foco
//    do teclado nunca fiquem escondidos por baixo dele.
//    Sem JavaScript, o CSS usa uma estimativa que cobre o pior caso.
(function () {
  var talao = document.querySelector('.talao');
  var el = document.getElementById('talao-horas');

  // 0 = domingo … 6 = sábado. Horário por confirmar com o restaurante.
  var horario = {
    0: '12:00–15:00 e 17:00–22:30',
    1: '18:00–00:00', 2: '18:00–00:00', 3: '18:00–00:00',
    4: '18:00–00:00', 5: '18:00–00:00', 6: '18:00–00:00'
  };
  var nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

  if (el && window.Intl) {
    try {
      var curto = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Lisbon', weekday: 'short' }).format(new Date());
      var dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(curto);
      if (dia >= 0) {
        el.textContent = '';
        var pc = document.createElement('span');
        pc.className = 'pc';
        pc.textContent = 'Hoje, ' + nomes[dia] + ': ' + horario[dia];
        var sr = document.createElement('span');
        sr.className = 'sr-only';
        sr.textContent = ' (horário por confirmar)';
        el.appendChild(pc);
        el.appendChild(sr);
      }
    } catch (e) { /* fica o horário completo */ }
  }

  // 2b. No horário da secção “Onde e quando”, a linha de hoje fica marcada.
  if (window.Intl) {
    try {
      var hoje = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
        new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Lisbon', weekday: 'short' }).format(new Date()));
      document.querySelectorAll('.horario dt[data-dias]').forEach(function (dt) {
        if (dt.getAttribute('data-dias').split(' ').indexOf(String(hoje)) < 0) return;
        var dd = dt.nextElementSibling;
        dt.classList.add('hoje');
        if (!dd) return;
        dd.classList.add('hoje');
        var m = document.createElement('span');
        m.className = 'hoje__marca';
        m.textContent = 'hoje';
        dd.appendChild(document.createTextNode(' '));
        dd.appendChild(m);
      });
    } catch (e) { /* fica o horário sem marca */ }
  }

  // 3. O Safari do iPhone só aplica :active (o toque nos botões) quando a página
  //    tem um ouvinte de touchstart. Vazio e passivo: não atrasa o scroll.
  document.addEventListener('touchstart', function () {}, { passive: true });

  if (!talao) return;
  var raiz = document.documentElement;

  function medir() {
    var r = talao.getBoundingClientRect();
    // Só reserva espaço quando o talão é a barra a toda a largura, presa ao fundo.
    var barra = getComputedStyle(talao).position === 'fixed' && r.width >= raiz.clientWidth - 1;
    raiz.style.setProperty('--talao-medido', barra ? Math.ceil(r.height) + 'px' : '0px');
  }

  medir();
  if (window.ResizeObserver) new ResizeObserver(medir).observe(talao);
  window.addEventListener('resize', medir);
  window.addEventListener('orientationchange', medir);
})();

// 4. Ementa: o índice marca a categoria que está no ecrã e, no telemóvel,
//    desliza para a manter à vista. Sem JavaScript, o índice funciona igual, sem marca.
(function () {
  var indice = document.querySelector('.indice');
  if (!indice || !window.IntersectionObserver) return;
  var lista = indice.querySelector('ul');
  var ligacoes = {};
  indice.querySelectorAll('a[href^="#"]').forEach(function (a) { ligacoes[a.getAttribute('href').slice(1)] = a; });
  var seccoes = Array.prototype.filter.call(document.querySelectorAll('.categoria[id]'), function (s) { return ligacoes[s.id]; });
  if (!seccoes.length) return;
  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)');
  var atual = null;

  function marcar(id) {
    if (id === atual) return;
    if (atual && ligacoes[atual]) ligacoes[atual].removeAttribute('aria-current');
    atual = id;
    var a = ligacoes[id];
    if (!a) return;
    a.setAttribute('aria-current', 'true');
    // só a tira horizontal do telemóvel precisa de deslizar
    if (lista.scrollWidth > lista.clientWidth + 1) {
      var alvo = a.offsetLeft - (lista.clientWidth - a.offsetWidth) / 2;
      lista.scrollTo({ left: Math.max(0, alvo), behavior: calmo.matches ? 'auto' : 'smooth' });
    }
  }

  // a categoria “atual” é a que cruza uma linha a ~30% do topo do ecrã
  var visiveis = new Set();
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) { if (e.isIntersecting) visiveis.add(e.target); else visiveis.delete(e.target); });
    var primeira = seccoes.find(function (s) { return visiveis.has(s); });
    if (primeira) marcar(primeira.id);
  }, { rootMargin: '-30% 0px -69% 0px' });
  seccoes.forEach(function (s) { obs.observe(s); });
})();

// 5. Pratos da casa no telemóvel: a barra por baixo da fila mostra onde se está.
(function () {
  var fila = document.querySelector('.pratos');
  var barra = document.querySelector('.pratos__barra');
  if (!fila || !barra) return;
  var pendente = false;
  function atualizar() {
    pendente = false;
    var total = fila.scrollWidth, visivel = fila.clientWidth;
    var v = total > 0 ? Math.min(1, visivel / total) : 1;
    var p = total - visivel > 0 ? fila.scrollLeft / (total - visivel) : 0;
    barra.style.setProperty('--v', v.toFixed(3));
    barra.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3));
  }
  fila.addEventListener('scroll', function () {
    if (!pendente) { pendente = true; requestAnimationFrame(atualizar); }
  }, { passive: true });
  window.addEventListener('resize', atualizar);
  atualizar();
})();
