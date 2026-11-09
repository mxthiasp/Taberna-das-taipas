---
name: Taberna das Taipas
description: Petiscos ao centro da mesa. A toalha castanha do logótipo, louça de grés pintalgado e papel de talão para reservar.
colors:
  toalha: "#86401e"
  toalha-funda: "#6e3418"
  creme: "#f0d5ab"
  creme-suave: "#e8c9a0"
  louca: "#f7eedd"
  aro: "#a8622c"
  papel: "#fbf4e6"
  papel-linha: "#e3d2b4"
  tinta: "#3a1d0f"
  tinta-suave: "#6b4630"
  gema: "#b6400c"
  gema-funda: "#96340a"
  gema-texto: "#fff6e8"
typography:
  display:
    fontFamily: "Bubblegum Sans, Trebuchet MS, sans-serif"
    fontSize: "clamp(3.1rem, 14.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  display-largo:
    fontFamily: "Bubblegum Sans, Trebuchet MS, sans-serif"
    fontSize: "clamp(5rem, 7.6vw, 7.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bubblegum Sans, Trebuchet MS, sans-serif"
    fontSize: "clamp(2.5rem, 10vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bubblegum Sans, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.75rem, 7vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 0.98
  title-sm:
    fontFamily: "Bubblegum Sans, Trebuchet MS, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.02
  body:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 750
    lineHeight: 1
  nav:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 650
    lineHeight: 1
  preco:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontWeight: 750
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
rounded:
  papel: "3px"
  botao: "4px"
  travessa: "clamp(1.2rem, 4vw, 2.2rem)"
  travessa-foto: "clamp(0.7rem, 2.4vw, 1.4rem)"
  pilula: "999px"
  prato: "50%"
spacing:
  borda: "clamp(1.25rem, 5vw, 3rem)"
  seccao: "clamp(4rem, 12vw, 8rem)"
  papel: "clamp(1.25rem, 5vw, 2.25rem)"
  item: "0.7rem"
  alvo: "44px"
  botao: "48px"
  talao-h: "7.25rem"
components:
  button-reservar:
    backgroundColor: "{colors.gema}"
    textColor: "{colors.gema-texto}"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0 1.25rem"
    height: "{spacing.botao}"
  button-reservar-hover:
    backgroundColor: "{colors.gema-funda}"
    textColor: "{colors.gema-texto}"
  button-linha:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0 1.25rem"
    height: "{spacing.botao}"
  button-creme:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.toalha-funda}"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0 1.25rem"
    height: "{spacing.botao}"
  button-creme-hover:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.toalha-funda}"
  prato:
    backgroundColor: "{colors.louca}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.prato}"
  travessa:
    backgroundColor: "{colors.louca}"
    rounded: "{rounded.travessa}"
    padding: "clamp(0.85rem, 3.2vw, 1.4rem)"
  papel:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.papel}"
    padding: "{spacing.papel}"
  talao:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    padding: "0.85rem clamp(1.25rem, 5vw, 3rem)"
  nav-link:
    textColor: "{colors.creme}"
    typography: "{typography.nav}"
    rounded: "{rounded.pilula}"
    height: "{spacing.alvo}"
  indice-link:
    textColor: "{colors.creme}"
    typography: "{typography.nav}"
    rounded: "{rounded.pilula}"
    padding: "0 0.85rem"
    height: "{spacing.alvo}"
  indice-grupo:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.toalha-funda}"
    rounded: "{rounded.pilula}"
    height: "{spacing.alvo}"
  item:
    textColor: "{colors.tinta}"
    typography: "{typography.body}"
    padding: "{spacing.item} 0"
---

# Design System: Taberna das Taipas

## Overview

**Creative North Star: "A mesa ao centro"**

O site é a mesa do grupo vista de cima. A página inteira é a toalha castanha do logótipo, com uma trama de fio muito leve, e tudo o que se mostra está pousado nela: a comida vem em pratos redondos de grés creme pintalgado com aro castanho, os lugares e as pessoas vêm em travessas de cantos arredondados, e a informação prática (horário, morada, a ementa inteira) vem em papel creme. Nada é um cartão de interface; cada superfície é um objeto da mesa.

A composição é solta e sobreposta, como louça posta para partilhar: pratos que saem pela borda do ecrã, pratos que se tocam, ligeiras inclinações. A densidade é baixa na página inicial e alta na ementa, onde o papel aguenta 255 linhas com preços alinhados. A letra dos títulos é a do logótipo, redonda e informal; o texto corrido é uma sans de trabalho, firme e legível. Há uma só cor viva, o laranja-gema, e pertence à reserva.

