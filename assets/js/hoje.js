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

  if (!talao) return;
  var raiz = document.documentElement;

  function medir() {
    var r = talao.getBoundingClientRect();
    // Só reserva espaço quando o talão é a barra a toda a largura, presa ao fundo.
    var barra = getComputedStyle(talao).position === 'fixed' && r.width >= window.innerWidth - 1;
    raiz.style.setProperty('--talao-medido', barra ? Math.ceil(r.height) + 'px' : '0px');
  }

  medir();
  if (window.ResizeObserver) new ResizeObserver(medir).observe(talao);
  window.addEventListener('resize', medir);
  window.addEventListener('orientationchange', medir);
})();
