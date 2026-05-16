const FALLBACK_IMAGES = [
  { keys: ['londres', 'london'],                              image: 'https://picsum.photos/seed/london/800/480'    },
  { keys: ['roma', 'rome'],                                   image: 'https://picsum.photos/seed/rome/800/480'      },
  { keys: ['paris', 'parís'],                                 image: 'https://picsum.photos/seed/paris/800/480'     },
  { keys: ['amsterdam', 'ámsterdam'],                         image: 'https://picsum.photos/seed/amsterdam/800/480' },
  { keys: ['berlin', 'berlín'],                               image: 'https://picsum.photos/seed/berlin/800/480'    },
  { keys: ['lisboa'],                                         image: 'https://picsum.photos/seed/lisbon/800/480'    },
  { keys: ['praga'],                                          image: 'https://picsum.photos/seed/prague/800/480'    },
  { keys: ['viena'],                                          image: 'https://picsum.photos/seed/vienna/800/480'    },
  { keys: ['dubrovnik'],                                      image: 'https://picsum.photos/seed/dubrovnik/800/480' },
  { keys: ['tokio', 'tokyo'],                                 image: 'https://picsum.photos/seed/tokyo/800/480'     },
  { keys: ['bangkok'],                                        image: 'https://picsum.photos/seed/bangkok/800/480'   },
  { keys: ['bali'],                                           image: 'https://picsum.photos/seed/bali/800/480'      },
  { keys: ['mexico', 'méxico'],                               image: 'https://picsum.photos/seed/mexico/800/480'    },
  { keys: ['nueva york', 'new york'],                         image: 'https://picsum.photos/seed/newyork/800/480'   },
  { keys: ['alaska'],                                         image: 'https://picsum.photos/seed/alaska/800/480'    },
  { keys: ['canada', 'canadá'],                               image: 'https://picsum.photos/seed/canada/800/480'    },
  { keys: ['vietnam'],                                        image: 'https://picsum.photos/seed/vietnam/800/480'   },
  { keys: ['argentina', 'buenos aires'],                      image: 'https://picsum.photos/seed/buenosaires/800/480' },
  { keys: ['bolivia', 'la paz', 'salar', 'uyuni'],            image: 'https://picsum.photos/seed/bolivia/800/480'   },
  { keys: ['chile', 'santiago', 'patagonia', 'atacama'],      image: 'https://picsum.photos/seed/chile/800/480'     },
  { keys: ['peru', 'perú', 'lima', 'cusco', 'machu picchu'], image: 'https://picsum.photos/seed/peru/800/480'      },
  { keys: ['colombia', 'cartagena', 'bogota', 'medellin'],    image: 'https://picsum.photos/seed/colombia/800/480'  },
  { keys: ['brasil', 'brazil', 'rio'],                        image: 'https://picsum.photos/seed/brasil/800/480'    },
  { keys: ['mundial', 'vuelta'],                              image: 'https://picsum.photos/seed/world/800/480'     },
  { keys: ['sintra'],                                         image: 'https://picsum.photos/seed/sintra/800/480'    },
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