A verdade dos dados faz parte da linguagem visual: o que está confirmado escreve-se a traço cheio, o que está por confirmar sublinha-se a tracejado e diz-se aos leitores de ecrã. Fotografias reais da casa, sem clientes identificáveis em destaque.

**Key Characteristics:**
- Chão único castanho (toalha), sem secções brancas nem faixas de cor a toda a largura.
- Três materiais pousados: grés (pratos e travessas), papel (informação e ementa), talão perfurado (reserva).
- Fotografias sempre dentro de louça: no poço redondo de um prato ou no fundo de uma travessa.
- Uma cor viva, só para reservar.
- Um único gesto de movimento: os pratos deslizam para o centro da mesa.
- Por confirmar = sublinhado tracejado + texto só para leitores de ecrã; nunca cor.

## Colors

Uma paleta de taberna tirada do logótipo: castanho de toalha, cremes de grés e papel, tinta castanha-escura, e uma gema de laranja guardada para a ação.

### Primary
- **Laranja-gema** (gema): o fundo do botão "Reservar no TheFork" e nada mais. Escurecido para que o texto claro (gema-texto) passe AA, com cerca de 5:1. No hover desce para gema-funda.

### Neutral
- **Castanho-toalha** (toalha): o chão de todas as páginas, amostrado do castanho do logótipo. Leva a trama de fio por cima; nunca é substituído por branco ou cinzento.
- **Toalha funda** (toalha-funda): o rodapé, a tira do índice da ementa no telemóvel e o texto sobre creme.
- **Creme do logótipo** (creme): texto e títulos sobre a toalha, anel de foco sobre a toalha, a pílula do grupo no índice e o botão creme.
- **Creme suave** (creme-suave): texto secundário sobre a toalha (subtítulos, introduções, avisos, rodapé).
- **Grés** (louca): o vidrado dos pratos e travessas, com o padrão de pintas por cima.
- **Aro de grés** (aro): o aro castanho dos pratos e travessas e o contorno dos pontos de lista.
- **Papel** (papel): talão, folha da ementa, bloco de informação prática e a tira "Ver a ementa toda".
- **Linha de papel** (papel-linha): divisórias entre linhas da ementa e entre blocos no papel.
- **Tinta** (tinta): texto e títulos sobre papel e grés, contorno do botão de linha, anel de foco sobre papel.
- **Tinta suave** (tinta-suave): notas, metadados dos pratos, contagens e horas no talão.

### Named Rules
**The Gema Rule.** O laranja-gema só aparece no botão de reserva online. Nenhum título, ícone, sublinhado, foco ou destaque o usa. Se a gema aparece fora do talão, é um erro.

**The Toalha Rule.** O fundo da página é sempre a toalha. Superfícies claras existem só como objetos pousados (louça, papel, talão), com sombra própria, nunca como faixas de secção.

**The Tracejado Rule.** Texto por confirmar leva sublinhado tracejado (1.5px, offset 0.28em, na cor do próprio texto) e um sufixo só para leitores de ecrã "(por confirmar)". Confirmado leva traço cheio ou nenhum. A cor nunca carrega este significado.

## Typography

**Display Font:** Bubblegum Sans (com Trebuchet MS, sans-serif), auto-alojada, a letra do logótipo.
**Body Font:** Figtree (com system-ui, Segoe UI, sans-serif), auto-alojada, eixo de peso 400–800.

**Character:** Títulos redondos e bem-dispostos, como escritos à mão no quadro da casa; texto corrido limpo e firme, que aguenta nomes de pratos compridos e preços.

### Hierarchy
- **Display** (400, display / display-largo, 0.98): o título de abertura de cada página. Medida curta (8–9ch) na página inicial.
- **Headline** (400, headline, 0.98): títulos de secção sobre a toalha e grupos da ementa (Comida, Bebidas) sobre papel.
- **Title** (400, title, 0.98): categorias da ementa; nos blocos de papel e no talão a mesma letra desce para 1.4–1.65rem.
- **Title pequeno** (400, title-sm, 1.02): nome do prato nas legendas e dentro dos pratos só com texto.
- **Body** (400, body, 1.55): texto corrido, com medida de 30–40ch.
- **Body pequeno** (400, body-sm, 1.35): metadados de pratos, notas, horas do talão.
- **Label** (750, label): botões.
- **Nav** (650, nav): navegação e índice.
- **Preço** (750, algarismos tabulares e alinhados): todos os preços, sem quebra de linha.

