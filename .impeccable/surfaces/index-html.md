---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["ementa.html"]
---

# Site da Taberna das Taipas — página inicial e ementa

## Scope and mode
- `index.html`: Persuade. Quem organiza o jantar do grupo, no telemóvel, ao fim do dia; decide e reserva.
- `ementa.html`: Read. Quem já quase decidiu e quer pratos e preços sem se perder em 255 itens. Gerada por `scripts/gerar-ementa.mjs` a partir de `conteudo/ementa.json`, sem JavaScript no browser.

## Job, action, proof
- Ação principal: reservar (TheFork ou `tel:`), a funcionar no primeiro ecrã e no talão fixo de ambas as páginas.
- Secundária: abrir a ementa.
- Provas sem link ficam fora. Horário, telefones, história, música ao vivo, acessibilidade: visíveis com marca "por confirmar" (sublinhado a tracejado + texto para leitores de ecrã).
- Fotos em destaque sem clientes identificáveis: pratos, sala, esplanada, fachada, equipa.

## Constraints
- HTML/CSS estáticos; JS só para "horário de hoje" no talão (sem JS mostra o horário completo).
- Mobile-first, WCAG 2.2 AA; laranja escurecido com texto claro.
- Sem PDF, pop-ups, música automática, fotos de banco; nem tasca velha nem cadeia genérica.
- PT apenas; espaço para EN depois.

## Direction contract

THESIS: O site é a mesa do grupo vista de cima: cada secção é louça posta ao centro para partilhar. Recusa o hero de foto a toda a largura com botão por cima e a grelha de cartões iguais.

OWN-WORLD: Toalha castanha do logótipo (#86401e) como chão de toda a página, sem secções brancas. Grés creme pintalgado com aro castanho: pratos redondos para comida, travessas de cantos arredondados para lugares e pessoas. Papel de talão creme para informação prática. Letra Bubblegum Sans (do logótipo) para títulos, sans de trabalho para texto. Uma só cor viva, laranja-gema escurecido, só para reservar. Confirmado em traço cheio; por confirmar a tracejado.

STORY: Percebe que é uma taberna de petiscos para partilhar nas Taipas, vê os pratos da casa com preço, acredita que serve o grupo dele, reserva pelo TheFork ou liga.

FIRST VIEWPORT: Telemóvel 390×844. Logótipo-selo no canto superior esquerdo e navegação curta à direita; título "Petiscos ao centro da mesa." grande, alinhado à borda esquerda; prato grande com os ovos rotos a sair pela direita do ecrã, prato pequeno com a francesinha sobreposto à esquerda, legendas com preço; talão "Reservar mesa" preso ao fundo com horário de hoje e botões TheFork (laranja) e Ligar.

FORM: Mesa partilhada vista de cima, candidato 6 da lista ordenada; seed:f9d5db07a47500a0. Assinatura: os pratos deslizam para o centro da mesa ao entrar no ecrã (único gesto de movimento). Talão de reserva é região fixa em ambas as páginas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
- Horário, telefones, alergénios, secção Vegetariano, história e música ao vivo por confirmar.
- Política de privacidade por fazer; inglês para depois.
