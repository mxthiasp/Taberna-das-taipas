// 1. Mostra no talão o estado em tempo real (hora de Lisboa):
//    “Aberto agora · fecha às 00:00”, “Abre às 18:00”, “Fechado · abre amanhã às 18:00”.
//    Atualiza-se sozinho a cada minuto. Sem JavaScript, o talão mostra o horário completo.
// 2. Mede a altura real do talão fixo para que o fim da página e o foco
//    do teclado nunca fiquem escondidos por baixo dele.
//    Sem JavaScript, o CSS usa uma estimativa que cobre o pior caso.
(function () {
  var talao = document.querySelector('.talao');
  var el = document.getElementById('talao-horas');

  // Horário por confirmar com o restaurante. 0 = domingo … 6 = sábado.
  // Cada período é [abre, fecha] em minutos desde as 00:00; 24:00 = 1440.
  // Um período que passe da meia-noite escreve-se com fecho acima de 1440 (ex.: 01:30 = 1530).
  var HORARIO = {
    0: [[12 * 60, 15 * 60], [17 * 60, 22 * 60 + 30]],
    1: [[18 * 60, 1440]], 2: [[18 * 60, 1440]], 3: [[18 * 60, 1440]],
    4: [[18 * 60, 1440]], 5: [[18 * 60, 1440]], 6: [[18 * 60, 1440]]
  };
  // Textos na língua da página (<html lang="en"> → inglês; o resto → português).
  var EN = /^en/i.test(document.documentElement.lang);
  var T = EN ? {
    aberto: 'Open now · closes at ', abre: 'Opens at ', fechado: 'Closed · opens ', amanha: 'tomorrow', as: ' at ',
    nomes: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    porConfirmar: ' (hours to be confirmed)', hoje: 'today'
  } : {
    aberto: 'Aberto agora · fecha às ', abre: 'Abre às ', fechado: 'Fechado · abre ', amanha: 'amanhã', as: ' às ',
    nomes: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
    porConfirmar: ' (horário por confirmar)', hoje: 'hoje'
  };
  var NOMES = T.nomes;
  var DIAS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Dia da semana e minutos desde a meia-noite, na hora de Lisboa.
  function agoraLisboa() {
    var partes = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Lisbon', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var v = {};
    partes.forEach(function (p) { v[p.type] = p.value; });
    var dia = DIAS_EN.indexOf(v.weekday);
    if (dia < 0) return null;
    return { dia: dia, min: (parseInt(v.hour, 10) % 24) * 60 + parseInt(v.minute, 10) };
  }

  function hora(min) {
    min = ((min % 1440) + 1440) % 1440;
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  // Devolve { aberto: bool, texto: string } para um dia e minuto.
  function estado(dia, min) {
    var i, p;
    // um período de ontem que passou da meia-noite
    var ontem = HORARIO[(dia + 6) % 7];
    for (i = 0; i < ontem.length; i++) {
      p = ontem[i];
      if (p[1] > 1440 && min < p[1] - 1440) return { aberto: true, texto: T.aberto + hora(p[1]) };
    }
    var hoje = HORARIO[dia];
    for (i = 0; i < hoje.length; i++) {
      p = hoje[i];
      if (min >= p[0] && min < p[1]) return { aberto: true, texto: T.aberto + hora(p[1]) };
    }
    for (i = 0; i < hoje.length; i++) {
      if (hoje[i][0] > min) return { aberto: false, texto: T.abre + hora(hoje[i][0]) };
    }
    for (var d = 1; d <= 7; d++) {
      var outro = HORARIO[(dia + d) % 7];
      if (outro.length) {
        var quando = d === 1 ? T.amanha : NOMES[(dia + d) % 7];
        return { aberto: false, texto: T.fechado + quando + T.as + hora(outro[0][0]) };
      }
    }
    return null;
  }

  function mostrarEstado() {
    var agora = agoraLisboa();
    var e = agora && estado(agora.dia, agora.min);
    if (!e) return;
    el.textContent = '';
    el.setAttribute('data-estado', e.aberto ? 'aberto' : 'fechado');
    var pc = document.createElement('span');
    pc.className = 'pc';
    pc.textContent = e.texto;
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = T.porConfirmar;
    el.appendChild(pc);
    el.appendChild(sr);
  }

  if (el && window.Intl) {
    try {
      mostrarEstado();
      // acerta ao minuto seguinte e depois atualiza a cada minuto
      setTimeout(function () {
        mostrarEstado();
        setInterval(mostrarEstado, 60000);
      }, (60 - new Date().getSeconds()) * 1000 + 50);
      // ao voltar ao separador (o telemóvel pode ter suspendido os temporizadores)
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) mostrarEstado();
      });
    } catch (e) { /* fica o horário completo */ }
  }

  // 2b. No horário da secção “Onde e quando”, a linha de hoje fica marcada.
  if (window.Intl) {
    try {
      var hoje = DIAS_EN.indexOf(
        new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Lisbon', weekday: 'short' }).format(new Date()));
      document.querySelectorAll('.horario dt[data-dias]').forEach(function (dt) {
        if (dt.getAttribute('data-dias').split(' ').indexOf(String(hoje)) < 0) return;
        var dd = dt.nextElementSibling;
        dt.classList.add('hoje');
        if (!dd) return;
        dd.classList.add('hoje');
        var m = document.createElement('span');
        m.className = 'hoje__marca';
        m.textContent = T.hoje;
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
