---
name: Taberna das Taipas
description: "Site do restaurante: reservar mesa e ver a ementa, primeiro no telemóvel. v2 “Padrão”."
colors:
  marca: "#86401e"
  marca-funda: "#6e3418"
  creme: "#f0d5ab"
  sobre-marca: "#fff7ec"
  fundo: "#fbf7f1"
  branco: "#ffffff"
  painel: "#f5e6cf"
  linha: "#e6d9c6"
  tinta: "#2b1a10"
  tinta-suave: "#6b4f3c"
  rodape: "#2b140a"
  rodape-texto: "#e8d3b6"
  sobre-foto: "#f6ead8"
typography:
  display:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(2.9rem, 13vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(2rem, 8vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.15
  lead:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(1.25rem, 5vw, 1.55rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  sm: "4px"
  btn: "6px"
  md: "8px"
  lg: "12px"
  pill: "999px"
spacing:
  borda: "clamp(1.25rem, 5vw, 3rem)"
  seccao: "clamp(3.5rem, 10vw, 6.5rem)"
  bloco: "1.75rem"
  largura: "72rem"
components:
  button-marca:
    backgroundColor: "{colors.marca}"
    textColor: "{colors.sobre-marca}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0 1.35rem"
    height: "48px"
  button-marca-hover:
    backgroundColor: "{colors.marca-funda}"
  button-linha:
    backgroundColor: "transparent"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0 1.35rem"
    height: "48px"
  button-claro:
    backgroundColor: "{colors.fundo}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.btn}"
    padding: "0 1.35rem"
    height: "48px"
  button-claro-hover:
    backgroundColor: "{colors.painel}"
  painel:
    backgroundColor: "{colors.painel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.md}"
    padding: "clamp(1.25rem, 5vw, 2.25rem)"
  talao:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.lg}"
    padding: "1.1rem 1.2rem 1.2rem"
  indice-pilula:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 0.85rem"
    height: "44px"
  indice-pilula-atual:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.fundo}"
---

# Design System: Taberna das Taipas

## Overview

**Creative North Star: "A Casa Aberta"**

O site abre a porta da casa. A primeira coisa que se vê é uma fotografia real, a toda a largura, e o resto da página é claro e arrumado como uma mesa posta: fundo de linho quente, texto castanho-escuro e serifa redonda para a voz da casa. Quem decide e reserva é o visitante; o desenho não se põe à frente das fotografias, da ementa nem dos preços.

A densidade é calma e o ritmo é vertical: secções largas com respiração generosa, uma única faixa escura a meio (o convite aos grupos) e o rodapé no mesmo castanho profundo. O castanho do logótipo é raro de propósito. Aparece no que se carrega (reservar, ligar, ligações) e no que é "da casa"; nunca como fundo de secção.

Tudo o que não está confirmado com o restaurante leva o sublinhado tracejado, nunca uma cor. Enquanto o site for protótipo, a legenda disso vive no rodapé ("Protótipo. O que está sublinhado a tracejado ainda está por confirmar com o restaurante."), não numa faixa no topo.

**Key Characteristics:**
- Fotografia real da casa como abertura, a toda a largura, com véus escuros só onde há texto.
- Página clara (linho quente) com uma faixa escura a meio e o rodapé escuro.
- Duas vozes: Young Serif para títulos e frases da casa, Figtree para tudo o que se lê ou se toca.
- Um único acento, o castanho do logótipo, guardado para ações e marcas "da casa".
- Talão de reserva sempre à mão: barra fixa no fundo (que nunca tapa conteúdo), cartão na coluna lateral da ementa larga.
- Movimento com uma só curva de saída exponencial; sem movimento, tudo já está no sítio.

## Colors

Uma paleta de linho e castanho, toda tirada do logótipo, com um único acento.

### Primary
- **Castanho do Logótipo** (marca): o acento único. Botão principal de reserva, ligações de morada e telefone, marca "da casa", dia de hoje no horário, títulos de grupo na ementa, anel de foco.
- **Castanho Tostado** (marca-funda): estado de toque e de passagem do botão principal. Nunca aparece em repouso.
- **Creme do Logótipo** (creme): o acento quando o fundo é escuro (ícones da faixa de grupos, anel de foco sobre a fotografia ou o rodapé).

### Neutral
- **Linho Quente** (fundo): o fundo de todas as páginas e da tira do índice.
- **Branco de Toalha** (branco): o talão de reserva e as pílulas do índice; é o que fica por cima do fundo.
- **Pão Torrado** (painel): painéis de informação (onde e quando, avisos da ementa), prato marcado na ementa, moldura das fotos enquanto carregam.
- **Risco de Giz** (linha): separadores de linhas da ementa, bordas do talão e do índice, trilho da barra dos pratos.
- **Tinta de Castanha** (tinta): todo o texto e os contornos do botão de linha.
- **Tinta Diluída** (tinta-suave): introduções, notas, metadados dos pratos, contagens.
- **Lareira** (rodape): rodapé, faixa de grupos e fundo enquanto a fotografia de abertura carrega.
- **Brasa Clara** (rodape-texto): texto corrido sobre a Lareira.
- **Texto sobre Foto** (sobre-foto) e **Sobre o Castanho** (sobre-marca): texto secundário sobre a fotografia de abertura, e texto dos botões castanhos e dos títulos sobre fundo escuro.

### Named Rules
**The Um Só Castanho Rule.** O castanho do logótipo marca o que se carrega e o que é da casa, e mais nada. Se uma secção precisa de peso, usa a Lareira (escuro) ou o Pão Torrado (painel), nunca o castanho como fundo.

**The Tracejado Rule.** "Por confirmar" é sempre sublinhado tracejado (1px, 60% da cor do texto) mais texto escondido para leitores de ecrã. Nunca cor, nunca ícone.

## Typography

**Display Font:** Young Serif (with Georgia, serif)
**Body Font:** Figtree (with system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** Uma serifa redonda e cheia, de letreiro de casa de pasto, contra uma sem serifa geométrica e clara. A serifa fala pela casa; a Figtree informa e serve.

### Hierarchy
- **Display** (400, clamp(2.9rem, 13vw, 5.75rem), 1): só o nome da casa sobre a fotografia de abertura, até 10ch.
- **Headline** (400, clamp(2rem, 8vw, 3.25rem), 1.08): títulos de secção. Na ementa, o título da página (até 4.5rem) e os grupos Comida/Bebidas (até 3.25rem, em castanho).
- **Title** (400, 1.3rem, 1.15): nomes dos pratos nos cartões, blocos do painel; as categorias da ementa sobem até 1.9rem.
- **Lead** (400, clamp(1.25rem, 5vw, 1.55rem), 1.45): a frase de apresentação da casa, em serifa, até 34ch.
- **Body** (400, 1.0625rem, 1.55): texto corrido, até 42–46ch; introduções a 1.08rem em Tinta Diluída.
- **Label** (700, 1rem, 1): botões. A navegação usa 650 a 0.98–1.05rem; as notas e metadados 0.85–0.95rem.

### Named Rules
**The Duas Vozes Rule.** Young Serif só em peso 400 e só para títulos, o nome da casa e a frase de apresentação. Preços, horários, botões e listas são sempre Figtree.

**The Preço Firme Rule.** Preços em Figtree 700, algarismos tabulares e alinhados, sem quebra de linha ("9,90 €").

## Layout

Mobile-first, com uma coluna até 48rem. Contentor de 72rem centrado, com margem lateral `borda` que respeita as safe areas do iPhone. As secções abrem com `seccao` (3.5–6.5rem) de espaço por cima e blocos internos de 1.75rem.

- **Telemóvel:** os pratos da casa são uma fila deslizante com encaixe (cartões de min(78%, 20rem)) e uma barra fina que mostra a posição. O talão é uma barra fixa no fundo, e a página reserva a altura medida do talão para nada ficar por baixo. Em paisagem baixa, o talão passa a uma só linha.
- **A partir de 48rem:** os pratos passam a grelha de 3 colunas. O talão continua barra, numa só linha, alinhada com o contentor de 72rem; a página reserva a altura dela.
- **A partir de 60rem:** grupos, onde e história em duas colunas (a foto de grupos vai para a esquerda). Na ementa, coluna lateral de 19rem, presa ao topo, com o talão por cima do índice, e a carta até 44rem.
- **Ementa no telemóvel:** índice em tira horizontal de pílulas, presa ao topo, que desliza para manter a categoria atual à vista.

**The Uma Banda Rule.** Só uma faixa escura a toda a largura no meio da página (Mesa para o grupo todo). O resto alterna pelo espaço, não por fundos.

## Elevation & Depth

Quase plano. A profundidade vem da fotografia e do contraste entre o claro e a Lareira, não de camadas. Há sombras só em poucos sítios: o talão em cartão na coluna da ementa e o botão de voltar ao topo, a moldura das fotos dos pratos e a borda superior do talão em barra.

### Shadow Vocabulary
- **Pousado** (`box-shadow: 0 0.75rem 2rem -1rem rgb(43 26 16 / 0.35), 0 0.15rem 0.4rem rgb(43 26 16 / 0.08)`): o talão em cartão na coluna lateral da ementa (a partir de 60rem) e o botão redondo de voltar ao topo.
- **Prato** (`box-shadow: 0 0.6rem 1.4rem -0.9rem rgb(43 26 16 / 0.45)`): a moldura de cada foto de prato.
- **Barra** (`box-shadow: 0 -0.5rem 1.5rem -0.75rem rgb(43 26 16 / 0.3)`): o talão fixo no fundo do telemóvel.

### Named Rules
**The Plano por Defeito Rule.** Painéis, linhas e pílulas não levam sombra. Se algo novo precisa de se destacar, recebe o Pão Torrado, não uma sombra.

## Shapes

Cantos discretos e consistentes. Fotos, painéis e o prato marcado usam 8px; botões 6px; o talão em cartão 12px. Pílulas totalmente redondas só no índice da ementa e na marca "hoje". O logótipo é sempre circular. As linhas da ementa são separadas por um fio de 1px em Risco de Giz, nunca por caixas.

## Components

### Buttons
- **Shape:** cantos discretos (6px), altura mínima de 48px, ícone de 1.1rem antes do texto quando há.
- **Primary (marca):** castanho do logótipo com texto Sobre o Castanho. É o único botão cheio de cor: reservar no TheFork, ligar para marcar.
- **Linha:** transparente com contorno interior de 1.5px em Tinta. É a alternativa ao lado do principal (Ligar, no talão).
- **Claro:** Linho Quente com texto Tinta, para usar sobre a fotografia ou a Lareira.
- **Toque e passagem:** escala para 0.97 ao toque (120ms). O primary escurece para Castanho Tostado; o linha e o claro ganham um véu de tinta a 7% ou Pão Torrado. A passagem do rato só existe com `(hover: hover) and (pointer: fine)`.

### Cards / Containers
- **Cartão de prato:** foto 4:3 em moldura de 8px com a sombra Prato, nome em Title, descrição curta em Tinta Diluída, preço firme. O cartão inteiro é a ligação para o prato na ementa. Ao tocar, a foto escurece e aproxima-se ligeiramente.
- **Painel:** Pão Torrado, 8px, padding de 1.25–2.25rem. Blocos internos separados por um fio castanho a 20%.

### Navigation
- **Cabeçalho:** logótipo circular à esquerda e três ligações em Figtree 650 (alvos de 44px). Na página inicial fica por cima da fotografia, em branco. A página atual e a passagem do rato mostram sublinhado de 2px.
- **Índice da ementa:** pílulas brancas com contorno em Risco de Giz. A categoria atual fica em Tinta com texto Linho. Os grupos Comida e Bebidas são rótulos em serifa castanha, sem pílula. No computador vira uma lista vertical na coluna lateral, com a categoria atual em Pão Torrado.

### Talão de reserva (signature)
A ação principal está sempre visível. Tem o título "Reservar mesa" em serifa, o estado em tempo real ("Aberto agora · fecha às 00:00" com um ponto castanho, "Abre às 18:00", "Fechado · abre amanhã às 18:00"; sem JavaScript, o horário completo) e dois botões: TheFork (primary) e Ligar (linha). É sempre uma barra fixa no fundo, que a página reserva por baixo para nunca tapar cartões nem texto: em duas linhas no telemóvel e numa só a partir de 48rem (e no telemóvel deitado). Só na ementa larga (60rem) passa a cartão no topo da coluna lateral. Sobe por último ao abrir a página e respeita a safe area de baixo do iPhone.

### Pesquisa da ementa
Campo branco de 48px com lupa, contorno em Risco de Giz e cantos de 8px, texto a 16px para o iPhone não aproximar a página. Filtra enquanto se escreve, sem acentos nem maiúsculas, também pelo nome da categoria; esconde categorias e entradas do índice sem resultados e anuncia a contagem para leitores de ecrã. Só existe com JavaScript.

### Voltar ao topo
Botão redondo branco de 48px com seta, sombra Pousado, no canto inferior direito acima do talão; aparece depois de descer pouco mais de um ecrã. Sem JavaScript é uma ligação castanha no fim da carta.

### Linha da ementa
Nome à esquerda e preço firme à direita, alinhados pela linha de base, separados por um fio de 1px. Os metadados vão por baixo, em Tinta Diluída. Os pratos da casa levam nome a 650 e a marca circular castanha. O prato aberto a partir da página inicial acende em Pão Torrado.

### Nota de protótipo no rodapé
A legenda do tracejado fica no rodapé, em Brasa Clara sobre a Lareira, na última linha antes do ©. Não há faixa no topo: o cabeçalho encosta ao topo e respeita a safe area do iPhone. Sai quando o site for oficial, junto com o `noindex` das páginas e o `X-Robots-Tag` de `_headers`.

## Do's and Don'ts

### Do:
- **Do** abrir com uma fotografia real da casa, a toda a largura, escurecida só no topo e na base para o texto se ler.
- **Do** guardar o castanho do logótipo (#86401e) para ações, ligações e marcas "da casa".
- **Do** marcar tudo o que está por confirmar com o sublinhado tracejado e o texto "(por confirmar)" para leitores de ecrã.
- **Do** manter alvos de toque de pelo menos 44px (48px nos botões) e pôr a passagem do rato atrás de `(hover: hover) and (pointer: fine)`.
- **Do** usar a mesma curva de saída (`cubic-bezier(0.16, 1, 0.3, 1)`) em todo o movimento e deixar tudo no sítio com `prefers-reduced-motion`.

### Don't:
- **Don't** usar o castanho do logótipo como fundo de secção; o peso vem da Lareira ou do painel.
- **Don't** pôr a Young Serif em preços, horários, botões ou listas, nem em pesos que não sejam 400.
- **Don't** acrescentar uma segunda faixa escura a meio da página.
- **Don't** usar fotos de banco ou fotos em que apareçam clientes identificáveis.
- **Don't** pôr sombras em painéis, linhas ou pílulas.
