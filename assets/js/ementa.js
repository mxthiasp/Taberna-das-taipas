// Ementa: pesquisa e “voltar ao topo”. Sem JavaScript, a ementa funciona igual:
// não há campo de pesquisa e “Voltar ao topo” é uma ligação normal no fim da carta.
(function () {
  document.documentElement.classList.add('js');

  // ——— Pesquisa ———
  var lado = document.querySelector('.ementa__lado');
  var indice = document.querySelector('.indice');
  var carta = document.getElementById('carta');
  if (lado && indice && carta) {
    // sem acentos nem maiúsculas: “camarao” encontra “Camarão”
    var norm = function (s) {
      return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
    };

    var caixa = document.createElement('div');
    caixa.className = 'pesquisa';
    caixa.setAttribute('role', 'search');
    caixa.innerHTML =
      '<label class="sr-only" for="pesquisa">Procurar na ementa</label>' +
      '<div class="pesquisa__campo">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>' +
      '<input id="pesquisa" type="search" placeholder="Procurar prato ou bebida" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="search">' +
      '</div>' +
      '<p class="pesquisa__estado" aria-live="polite"></p>';
    lado.insertBefore(caixa, indice);

    var vazio = document.createElement('p');
    vazio.className = 'pesquisa__vazio';
    vazio.hidden = true;
    carta.insertBefore(vazio, carta.firstChild);

    var campo = caixa.querySelector('input');
    var estado = caixa.querySelector('.pesquisa__estado');

    // índice de busca: cada item com o texto do nome, metadados e categoria
    var categorias = Array.prototype.slice.call(carta.querySelectorAll('.categoria'));
    var dados = categorias.map(function (cat) {
      var titulo = cat.querySelector('.categoria__titulo');
      var nomeCat = titulo ? norm(titulo.firstChild.textContent) : '';
      return {
        el: cat,
        nome: nomeCat,
        ligacao: indice.querySelector('a[href="#' + cat.id + '"]'),
        subs: Array.prototype.slice.call(cat.querySelectorAll('.categoria__sub')),
        itens: Array.prototype.slice.call(cat.querySelectorAll('.item')).map(function (li) {
          // subcategoria (ex.: “De pressão”): o título que vem logo antes da lista do item
          var lista = li.parentNode, sub = lista && lista.previousElementSibling;
          var nomeSub = sub && sub.classList.contains('categoria__sub') ? norm(sub.textContent) : '';
          return { el: li, texto: norm(li.textContent) + ' ' + nomeSub + ' ' + nomeCat };
        })
      };
    });
    var grupos = Array.prototype.slice.call(carta.querySelectorAll('.grupo'));
    var notas = Array.prototype.slice.call(carta.querySelectorAll('.categoria__nota, .carta__fim'));
    var total = dados.reduce(function (n, c) { return n + c.itens.length; }, 0);

    var mostra = function (el, sim) { if (el) el.classList.toggle('e-fora', !sim); };

    var filtrar = function () {
      var q = norm(campo.value);
      var palavras = q ? q.split(' ') : [];
      var n = 0;
      dados.forEach(function (c) {
        var visiveis = 0;
        c.itens.forEach(function (it) {
          var ok = palavras.every(function (p) { return it.texto.indexOf(p) >= 0; });
          mostra(it.el, ok);
          if (ok) visiveis++;
        });
        // subtítulos (ex.: “De pressão”) só ficam se a lista a seguir tiver resultados
        c.subs.forEach(function (h) {
          var lista = h.nextElementSibling;
          var tem = lista && lista.querySelector('.item:not(.e-fora)');
          mostra(h, !!tem || !q);
        });
        mostra(c.el, visiveis > 0);
        if (c.ligacao) mostra(c.ligacao.parentNode, visiveis > 0);
        n += visiveis;
      });
      grupos.forEach(function (g) {
        var tem = g.querySelector('.categoria:not(.e-fora)');
        mostra(g, !!tem);
        var lig = indice.querySelector('a[href="#' + g.id + '"]');
        if (lig) mostra(lig.parentNode, !!tem);
      });
      notas.forEach(function (p) { mostra(p, !q); });

      if (!q) {
        estado.textContent = '';
        vazio.hidden = true;
      } else if (n === 0) {
        estado.textContent = 'Nenhum resultado.';
        vazio.textContent = 'Não encontrámos “' + campo.value.trim() + '” na ementa. Experimente outra palavra ou pergunte à equipa.';
        vazio.hidden = false;
      } else {
        estado.textContent = n === 1 ? '1 resultado.' : n + ' resultados.';
        vazio.hidden = true;
      }
    };

    campo.addEventListener('input', filtrar);
    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && campo.value) { campo.value = ''; filtrar(); }
      // Enter: fecha o teclado do telemóvel e leva aos resultados
      if (e.key === 'Enter') {
        e.preventDefault();
        campo.blur();
        carta.scrollIntoView({ block: 'start' });
      }
    });
    campo.setAttribute('aria-describedby', 'pesquisa-ajuda');
    var ajuda = document.createElement('span');
    ajuda.id = 'pesquisa-ajuda';
    ajuda.className = 'sr-only';
    ajuda.textContent = 'Filtra os ' + total + ' pratos e bebidas enquanto escreve.';
    caixa.appendChild(ajuda);
  }

  // ——— Voltar ao topo ———
  var topo = document.querySelector('.ao-topo');
  if (topo) {
    var pendente = false;
    var atualizar = function () {
      pendente = false;
      topo.classList.toggle('visivel', window.scrollY > window.innerHeight * 1.2);
    };
    window.addEventListener('scroll', function () {
      if (!pendente) { pendente = true; requestAnimationFrame(atualizar); }
    }, { passive: true });
    atualizar();
  }
})();