### Named Rules
**The Duas Vozes Rule.** Bubblegum Sans só em títulos e nomes de pratos, sempre a peso 400; tudo o resto, incluindo botões, preços e navegação, é Figtree. Os grupos do índice da ementa são a única etiqueta em Bubblegum.

**The Preço Firme Rule.** Os preços são sempre Figtree 750 com algarismos tabulares, nunca quebram, e alinham à direita nas linhas da ementa.

## Layout

Mobile-first, pensado para 390px de largura. A margem lateral é uma só (borda), fluida. As secções da página inicial respiram com um espaço vertical largo (seccao) e não têm fundo próprio.

- **A mesa:** os pratos de assinatura assentam numa grelha de 6 colunas no telemóvel e 12 a partir de 60rem, com colocação manual por prato, margens negativas e sobreposições, para parecer louça posta e não uma grelha de cartões. Largura máxima 76rem.
- **Abertura:** no telemóvel, título alinhado à esquerda e pratos por baixo, o grande a sair pela direita do ecrã; a partir de 60rem, duas colunas (texto 0.95fr, mesa 1.05fr).
- **Blocos de texto + objeto:** onde, grupos e história alternam texto e travessa/papel em duas colunas iguais a partir de 60rem.
- **Ementa:** uma folha de papel com coluna de leitura de até 46rem; a partir de 60rem, coluna lateral fixa de 19rem com o talão por cima e o índice por baixo.
- **Talão:** no telemóvel, fixo ao fundo a toda a largura, com o corpo da página a reservar talao-h de espaço; a partir de 48rem, um talão de 25rem no canto inferior direito (página inicial) ou na coluna lateral (ementa).
- **Alvos de toque:** links e botões com pelo menos 44px de altura; botões 48px.
- **Breakpoints:** 48rem e 60rem.

## Elevation & Depth

A profundidade é física: cada objeto pousado na toalha projeta uma sombra castanha, macia e larga, deslocada para baixo, como luz de teto sobre a mesa. Não há sombras pretas, nem duras, nem deslocadas na diagonal. A louça tem ainda sombras interiores que desenham o aro e o poço do prato.

### Shadow Vocabulary
- **Sombra de louça** (`0 1.4rem 2.2rem -0.9rem rgb(42 14 2 / 0.55), 0 0.3rem 0.6rem -0.2rem rgb(42 14 2 / 0.35)`): pratos e travessas.
- **Aro** (`inset 0 0 0 var(--aro-w) var(--aro), inset 0 0 0 calc(var(--aro-w) + 2px) rgb(90 40 10 / 0.25)`): o aro castanho de cada peça de louça.
- **Poço** (`inset 0 0.25rem 0.8rem rgb(60 25 5 / 0.35)`): o fundo côncavo onde assenta a fotografia.
- **Sombra de papel** (`0 1.4rem 2.4rem -1.2rem rgb(42 14 2 / 0.55), 0 0.2rem 0.5rem rgb(42 14 2 / 0.25)`): blocos de papel e a folha da ementa.
- **Sombra do talão** (`0 -0.6rem 1.6rem -0.4rem rgb(42 14 2 / 0.45)` no telemóvel; `0 1.2rem 2.4rem -0.8rem rgb(42 14 2 / 0.6)` flutuante): o talão de reserva.

### Named Rules
**The Pousado Rule.** Só objetos pousados têm sombra, e a sombra cai sempre para baixo em castanho translúcido. Texto e botões não têm sombra.

## Shapes

Formas de louça e de papel. Os pratos são círculos perfeitos com aro e poço; as travessas são retângulos de cantos muito arredondados (travessa), com a fotografia num retângulo mais suave (travessa-foto). O papel tem cantos quase vivos (papel), como uma folha. Os botões têm cantos pequenos (botao); a navegação e o índice usam pílulas. O logótipo é um selo redondo.

Os objetos pousados inclinam-se ligeiramente: pratos de abertura até 8°, travessas e papel entre 0.6° e 1.5°. O talão tem o topo picotado, recortado por uma máscara de meias-luas de 0.9rem. Dentro do papel, os blocos separam-se com uma linha tracejada fina (papel-linha) e as linhas da ementa com uma linha cheia; entre os grandes grupos da ementa, um traço cheio de 2px em tinta.

## Components

