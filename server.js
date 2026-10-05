const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const clubs = [
  {
    id: 'club-1',
    name: 'La Playa Night',
    city: 'Córdoba',
    neighborhood: 'Villa Urquiza',
    address: 'Av. Colón 1420',
    genre: 'House + Techno',
    vibe: 'VIP + lounge',
    rating: 4.8,
    capacity: 800,
    email: 'playa@nightmarket.app',
    password: 'boliche123',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    description: 'Una experiencia premium con música relajada, lounge y una terraza increíble.',
    commissionRate: 0.12
  },
  {
    id: 'club-2',
    name: 'Pulse Disco',
    city: 'Buenos Aires',
    neighborhood: 'Palermo',
    address: 'Humboldt 710',
    genre: 'Electro + reggaeton',
    vibe: 'Alta energía',
    rating: 4.9,
    capacity: 1200,
    email: 'pulse@nightmarket.app',
    password: 'boliche123',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    description: 'Noche intensa, DJs internacionales y ambiente premium para bailar toda la noche.',
    commissionRate: 0.1
  },
  {
    id: 'club-3',
    name: 'Ritmo Rooftop',
    city: 'Mendoza',
    neighborhood: 'Centro',
    address: 'San Martín 1100',
    genre: 'Latina + funk',
    vibe: 'Terraza',
    rating: 4.7,
    capacity: 500,
    email: 'ritmo@nightmarket.app',
    password: 'boliche123',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
    banner: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80',
    description: 'La mejor terraza de la zona con música en vivo y una vista espectacular.',
    commissionRate: 0.15
  }
];

const events = [
  {
    id: 'evt-1',
    clubId: 'club-1',
    title: 'Sunset Sessions',
    date: '2026-10-15T22:30:00.000Z',
    city: 'Córdoba',
    neighborhood: 'Villa Urquiza',
    badge: 'House',
    music: 'House / Deep',
    description: 'Noche relajada con DJ set, coctelería y vista al jardín.',
    price: 1800,
    capacity: 250,
    sold: 120,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'evt-2',
    clubId: 'club-2',
    title: 'Neon Arena',
    date: '2026-10-18T23:00:00.000Z',
    city: 'Buenos Aires',
    neighborhood: 'Palermo',
    badge: 'Electro',
    music: 'Electro / Reggaeton',
    description: 'La noche más intensa del mes con la mejor energía y visuales.',
    price: 2600,
    capacity: 500,
    sold: 300,
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'evt-3',
    clubId: 'club-3',
    title: 'Ritmo en la Azotea',
    date: '2026-10-20T22:00:00.000Z',
    city: 'Mendoza',
    neighborhood: 'Centro',
    badge: 'Latina',
    music: 'Latina / Disco',
    description: 'Fiesta de terraza con música en vivo y ambiente premium.',
    price: 2200,
    capacity: 220,
    sold: 140,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'evt-4',
    clubId: 'club-1',
    title: 'Moonlight Brunch Club',
    date: '2026-10-25T19:00:00.000Z',
    city: 'Córdoba',
    neighborhood: 'Villa Urquiza',
    badge: 'Lounge',
    music: 'Lounge / Chill',
    description: 'Brunch con DJs, cócteles y buena vibra para cerrar el sábado.',
    price: 1400,
    capacity: 180,
    sold: 95,
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
    featured: false
  }
];

const orders = [];

const formatPrice = (value) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
}).format(value);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, app: 'NightMarket MVP', timestamp: new Date().toISOString() });
});

app.get('/api/clubs', (req, res) => {
  const sanitized = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    city: club.city,
    neighborhood: club.neighborhood,
    address: club.address,
    genre: club.genre,
    vibe: club.vibe,
    rating: club.rating,
    capacity: club.capacity,
    image: club.image,
    description: club.description,
    commissionRate: club.commissionRate
  }));
  res.json(sanitized);
});

app.get('/api/events', (req, res) => {
  const enriched = events.map((event) => {
    const club = clubs.find((c) => c.id === event.clubId);
    return {
      ...event,
      clubName: club?.name || 'Boliche',
      clubCity: club?.city || event.city,
      clubImage: club?.image || event.image,
      formattedDate: formatDate(event.date),
      priceFormatted: formatPrice(event.price)
    };
  });
  res.json(enriched);
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ message: 'Evento no encontrado' });
  }

  const club = clubs.find((c) => c.id === event.clubId);
  return res.json({
    ...event,
    clubName: club?.name || 'Boliche',
    clubCity: club?.city || event.city,
    clubImage: club?.image || event.image,
    formattedDate: formatDate(event.date),
    priceFormatted: formatPrice(event.price),
    commissionRate: club?.commissionRate || 0.12
  });
});

