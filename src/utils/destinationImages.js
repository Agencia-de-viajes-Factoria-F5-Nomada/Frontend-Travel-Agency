const FALLBACK_IMAGES = [
  {
    keys: ['londres', 'london'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['roma', 'rome'],
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['paris', 'parís'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['amsterdam', 'ámsterdam'],
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['berlin', 'berlín'],
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['lisboa'],
    image: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['praga'],
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['viena'],
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['dubrovnik'],
    image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['tokio', 'tokyo'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['bangkok'],
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['bali'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['mexico', 'méxico'],
    image: 'https://images.unsplash.com/photo-1518659526054-190340b32735?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['nueva york', 'new york'],
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['alaska'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['canada', 'canadá'],
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=70',
  },
  {
    keys: ['vietnam'],
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=70',
  },
]

const normalize = (value = '') =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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
  String(destination.hotelImageUrl || destination.imageUrl || destination.image || '').trim()

export const getDestinationFallbackImage = (destination = {}) => {
  const text = getSearchText(destination)
  return FALLBACK_IMAGES.find(({ keys }) =>
    keys.some((key) => text.includes(normalize(key))),
  )?.image || ''
}
