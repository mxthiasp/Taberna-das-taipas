// Mostra no talão o horário de hoje (hora de Lisboa).
// Sem JavaScript, o talão mostra o horário completo.
(function () {
  var el = document.getElementById('talao-horas');
  if (!el || !window.Intl) return;

  // 0 = domingo … 6 = sábado. Horário por confirmar com o restaurante.
  var horario = {
    0: '12:00–15:00 e 17:00–22:30',
    1: '18:00–00:00', 2: '18:00–00:00', 3: '18:00–00:00',
    4: '18:00–00:00', 5: '18:00–00:00', 6: '18:00–00:00'
  };
  var nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

  try {
    var curto = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Lisbon', weekday: 'short' }).format(new Date());
    var dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(curto);
    if (dia < 0) return;

    el.textContent = '';
    var pc = document.createElement('span');
    pc.className = 'pc';
    pc.textContent = 'Hoje, ' + nomes[dia] + ': ' + horario[dia];
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = ' (horário por confirmar)';
    el.appendChild(pc);
    el.appendChild(sr);
  } catch (e) { /* fica o horário completo */ }
})();
