# Product

<!-- impeccable:product-schema 1 -->

> Protótipo. Fontes: `conteudo/ficha.md` e `conteudo/ementa.md` / `conteudo/ementa.json` (2026-11-09). Grande parte da ficha foi compilada a partir de fontes na web (TheFork, TripAdvisor, Facebook, Instagram, viva-porto.pt, caldasdastaipas.com), não confirmada pelo restaurante. Tudo o que está marcado **(por confirmar)** não pode aparecer no site como facto até ser confirmado.

## Platform

web

Pensado primeiro para telemóvel (mobile-first); o computador é secundário.

## Stack

HTML e CSS estáticos, sem framework (decisão do utilizador). Alojamento previsto: GitHub Pages. Domínio `.pt`, pago pelo restaurante (por registar). A ementa vive num ficheiro de dados separado (`conteudo/ementa.json`) para ser atualizada sem tocar no design.

## Users

Ainda não existe site; o visitante chega sobretudo pelo telemóvel (pesquisa no Google/Maps, Instagram, links do TheFork), a decidir onde jantar ou a confirmar uma reserva.

- **Principal:** grupos de amigos e colegas (jantares de sexta, sábado e vésperas de feriado, aniversários, jantares de empresa); famílias da região de Guimarães e Braga (fins de semana); casais jovens à procura de um jantar informal.
- **Secundário:** trabalhadores locais; público vegetariano ou à procura de opções mais leves; turistas e visitantes da vila termal das Caldas das Taipas ou de quem foge ao centro histórico de Guimarães.

A tarefa no site: perceber o que é a casa, ver se a ementa e os preços servem o grupo, e reservar mesa.

## Product Purpose

Site do restaurante Taberna das Taipas, em Caldas das Taipas (Guimarães).

- **Ação principal:** reservar mesa, pelo TheFork (online) ou por telefone (recomendado para grupos e eventos).
- **Ação secundária:** ver a ementa completa no telemóvel, legível e com preços, para que as pessoas tenham noção dos pratos antes de vir.

Sucesso: mais reservas a chegar pelo site e uma ementa móvel que substitui as perguntas e as fotos de ementas tiradas por terceiros. Métricas concretas: por definir.

## Positioning

Taberna de tapas e petiscos ibéricos que junta a fartura e a alma de uma tasca tradicional minhota com a apresentação e o dinamismo de um gastrobar moderno. Criada para comer ao centro da mesa e partilhar, um conceito que, segundo o fundador, faltava na vila. O nome é uma homenagem direta às Caldas das Taipas.

Pratos de assinatura (da ementa): Francesinha (lombo de boi) especial à taberna, a versão vegetariana, Fondue de queijo brie com frutos do bosque, Ovos rotos com presunto, Camarão selvagem flambé em whisky, Sangrias de espumante.

## Operating Context

