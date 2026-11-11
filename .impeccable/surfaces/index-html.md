---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["ementa.html"]
---

# Site da Taberna das Taipas — página inicial e ementa (v2 “Padrão”)

## Scope and mode
- `index.html`: Persuade. O público é quem organiza o jantar do grupo, no telemóvel, ao fim do dia: decide e reserva.
- `ementa.html`: Read. O público já quase decidiu e quer ver pratos e preços sem se perder em 255 itens.
  - Foi gerada por `versoes/v2-padrao/gerar-ementa.mjs` a partir de `conteudo/ementa.json`. Esse gerador não está neste projeto.
  - `scripts/gerar-ementa.mjs` é o gerador da v1 e recusa substituir esta ementa.
  - Até haver um gerador da v2, alterações à ementa fazem-se no HTML com cuidado, ou primeiro adapta-se o gerador.

## Job, action, proof
- **Ação principal:** reservar, pelo TheFork ou por `tel:`.
  - O talão está sempre à vista nas duas páginas: barra fixa no telemóvel, cartão no canto no computador, por cima do índice na ementa.
  - Os grupos também podem ligar a partir da faixa escura.
- **Ação secundária:** abrir a ementa.
  - Botão "Ver a ementa" sobre a fotografia de abertura.
  - Cada cartão de prato liga ao prato na ementa (`ementa.html#…`), onde o prato acende.
  - "Ver a ementa completa" no fim dos pratos da casa.
- **Provas:** as que não têm link ficam fora.
  - Horário, telefones, "desde 2015", francesinha vegetariana, música ao vivo e acessibilidade aparecem com a marca "por confirmar": sublinhado tracejado e texto para leitores de ecrã.
- **Fotos em destaque:** sem clientes identificáveis. Usar pratos, sala, esplanada e equipa.

## Constraints
- **Código:** HTML e CSS estáticos. O JavaScript (`assets/js/hoje.js`) só acrescenta:
  - o horário de hoje no talão;
  - a marca "hoje" no horário;
  - a categoria atual no índice da ementa;
  - a barra de posição dos pratos.
  Sem JavaScript, tudo funciona e mostra o horário completo.
- **Telemóvel e acessibilidade:**
  - Mobile-first, WCAG 2.2 AA, alvos de toque de 44–48px.
  - Passagem do rato só com `(hover: hover) and (pointer: fine)`.
  - Safe areas do iPhone respeitadas.
  - Com `prefers-reduced-motion`, nada se mexe.
- **Fora de questão:** ementa em PDF, pop-ups, música automática e fotos de banco.
- **Língua:** só português (PT-PT), com espaço para inglês depois.
- **A faixa "Protótipo · não é o site oficial"** é temporária. Sai antes de o site ir para o ar: apagar o bloco marcado no CSS e a linha `<p class="prototipo">` nas duas páginas.
- **Indexação:** as páginas levam `noindex, nofollow` enquanto forem protótipo.

## Direction contract

THESIS: "A Casa Aberta": o site abre a porta da casa com uma fotografia real dos pratos e deixa o resto claro e arrumado, para a ementa, os preços e a reserva se lerem sem esforço. A personalidade vem das fotografias, da serifa redonda e do castanho do logótipo usado com parcimónia. A decoração não carrega a personalidade.

OWN-WORLD: Sistema em DESIGN.md (v2, commit d22b4e5).
- **Cores:** fundo Linho Quente (#fbf7f1), texto Tinta de Castanha (#2b1a10), painéis Pão Torrado (#f5e6cf), fios Risco de Giz (#e6d9c6). Um único acento, o Castanho do Logótipo (#86401e), só para ações, ligações e marcas "da casa". A Lareira (#2b140a) é usada só no rodapé, na faixa dos grupos e na faixa do protótipo.
- **Letras:** Young Serif 400 para títulos e para a frase da casa; Figtree para tudo o resto.
- **Movimento:** uma só curva de saída exponencial.

STORY: O visitante vê a francesinha e o nome da casa e percebe que é uma taberna de petiscos para partilhar nas Taipas. A seguir vê os pratos da casa com foto e preço e as linhas "também da casa", e acredita que serve o grupo dele na faixa "Mesa para o grupo todo". Confirma onde e quando, e reserva pelo talão (TheFork) ou liga.

FIRST VIEWPORT: Telemóvel com 390×844.
- **Faixa do protótipo** no topo.
- **Fotografia da francesinha** a toda a largura, com véus escuros só no topo e na base.
- **Cabeçalho branco** por cima da foto: logótipo circular à esquerda; Ementa, Grupos e Onde à direita.
- **Em baixo, sobre a foto:**
  - "Taberna das Taipas" em Young Serif grande;
  - a frase "Tapas e petiscos ibéricos para partilhar ao centro da mesa, em Caldas das Taipas.";
  - o botão claro "Ver a ementa".
- **Talão "Reservar mesa"** preso ao fundo, com o horário de hoje e os botões TheFork (castanho) e Ligar (contorno).

FORM: É a v2 "Padrão", publicada em tt-prototipo.pages.dev e importada como versão de trabalho (tag v2). Não veio de uma seed deste projeto.
- **Ritmo da página:**
  - abertura em fotografia;
  - apresentação em duas vozes (título e frase em serifa);
  - fila deslizante de 6 cartões de prato no telemóvel, que passa a grelha de 3 colunas a partir de 48rem;
  - "Também da casa" em linhas de ementa;
  - uma faixa escura para os grupos;
  - painel "Onde e quando";
  - história;
  - rodapé escuro.
- **Assinatura de movimento:**
  - ao abrir, a foto assenta, o texto sobe e o talão sobe por último;
  - ao descer, a foto de abertura fica para trás, as fotos das secções revelam-se de baixo para cima e os cartões sobem;
  - na ementa, o índice acompanha a categoria e o prato de destino acende.

FINISH: A v2 está documentada (DESIGN.md e .impeccable/design.json, commit d22b4e5), mas ainda não passou pela revisão final do Impeccable neste projeto. Cada imagem nova leva a sua origem (embed-prompt). Qualquer alteração ao design acaba com essa revisão e com o DESIGN.md atualizado.

## Unresolved
- Horário, telefones, alergénios, secção Vegetariano, "desde 2015", história e música ao vivo: por confirmar com o restaurante.
- Build: `node scripts/build.mjs` monta `dist/` (páginas, 404.html, manifest, ícones, assets) e troca `{{SITE_URL}}` (definido em `scripts/paginas.mjs`). `qr-mesa.html` é uma página interna (noindex, sem ligação no site) para imprimir quatro cartões A6 por folha A4 com o código QR da ementa (`{{QR_EMENTA}}`, gerado no build com scripts/vendor/qrcode-generator-1.4.4.cjs, licença MIT); o QR muda com SITE_URL, por isso os cartões reimprimem-se quando o domínio mudar.
- Gerador da ementa da v2 em falta: trazer `versoes/v2-padrao/gerar-ementa.mjs` ou adaptar `scripts/gerar-ementa.mjs` para produzir o HTML da v2.
- Faixa sazonal "Jantares de Natal de empresa" dentro da faixa escura dos grupos: desligar depois do Natal com o atributo hidden no <aside class="natal">. As meta tags de partilha e as ligações ao manifest/ícone do ecrã principal (site.webmanifest, apple-touch-icon.png) estão escritas à mão na ementa.html, tal como a ligação "Voltar ao topo" e o <script src="assets/js/ementa.js"> (pesquisa); o gerador da v2, quando existir, tem de os incluir.
- Domínio `.pt` por registar; política de privacidade por fazer; inglês para depois.
