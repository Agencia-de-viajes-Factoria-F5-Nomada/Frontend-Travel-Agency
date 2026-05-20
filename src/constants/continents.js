export const CONTINENTS = [
  {
    name: 'Europa',
    emoji: '🌍',
    countries: [
      'Albania', 'Alemania', 'Andorra', 'Armenia', 'Austria', 'Azerbaiyán',
      'Bélgica', 'Bielorrusia', 'Bosnia y Herzegovina', 'Bulgaria', 'Chipre',
      'Croacia', 'Dinamarca', 'Eslovaquia', 'Eslovenia', 'España', 'Estonia',
      'Finlandia', 'Francia', 'Georgia', 'Grecia', 'Hungría', 'Irlanda',
      'Islandia', 'Italia', 'Kazajistán', 'Kosovo', 'Letonia', 'Liechtenstein',
      'Lituania', 'Luxemburgo', 'Macedonia', 'Malta', 'Moldavia', 'Mónaco',
      'Montenegro', 'Noruega', 'Países Bajos', 'Polonia', 'Portugal',
      'Reino Unido', 'República Checa', 'Rumanía', 'Rusia', 'San Marino',
      'Serbia', 'Suecia', 'Suiza', 'Turquía', 'Ucrania', 'Vaticano',
    ],
  },
  {
    name: 'América',
    emoji: '🌎',
    countries: [
      'Antigua y Barbuda', 'Argentina', 'Bahamas', 'Barbados', 'Belice',
      'Bolivia', 'Brasil', 'Canadá', 'Chile', 'Colombia', 'Costa Rica',
      'Cuba', 'Dominica', 'Ecuador', 'El Salvador', 'Estados Unidos',
      'Granada', 'Guatemala', 'Guyana', 'Haití', 'Honduras', 'Jamaica',
      'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú',
      'República Dominicana', 'San Cristóbal y Nieves', 'San Vicente y las Granadinas',
      'Santa Lucía', 'Surinam', 'Trinidad y Tobago', 'Uruguay', 'Venezuela',
    ],
  },
  {
    name: 'Asia',
    emoji: '🌏',
    countries: [
      'Afganistán', 'Arabia Saudí', 'Bangladés', 'Baréin', 'Birmania',
      'Brunéi', 'Bután', 'Camboya', 'Catar', 'China', 'Corea del Norte',
      'Corea del Sur', 'Emiratos Árabes Unidos', 'Filipinas', 'India',
      'Indonesia', 'Irak', 'Irán', 'Israel', 'Japón', 'Jordania',
      'Kirguistán', 'Kuwait', 'Laos', 'Líbano', 'Malasia', 'Maldivas',
      'Mongolia', 'Myanmar', 'Nepal', 'Omán', 'Pakistán', 'Palaos',
      'Papúa Nueva Guinea', 'Singapur', 'Siria', 'Sri Lanka', 'Tailandia',
      'Tayikistán', 'Timor Oriental', 'Turkmenistán', 'Uzbekistán', 'Vietnam',
      'Yemen',
    ],
  },
  {
    name: 'África',
    emoji: '🌍',
    countries: [
      'Angola', 'Argelia', 'Benín', 'Botsuana', 'Burkina Faso', 'Burundi',
      'Cabo Verde', 'Camerún', 'Chad', 'Comoras', 'Costa de Marfil',
      'Egipto', 'Eritrea', 'Etiopía', 'Gabón', 'Gambia', 'Ghana',
      'Guinea', 'Guinea-Bisáu', 'Guinea Ecuatorial', 'Kenia', 'Lesoto',
      'Liberia', 'Libia', 'Madagascar', 'Malaui', 'Malí', 'Marruecos',
      'Mauricio', 'Mauritania', 'Mozambique', 'Namibia', 'Níger', 'Nigeria',
      'República Centroafricana', 'República del Congo', 'República Democrática del Congo',
      'Ruanda', 'Santo Tomé y Príncipe', 'Senegal', 'Seychelles',
      'Sierra Leona', 'Somalia', 'Sudáfrica', 'Sudán', 'Sudán del Sur',
      'Suazilandia', 'Tanzania', 'Togo', 'Túnez', 'Uganda', 'Yibuti',
      'Zambia', 'Zimbabue',
    ],
  },
  {
    name: 'Oceanía',
    emoji: '🌊',
    countries: [
      'Australia', 'Fiyi', 'Islas Marshall', 'Islas Salomón', 'Kiribati',
      'Micronesia', 'Nauru', 'Nueva Zelanda', 'Samoa', 'Tonga', 'Tuvalu',
      'Vanuatu',
    ],
  },
]

export function getCountriesForContinents(selectedContinents) {
  if (!selectedContinents || selectedContinents.length === 0) return []
  const countries = new Set()
  CONTINENTS
    .filter(c => selectedContinents.includes(c.name))
    .forEach(c => c.countries.forEach(country => countries.add(country)))
  return [...countries].sort()
}

export function getContinentForCountry(country) {
  for (const continent of CONTINENTS) {
    if (continent.countries.includes(country)) return continent.name
  }
  return null
}