### Buttons
Tácteis e diretos, sempre com rótulo em texto e ícone SVG de linha quando o ajuda.
- **Shape:** cantos pequenos (rounded.botao), altura 48px.
- **Reservar (gema):** fundo gema, texto gema-texto, Figtree 750. Só para "Reservar no TheFork".
- **Linha:** transparente com contorno interior de 2px em tinta; para "Ligar" no talão, sobre papel.
- **Creme:** fundo creme e texto toalha-funda; ação secundária sobre a toalha (ligar para grupos).
- **Hover / Focus / Active:** hover escurece (gema-funda), clareia (papel) ou dá um véu de tinta a 8%, em 200ms com ease-saida; foco é um anel de 3px em creme (sobre a toalha) ou tinta (sobre papel e talão), com 3px de afastamento; ativo desce 1px.

### Cards / Containers
Não há cartões. Há três objetos:
- **Prato:** círculo de grés pintalgado com aro; a fotografia vive num poço redondo a 13% da borda, enquadrada por --foco e --zoom. A variante só com texto escreve no fundo do prato o nome (Bubblegum), um detalhe e o preço, em tinta.
- **Travessa:** grés de cantos arredondados para lugares e pessoas (sala, esplanada, equipa, travessas de marisco).
- **Papel:** folha creme de cantos quase vivos, para horário, morada, telefones e a ementa inteira. A tira "Ver a ementa toda" é um pedaço de papel com seta que avança 0.3rem no hover.

### Navigation
- **Cabeçalho:** selo do logótipo à esquerda, três links curtos à direita em Figtree 650 creme, sem fundo. Hover e página atual: sublinhado cheio de 2px.
- **Índice da ementa:** no telemóvel, tira presa ao topo em toalha-funda que desliza na horizontal; categorias em pílulas de contorno creme a 45%, grupos em pílula creme cheia com Bubblegum. A partir de 60rem, lista vertical na coluna lateral, sem contornos, com sublinhado no hover.

### Talão de reserva (signature)
O talão é um bilhete de papel perfurado no topo, sempre presente em ambas as páginas: título "Reservar mesa" em Bubblegum, horário de hoje (preenchido por JavaScript na hora de Lisboa; sem JavaScript mostra o horário completo) marcado como por confirmar, e dois botões lado a lado (gema 1.5fr, linha 1fr). Fixo ao fundo no telemóvel, flutuante no canto no computador, e na coluna lateral da ementa.

### Linha da ementa (item)
Nome à esquerda, preço à direita em grelha com alinhamento à linha de base; metadados por baixo em tinta-suave; separação por linha cheia em papel-linha. Os pratos da casa levam o nome a 700 e uma marca "da casa" com um pequeno prato desenhado em SVG (dois círculos concêntricos).

### Movimento
Um só gesto: os pratos e travessas deslizam e rodam um pouco para o centro da mesa, vindos da esquerda ou da direita (`translate` e `rotate`, curva ease-saida `cubic-bezier(0.16, 1, 0.3, 1)`). Na abertura acontece ao carregar (900ms, o prato pequeno 120ms depois); na mesa acompanha o scroll com `animation-timeline: view()`. Com movimento reduzido não há animação nem scroll suave.

## Do's and Don'ts

### Do:
- **Do** pousar cada fotografia em louça: poço redondo de prato para comida, travessa para lugares e pessoas.
- **Do** manter a toalha (#86401e) como fundo único de todas as páginas, com a trama leve por cima.
- **Do** marcar tudo o que está por confirmar com sublinhado tracejado e o sufixo "(por confirmar)" só para leitores de ecrã.
- **Do** escrever preços em Figtree 750 com algarismos tabulares, sem quebra.
- **Do** dar a cada link e botão pelo menos 44px de altura e um anel de foco de 3px em creme ou tinta, conforme o chão.
- **Do** inclinar levemente os objetos pousados (0.6°–8°) e deixá-los sobrepor-se na mesa.
- **Do** desligar o deslize dos pratos e o scroll suave com prefers-reduced-motion.

### Don't:
- **Don't** usar o laranja-gema fora do botão de reserva online.
- **Don't** usar cor para indicar "por confirmar"; nem sublinhado tracejado em texto confirmado.
- **Don't** abrir secções brancas ou faixas de cor a toda a largura; o claro só existe como objeto pousado.
- **Don't** pôr uma fotografia a toda a largura com um botão por cima, nem alinhar pratos numa grelha de cartões iguais.
- **Don't** usar Bubblegum Sans em texto corrido, botões ou preços, nem em pesos falsos.
- **Don't** usar sombras pretas, duras ou deslocadas na diagonal.
- **Don't** pôr em destaque fotografias com clientes identificáveis.
- **Don't** acrescentar outro gesto de movimento além do deslize dos pratos.