app.get('/api/club/:id', (req, res) => {
  const club = clubs.find((c) => c.id === req.params.id);
  if (!club) return res.status(404).json({ message: 'Boliche no encontrado' });

  const clubEvents = events.filter((event) => event.clubId === club.id);
  res.json({
    ...club,
    events: clubEvents.map((event) => ({
      id: event.id,
      title: event.title,
      formattedDate: formatDate(event.date),
      price: event.price,
      sold: event.sold,
      capacity: event.capacity,
      badge: event.badge,
      image: event.image
    }))
  });
});

app.get('/api/club/:id/metrics', (req, res) => {
  const club = clubs.find((c) => c.id === req.params.id);
  if (!club) return res.status(404).json({ message: 'Boliche no encontrado' });

  const clubEvents = events.filter((event) => event.clubId === club.id);
  const totalSold = clubEvents.reduce((sum, event) => sum + event.sold, 0);
  const totalCapacity = clubEvents.reduce((sum, event) => sum + event.capacity, 0);
  const avgPrice = clubEvents.length ? Math.round(clubEvents.reduce((sum, event) => sum + event.price, 0) / clubEvents.length) : 0;
  const totalRevenue = clubEvents.reduce((sum, event) => sum + (event.sold * event.price), 0);

  res.json({
    clubName: club.name,
    totalEvents: clubEvents.length,
    totalSold,
    totalCapacity,
    avgPrice,
    totalRevenue: formatPrice(totalRevenue),
    commission: formatPrice(totalRevenue * club.commissionRate),
    liveEvents: clubEvents.map((event) => ({
      id: event.id,
      title: event.title,
      sold: event.sold,
      remaining: Math.max(event.capacity - event.sold, 0),
      price: formatPrice(event.price),
      formattedDate: formatDate(event.date)
    }))
  });
});

app.post('/api/club/login', (req, res) => {
  const { email, password } = req.body || {};
  const club = clubs.find((c) => c.email === email && c.password === password);

  if (!club) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({
    success: true,
    club: {
      id: club.id,
      name: club.name,
      city: club.city,
      email: club.email,
      commissionRate: club.commissionRate
    }
  });
});

app.post('/api/club/events', (req, res) => {
  const { clubId, title, date, price, capacity, music, description, image } = req.body || {};
  const club = clubs.find((c) => c.id === clubId);

  if (!club) return res.status(404).json({ message: 'Boliche no encontrado' });

  const newEvent = {
    id: `evt-${Date.now()}`,
    clubId: club.id,
    title: title || 'Nuevo evento',
    date: date || new Date(Date.now() + 86400000).toISOString(),
    city: club.city,
    neighborhood: club.neighborhood,
    badge: music || 'Especial',
    music: music || 'Mix',
    description: description || 'Nueva experiencia para la noche.',
    price: Number(price) || 1500,
    capacity: Number(capacity) || 100,
    sold: 0,
    image: image || club.banner,
    featured: true
  };

  events.unshift(newEvent);
  res.status(201).json({ success: true, event: newEvent });
});

app.post('/api/checkout', (req, res) => {
  const { items = [], customerName = 'Cliente' } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No se seleccionaron entradas' });
  }

  const orderItems = items.map((item) => {
    const event = events.find((e) => e.id === item.eventId);
    if (!event) throw new Error('Evento no encontrado');
    return {
      eventId: event.id,
      title: event.title,
      clubName: clubs.find((c) => c.id === event.clubId)?.name || 'Boliche',
      quantity: Number(item.quantity) || 1,
      unitPrice: event.price,
      subtotal: event.price * (Number(item.quantity) || 1)
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const commission = total * 0.1;
  const order = {
    id: `ord-${Date.now()}`,
    customerName,
    items: orderItems,
    total,
    commission,
    createdAt: new Date().toISOString(),
    status: 'paid'
  };

  orders.push(order);

  orderItems.forEach(({ eventId, quantity }) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      event.sold += quantity;
    }
  });

  res.status(201).json({
    success: true,
    order,
    paymentSummary: {
      total: formatPrice(total),
      commission: formatPrice(commission),
      net: formatPrice(total - commission)
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NightMarket MVP corriendo en http://localhost:${PORT}`);
});
