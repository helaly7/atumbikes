// Spanish home page (/es/). Wording only: layout lives in tools/locales.mjs.
// Adding a bike → add its id to `bikes` below.

export default {
  code: 'es', path: '/es/', dir: 'ltr', ogLocale: 'es_ES',
  name: 'Español', short: 'ES',
  fontLink: '',
  css: `
.hero h1{font-size:clamp(22px,7.4vw,94px)}
`,
  cat: { MTB: 'Bicicletas de montaña', Road: 'Bicicletas de carretera', Gravel: 'Bicicletas gravel', Hybrid: 'Bicicletas híbridas', City: 'Bicicletas urbanas' },
  catOne: c => c.replace('Bicicletas', 'Bicicleta').replace(/as$/, 'a'),
  size: s => s,
  sep: ', ',
  models: n => `${n} ${n === 1 ? 'modelo' : 'modelos'}`,
  price: 'Consultar precio', sizes: 'Tallas', more: 'Ficha técnica y fotos →',
  title: 'ATUM Bikes | Bicicletas de montaña, carretera, gravel e híbridas con Shimano',
  desc: n => `ATUM Bikes: ${n} modelos de bicicletas de montaña, carretera, gravel, híbridas y urbanas con componentes Shimano y garantía de por vida en el cuadro. Ficha técnica, tallas, colores y dónde comprar.`,
  ogTitle: 'ATUM Bikes', ogDesc: 'Bicicletas de montaña, carretera, gravel, híbridas y urbanas con componentes Shimano.',
  listName: 'Bicicletas ATUM',
  skip: 'Saltar al contenido', home: 'Inicio de ATUM', navLabel: 'Menú principal', langLabel: 'Idioma',
  nav: { bikes: 'Bicicletas', buy: 'Dónde comprar', contact: 'Contacto' },
  h1: 'ATUM | Grandes bicis<br>para grandes personas.',
  heroP: 'Bicicletas que combinan fuerza, estilo y precisión, montadas con componentes Shimano, para senderos de montaña, calles de ciudad y todo lo que hay entre medias.',
  heroCta: 'Ver las bicicletas', featured: 'Bicicletas destacadas',
  rangeH: 'La gama', rangeLede: 'Elige una categoría y abre cualquier bici para ver la ficha técnica, las fotos y los colores.', catsLabel: 'Categorías',
  note: 'Por ahora, las páginas de cada bicicleta (ficha técnica y galería) están en inglés.',
  contactH: 'Contacto', contactLede: 'Pregúntanos por una bici, una talla o un precio. Respondemos por correo, Facebook e Instagram.',
  mailSubject: 'Consulta sobre bicicletas ATUM',
  sr: { email: 'Correo', fb: 'Facebook', ig: 'Instagram', buy: 'Dónde comprar' },
  buyCard: 'Dónde comprar: tiendas oficiales ATUM',
  footer1: 'ATUM Bikes. Grandes bicis para grandes personas.', footer2: 'Garantía limitada de por vida en los cuadros ATUM.',
  bikes: {
    eclipse: {
      sub: 'Shimano 3 × 8, frenos Tektro',
      desc: 'Una híbrida 700C de aluminio 6061 con manillar recto, transmisión Shimano Acera y Tourney 3 × 8, frenos de pinza Tektro, bujes Joytech y patilla. Cómoda para ir al trabajo entre semana y con autonomía para una salida larga el domingo. La Eclipse X añade horquilla de suspensión bloqueable y frenos de disco Tektro M280.',
    },
    'eclipse-x': {
      sub: 'Horquilla de suspensión bloqueable, frenos de disco Tektro M280',
      desc: 'La Eclipse con horquilla de suspensión delantera bloqueable y frenos de disco Tektro M280. Todo lo demás es igual: una híbrida 700C de aluminio 6061 con manillar recto y transmisión Shimano Acera y Tourney 3 × 8.',
    },
    active: {
      sub: 'Cuadro bajo, horquilla de suspensión de 110 mm, guardabarros',
      desc: 'Una bicicleta urbana de 26 pulgadas con cuadro bajo de aluminio, horquilla de suspensión de 110 mm, frenos de disco, guardabarros plateados y cubiertas Kenda. El cuadro bajo hace que subir y bajar sea muy fácil. Disponible en cuatro colores.',
    },
    storm: {
      sub: 'Shimano 3 × 8, frenos de disco Tektro M280, horquilla de suspensión',
      desc: 'Una bicicleta de montaña de 29 pulgadas en aluminio 6061, con horquilla de suspensión con bloqueo y precarga, transmisión Shimano Altus y Tourney 3 × 8, frenos de disco Tektro M280, bujes Joytech y cubiertas Kenda, en cuatro colores.',
    },
    alpha: {
      sub: 'Horquilla de 110 mm, Shimano Altus 3 × 9, frenos de disco hidráulicos',
      desc: 'Una bicicleta de montaña de 29 pulgadas en aluminio, con horquilla de suspensión de 110 mm, transmisión Shimano Altus 3 × 9, frenos de disco hidráulicos y cubiertas Kenda, en cuatro colores.',
    },
    evo: {
      sub: 'Horquilla SR Suntour de 100 mm, Shimano Alivio 3 × 9, frenos hidráulicos',
      desc: 'Una bicicleta de montaña de 29 pulgadas con cuadro de aluminio 6061 y cableado interno, horquilla SR Suntour XCM30 de 100 mm con bloqueo remoto, transmisión Shimano Alivio 3 × 9, frenos de disco hidráulicos Shimano MT200 y cubiertas Kenda.',
    },
    'evo-pro': {
      sub: '20 velocidades Shimano Deore, horquilla RockShox, frenos hidráulicos',
      desc: 'Una bicicleta de montaña de 29 pulgadas con cuadro de aluminio 6061 y cableado interno, horquilla RockShox 30 Silver TK con bloqueo remoto Poploc, transmisión Shimano Deore 2 × 10, frenos de disco hidráulicos Shimano MT200 y cubiertas Kenda.',
    },
    phantom: {
      sub: 'Shimano Tiagra 2 × 10, horquilla de carbono',
      desc: 'Una bicicleta de carretera con cuadro de aluminio 6061, horquilla de carbono T800, grupo Shimano Tiagra 2 × 10 y frenos de pinza Tektro, en turquesa y amarillo o rojo y blanco. Unos 10,9 kg.',
    },
    'phantom-s': {
      sub: 'Shimano Sora R3000 2 × 9, horquilla de carbono',
      desc: 'Una bicicleta de carretera con cuadro ligero de aluminio 6061 y cableado totalmente interno, horquilla de fibra de carbono que absorbe las vibraciones del asfalto, grupo Shimano Sora R3000 2 × 9, bujes de rodamientos sellados y cubiertas Continental Ultra Sport.',
    },
    pulse: {
      sub: 'Shimano Claris R2000 2 × 8, cuadro de carretera de aluminio',
      desc: 'Una bicicleta de carretera para quien empieza a competir: cuadro ligero de aluminio 6061 con cableado interno, mandos integrados Shimano Claris R2000 de 8 velocidades, bielas Prowheel Ounce, frenos Tektro R313 y cubiertas Kenda 700 × 25c.',
    },
    gravity: {
      sub: 'Shimano Acera 3 × 8, horquilla SR Suntour, frenos hidráulicos',
      desc: 'Una bicicleta de montaña de 29 pulgadas con cuadro ligero de aluminio 6061, horquilla SR Suntour XCT-30 con bloqueo remoto, transmisión Shimano Acera 3 × 8, bujes de rodamientos sellados y frenos de disco hidráulicos Shimano MT200.',
    },
    gravel: {
      sub: 'Cuadro de aluminio 700c, frenos de disco, manillar de carretera',
      desc: 'Una bicicleta gravel 700c de aluminio con manillar de carretera, frenos de disco y cubiertas Kenda, para asfalto, pistas de tierra y todo lo que hay entre medias. Disponible en blanco y gris, o naranja y negro.',
    },
  },
};