- **Morada:** Rua Professor Manuel José Pereira nº 630 R/C, 4805-128 Caldas das Taipas (Guimarães). Referência: a cerca de 200 m da Escola Secundária de Caldas das Taipas; rés-do-chão de prédio residencial com esplanada coberta à frente. (Referências de caminho por confirmar.)
- **Horário (por confirmar):** segunda a sábado 18:00–00:00 (cozinha a partir das ~19:00); domingo almoço 12:00–15:00 e jantar 17:00–22:30. Sem folga semanal. Férias anuais com datas variáveis, anunciadas no Facebook e Instagram. Há uma versão alternativa nas fontes (seg–qui 18h–23h, sex–dom 16h–24h); usar a primeira até confirmação.
- **Reservas:** TheFork — https://www.thefork.pt/restaurante/taberna-das-taipas-r754633 · Telefone +351 937 305 687 (principal) e +351 937 593 888 (alternativo). Sem reservas por WhatsApp nem email. Grupos grandes e eventos privados: por telefone, com antecedência. (Números por confirmar.)
- **Também:** take-away (por telefone) e entregas (contacto direto e Glovo Guimarães) (por confirmar).
- **Espaço:** sala com mesas de madeira modulares, esplanada exterior coberta, animais permitidos na esplanada; música ao vivo ou DJ em algumas noites (por confirmar).
- **Pagamento:** Multibanco, MB Way, dinheiro. Wi-Fi gratuito (por confirmar).
- **Preço médio:** 15–20 € por pessoa (por confirmar).
- **Contacto escrito:** mensagens no Facebook e Instagram; sem email público.
- **Redes:** Instagram @taberna_das_taipas (https://www.instagram.com/taberna_das_taipas/) · Facebook https://www.facebook.com/tabernadastaipas/
- **Quem mantém o site:** o utilizador (não o dono), incluindo atualizações da ementa.

## Capabilities and Constraints

- Ementa completa com preços em `conteudo/ementa.json` (estruturada) e `conteudo/ementa.md` (legível): Tapas, Peixe, Vegetariano, Carne, Snacks, Sobremesas, Menu infantil, e uma carta de bebidas longa (cervejas, sangrias, espumantes, vinhos por região, aperitivos, gins). Muda de forma sazonal e incremental (2 ou 3 novidades de cada vez); sobremesas rodam mais.
- Itens com `(N un.)` indicam quantidade servida. Há nomes muito compridos que o layout tem de aguentar.
- Sem sistema de reservas próprio: o site encaminha para o TheFork ou para o telefone.
- Línguas: português primeiro. Inglês fica para depois; o design deve deixar espaço para EN. Quem traduz e se os nomes dos pratos se traduzem: por decidir.
- Requisitos legais a incluir: política de privacidade, cookies (se houver), Livro de Reclamações Eletrónico.

**Por confirmar com o restaurante:**
- Alergénios por prato (obrigatório na UE; a ementa não os indica).
- Preços com IVA incluído; possível erro na Carioca de limão grande (0,9 €) vs normal (1 €); Bolinhos de bacalhau a 1 € por unidade?
- Se Burguesinha, Francesinha e Hambúrguer da secção Vegetariano são versões vegetarianas; a "Fitzinha" não aparece na ementa.
- Grafias: Ameijoa, Möet et chandon, Chardonay, 3 Montes / 3 Monts, Quinta dos Encados.
- Horário, telefones, take-away/entregas, música ao vivo, acessibilidade, pagamentos.

## Brand Commitments

- Nome: **Taberna das Taipas**. Aberta em outubro de 2015 (11.º aniversário em outubro de 2026) (por confirmar). Fundador e proprietário: Miguel Pereira, com mais de 20 anos em hotelaria e restauração antes de abrir a casa (por confirmar).
- Ambiente: descontraído, moderno, com energia viva e acolhedora.
- Logótipo básico existente: `conteudo/logo do restaurante.jpg`. Indicação do utilizador: a tipografia e as cores do site devem partir do logótipo.
- Não definido ainda: o que o dono não quer ver no site nem como não quer ser visto.

## Evidence on Hand

- **Fotografias reais de fotógrafo** em `conteudo/` (horizontais e verticais): fachada e entrada, interior (sala, balcão), esplanada, exterior com árvore de Natal, pratos (francesinha especial, hambúrguer, ovos rotos, pratos do mar, prato de carne com batatas, saladas, lagostas, pão com tostas, sobremesas, gelado e bolo), detalhes (azulejos e ardósia, louça), equipa (chef, dono, cozinha, sala, equipa junta, mesa atendida). A ficha indica que existe autorização escrita para usar as fotos.
- **Ementa real** com preços (ver acima).
- **Provas (todas por confirmar, não usar como facto):** selo TripAdvisor Travelers' Choice; nota 9,5/10 no TheFork; artigo na VIVA! Porto & Norte; menções na imprensa do Minho sobre a "Fitzinha"; coluna *Paladar* da Revista CHIC; visitas de figuras públicas; parcerias com adegas (Quinta de Curvos, Adega Mãe, Herdade de São Miguel).
- **Não existem:** citações de avaliações reais (a secção de avaliações da ficha está vazia). Não inventar testemunhos, notas, prémios nem números.

## Product Principles

1. **Reservar está sempre a um toque.** No telemóvel, TheFork e telefone ficam acessíveis em qualquer ponto da página, sem obrigar a procurar.
2. **A ementa é conteúdo, não um PDF.** Texto real, legível no telemóvel, com preços, alimentado pelo ficheiro de dados e fácil de atualizar por quem não é o dono.
3. **Só o que é verdade e está confirmado.** O que não foi confirmado fica marcado ou fora do site; nada de provas, horários ou alergénios inventados.
4. **Partilha à mesa.** A casa vende-se como sítio para grupos e para petiscar ao centro da mesa; o site fala para quem organiza o jantar do grupo.
5. **As fotografias reais fazem o trabalho.** A casa, os pratos e a equipa aparecem como são.

## Accessibility & Inclusion

- O site deve cumprir WCAG 2.2 AA, com alvos de toque confortáveis no telemóvel e números de telefone como links `tel:`.
- O restaurante declara entrada ao nível do solo, mesas móveis e casa de banho adaptada (por confirmar); se confirmado, é informação útil a mostrar.
- Alergénios por prato têm de constar quando forem fornecidos.
