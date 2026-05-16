const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`

const FALLBACK_IMAGES = [
  { keys: ['lisboa', 'lisbon'],                               image: U('1585208798174-6cedd86e019a') },
  { keys: ['praga', 'prague'],                                image: U('1564511287568-54483b52a35e') },
  { keys: ['sintra'],                                         image: U('1562195168-c82fea0f0953')    },
  { keys: ['viena', 'vienna'],                                image: U('1516550893923-42d28e5677af') },
  { keys: ['dubrovnik'],                                      image: U('1575540291670-8d3b26f7d327') },
  { keys: ['amsterdam', 'ámsterdam'],                         image: U('1459679749680-18eb1eb37418') },
  { keys: ['budapest'],                                       image: U('1616432902940-b7a1acbc60b3') },
  { keys: ['florencia', 'florence', 'firenze'],               image: U('1476362174823-3a23f4aa6d76') },
  { keys: ['santorini'],                                      image: U('1613395877344-13d4a8e0d49e') },
  { keys: ['estambul', 'istanbul'],                           image: U('1527838832700-5059252407fa') },
  { keys: ['edimburgo', 'edinburgh'],                         image: U('1535448033526-c0e85c9e6968') },
  { keys: ['cracovia', 'krakow', 'krakovia'],                 image: U('1636903364559-0dfc358abd94') },
  { keys: ['niza', 'nice'],                                   image: U('1643914729809-4aa59fdc4c17') },
  { keys: ['oslo'],                                           image: U('1561794047-33d68ec7f6f6')    },
  { keys: ['atenas', 'athens'],                               image: U('1603565816030-6b389eeb23cb') },
  { keys: ['londres', 'london'],                              image: U('1513635269975-59663e0ac1ad') },
  { keys: ['roma', 'rome'],                                   image: U('1552832230-c0197dd311b5')    },
  { keys: ['paris', 'parís'],                                 image: U('1502602317-55d81d100e22')    },
  { keys: ['berlin', 'berlín'],                               image: U('1560969184-10fe8719e047')    },
  { keys: ['tokio', 'tokyo'],                                 image: U('1540959733332-eab4deabeeaf') },
  { keys: ['bangkok'],                                        image: U('1508009603885-50cf7c579365') },
  { keys: ['bali'],                                           image: U('1537996194471-e657df975ab4') },
  { keys: ['nueva york', 'new york'],                         image: U('1485871024526-9ffeebb24c64') },
  { keys: ['mexico', 'méxico'],                               image: U('1518638150340-f706e86654de') },
  { keys: ['argentina', 'buenos aires'],                      image: U('1589909202802-8f4aab4c8ed1') },
  { keys: ['peru', 'perú', 'cusco', 'machu picchu'],          image: U('1526392060635-9d6019884377') },
  { keys: ['brasil', 'brazil', 'rio'],                        image: U('1483729600503-d74213ad0ea6') },
  { keys: ['colombia', 'cartagena'],                          image: U('1529686342540-1b43aec0df75') },
  { keys: ['alaska'],                                         image: U('1531176175280-0f09c9c7a7e0') },
  { keys: ['mundial', 'vuelta'],                              image: U('1488085061851-28f68be9f7e7') },
]

const normalize = (value = '') =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const getSearchText = (destination = {}) =>
  normalize([
    destination.destiny,
    destination.name,
    destination.hotelName,
    destination.hotelCity,
    destination.city,
    destination.country,
  ].filter(Boolean).join(' '))

export const getDestinationImage = (destination = {}) =>
  String(
    destination.hotelImageUrl   ||
    destination.hotel?.imageUrl ||
    destination.imageUrl        ||
    destination.image           ||
    ''
  ).trim()

export const getDestinationFallbackImage = (destination = {}) => {
  const text = getSearchText(destination)
  return FALLBACK_IMAGES.find(({ keys }) =>
    keys.some((key) => text.includes(normalize(key))),
  )?.image || ''
}