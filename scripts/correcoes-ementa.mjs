// Correções de grafia da ementa: acentos, nomes próprios e marcas, gralhas.
// A fonte (conteudo/ementa.json) fica como o restaurante a enviou; estas correções
// aplicam-se ao HTML com:  node scripts/corrigir-ementa.mjs
// O gerador da ementa da v2, quando existir, deve importar este mapa e aplicá-lo aos nomes.
//
// Só se corrige a forma (ortografia, maiúsculas de nomes próprios, marcas, preposições em falta);
// nunca o prato, o preço nem as quantidades. Chave = nome como aparece no HTML
// (sem o “(N un.)”, que vai para a linha de baixo).

export const NOMES = {
  // Tapas
  'Ameijoa à bulhão pato': 'Amêijoa à Bulhão Pato',
  'Calamares à andalusa com maionese limão': 'Calamares à andaluza com maionese de limão',
  'Calamares à romana com maionese limão': 'Calamares à romana com maionese de limão',
  'Choco frito de setúbal': 'Choco frito de Setúbal',
  'Cogumelos salteados (do-cardo, shitake, nameko) com gambas': 'Cogumelos salteados (do-cardo, shiitake, nameko) com gambas',
  'Lulinhas crocantes em tempura com maionese limão': 'Lulinhas crocantes em tempura com maionese de limão',
  'Zamburinas à la plancha': 'Zamburinhas à la plancha',
  // Carne
  'Entrecôte braseado c/ queijo gratinado batata rústica e salada gourmet': 'Entrecôte braseado c/ queijo gratinado, batata rústica e salada gourmet',
  // Snacks
  'Burguesinha (black angus) especial à taberna': 'Burguesinha (Black Angus) especial à taberna',
  'Cachorro especial com molho francesinha': 'Cachorro especial com molho de francesinha',
  '“O hambúrguer” artesanal (black angus) à taberna': '“O hambúrguer” artesanal (Black Angus) à taberna',
  // Sobremesas
  'Bolo de chocolate e bolacha oreo': 'Bolo de chocolate e bolacha Oreo',
  'Pudim abade priscos em cama de queijo curado': 'Pudim Abade de Priscos em cama de queijo curado',
  'Pudim abade priscos': 'Pudim Abade de Priscos',
  // Refrescos e cafetaria
  'Pedras salgadas': 'Pedras Salgadas',
  'Pedras salgadas limão': 'Pedras Salgadas limão',
  'Descafeínado': 'Descafeinado',
  // Cervejas
  'La trappe (0,25 l)': 'La Trappe (0,25 l)',
  'Gulden draak (0,25 l)': 'Gulden Draak (0,25 l)',
  '3 Montes (0,75 l)': '3 Monts (0,75 l)',
  'Bush caractére (0,33 l)': 'Bush Caractère (0,33 l)',
  'Bush caractére (0,75 l)': 'Bush Caractère (0,75 l)',
  'Charles v ruby (0,33 l)': 'Charles V Ruby (0,33 l)',
  'Charles v ruby (0,75 l)': 'Charles V Ruby (0,75 l)',
  'Delirium nocturnum (0,33 l)': 'Delirium Nocturnum (0,33 l)',
  'S. smith imperial stout ( 0,33 l)': 'S. Smith Imperial Stout (0,33 l)',
  'La chouffe (0,33 l)': 'La Chouffe (0,33 l)',
  'Piraat triple hop (0,33 l)': 'Piraat Triple Hop (0,33 l)',
  'St. louis (0,25 l)': 'St. Louis (0,25 l)',
  'Tripel karmeliet (0,33 l)': 'Tripel Karmeliet (0,33 l)',
  'Westmalle doble (0,33 l)': 'Westmalle Dubbel (0,33 l)',
  'Westmalle triple (0,33 l)': 'Westmalle Tripel (0,33 l)',
  // Espumantes e champanhes
  'Chão da portela': 'Chão da Portela',
  'Charles pelletier': 'Charles Pelletier',
  'Drappier cart d’or': 'Drappier Carte d’Or',
  'Möet et chandon': 'Moët & Chandon',
  'Ruinart blanc des blanc': 'Ruinart Blanc de Blancs',
  'Terras do demo': 'Terras do Demo',
  'Terras do demo rosé': 'Terras do Demo rosé',
  // Vinhos
  'Encosta do rolão': 'Encosta do Rolão',
  'Quinta de amares': 'Quinta de Amares',
  'Quinta de amares alvarinho': 'Quinta de Amares alvarinho',
  'Quinta de santa cristina avesso': 'Quinta de Santa Cristina avesso',
  'Quinta de santa cristina azal': 'Quinta de Santa Cristina azal',
  'Quinta de santa cristina grande escolha': 'Quinta de Santa Cristina grande escolha',
  'Quinta de santa cristina sauvignon blanc': 'Quinta de Santa Cristina sauvignon blanc',
  'Quinta de santa cristina padeiro': 'Quinta de Santa Cristina padeiro',
  'Quinta de santa cristina': 'Quinta de Santa Cristina',
  'Quinta santa cristina alvarinho': 'Quinta de Santa Cristina alvarinho',
  'Quinta dos encados': 'Quinta dos Encados',
  'Quinta vila nova chardonay': 'Quinta Vila Nova chardonnay',
  'Soalheiro allo': 'Soalheiro Allo',
  'Taberna das taipas': 'Taberna das Taipas',
  'Mateus rosé': 'Mateus Rosé',
  'Adega de monção': 'Adega de Monção',
  'Deu la deu': 'Deu-la-Deu',
  'Palácio da brejoeira': 'Palácio da Brejoeira',
  'Carm reserva': 'CARM reserva',
  'Carm': 'CARM',
  'Duas quintas': 'Duas Quintas',
  'Vale d’aldeia sauvignon blanc': 'Vale d’Aldeia sauvignon blanc',
  '18 By maniche reserva': '18 by Maniche reserva',
  '18 By maniche': '18 by Maniche',
  'Herdade de s. miguel escolha de enólogos': 'Herdade de São Miguel escolha de enólogos',
  'Herdade de s. miguel': 'Herdade de São Miguel',
  'Monte das servas': 'Monte das Servas',
  'Quinta do carmo': 'Quinta do Carmo',
  'Tapada do chaves': 'Tapada do Chaves',
  'Pêra manca': 'Pêra-Manca',
  'Adega mãe chardonay': 'Adega Mãe chardonnay',
  'Adega mãe sauvignon blanc': 'Adega Mãe sauvignon blanc',
  'Dona ermelinda': 'Dona Ermelinda',
  'João pires': 'João Pires',
  '0%Riginal ( sem alcool)': '0%riginal (sem álcool)',
  // Aperitivos e digestivos
  'Licor beirão': 'Licor Beirão',
  'Licor bolacha maria': 'Licor bolacha Maria',
  'Martini bianco': 'Martini Bianco',
  'Martini rosso': 'Martini Rosso',
  'Porto três velhotes (branco)': 'Porto Três Velhotes (branco)',
  'Porto três velhotes (tinto)': 'Porto Três Velhotes (tinto)',
  'Porto Dª antónia 10 anos (branco)': 'Porto D.ª Antónia 10 anos (branco)',
  'Porto Dª antónia 10 anos (tinto)': 'Porto D.ª Antónia 10 anos (tinto)',
  'Rhum': 'Rum',
  // Gins
  'Bombay original': 'Bombay Original',
  'Bombay saphire': 'Bombay Sapphire',
  'G’vine': 'G’Vine',
  'Hendricks': 'Hendrick’s',
  'Martin miller’s': 'Martin Miller’s'
};

// Descrições (linha de baixo do prato)
export const DESCRICOES = {
  'Queijo-presunto-chouriço-morcela e chouriça assada': 'Queijo, presunto, chouriço, morcela e chouriça assada'
};
