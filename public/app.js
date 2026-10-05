const state = {
  events: [],
  selectedFilter: 'all',
  search: '',
  currentEvent: null,
  quantity: 1
};

const elements = {
  grid: document.getElementById('eventsGrid'),
  clubsGrid: document.getElementById('clubsGrid'),
  searchInput: document.getElementById('searchInput'),
  heroPrimary: document.getElementById('hero-primary'),
  modal: document.getElementById('eventModal'),
  modalImage: document.getElementById('modalImage'),
  modalBadge: document.getElementById('modalBadge'),
  modalTitle: document.getElementById('modalTitle'),
  modalClub: document.getElementById('modalClub'),
  modalDate: document.getElementById('modalDate'),
  modalDescription: document.getElementById('modalDescription'),
  modalLocation: document.getElementById('modalLocation'),
  modalAvailable: document.getElementById('modalAvailable'),
  modalPrice: document.getElementById('modalPrice'),
  qtyValue: document.getElementById('qtyValue'),
  toast: document.getElementById('toast')
};

async function loadData() {
  const [eventsRes, clubsRes] = await Promise.all([
    fetch('/api/events'),
    fetch('/api/clubs')
  ]);

  const events = await eventsRes.json();
  const clubs = await clubsRes.json();

  state.events = events;
  renderEvents();
  renderClubs(clubs);
}

function renderClubs(clubs) {
  elements.clubsGrid.innerHTML = clubs.map((club) => `
    <article class="club-card">
      <img src="${club.image}" alt="${club.name}" />
      <div class="club-top">
        <strong>${club.name}</strong>
        <span class="club-badge">★ ${club.rating}</span>
      </div>
      <p>${club.genre} · ${club.neighborhood}</p>
      <div class="club-footer">
        <span>${club.city}</span>
        <span>${club.vibe}</span>
      </div>
    </article>
  `).join('');
}

function getFilteredEvents() {
  const search = state.search.toLowerCase().trim();
  return state.events.filter((event) => {
    const matchesFilter = state.selectedFilter === 'all' || event.badge === state.selectedFilter || event.music.includes(state.selectedFilter);
    const matchesSearch = !search || event.title.toLowerCase().includes(search) || event.clubName.toLowerCase().includes(search) || event.city.toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });
}

function renderEvents() {
  const events = getFilteredEvents();

  elements.grid.innerHTML = events.map((event) => `
    <article class="event-card">
      <img src="${event.image}" alt="${event.title}" />
      <div class="event-body">
        <div class="event-head">
          <span>${event.clubName}</span>
          <span class="event-price">${event.priceFormatted}</span>
        </div>
        <h3>${event.title}</h3>
        <div class="event-meta">
          <span>${event.formattedDate}</span>
          <span>${event.badge}</span>
        </div>
        <p>${event.description}</p>
        <div class="card-footer">
          <span class="tiny-pill">${event.sold}/${event.capacity} vendidos</span>
          <button data-id="${event.id}">Reservar</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => openEventModal(button.dataset.id));
  });
}

function openEventModal(eventId) {
  const event = state.events.find((item) => item.id === eventId);
  if (!event) return;

  state.currentEvent = event;
  state.quantity = 1;

  elements.modalImage.src = event.image;
  elements.modalBadge.textContent = event.badge;
  elements.modalTitle.textContent = event.title;
  elements.modalClub.textContent = `${event.clubName} · ${event.city}`;
  elements.modalDate.textContent = event.formattedDate;
  elements.modalDescription.textContent = event.description;
  elements.modalLocation.textContent = `${event.neighborhood}, ${event.city}`;
  elements.modalAvailable.textContent = `${Math.max(event.capacity - event.sold, 0)} disponibles`;
  elements.modalPrice.textContent = event.priceFormatted;
  elements.qtyValue.textContent = String(state.quantity);

  elements.modal.classList.remove('hidden');
}

function closeModal() {
  elements.modal.classList.add('hidden');
  state.currentEvent = null;
  state.quantity = 1;
}

async function confirmPurchase() {
  if (!state.currentEvent) return;

  const payload = {
    customerName: 'Cliente NightMarket',
    items: [{ eventId: state.currentEvent.id, quantity: state.quantity }]
  };

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) {
    showToast(data.message || 'No se pudo completar la compra');
    return;
  }

  showToast(`Compra confirmada · ${data.paymentSummary.total}`);
  closeModal();
  await loadData();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden');

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, 2600);
}

document.getElementById('goBuying').addEventListener('click', () => {
  document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('hero-primary').addEventListener('click', () => {
  document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    state.selectedFilter = chip.dataset.filter;
    document.querySelectorAll('.chip').forEach((btn) => btn.classList.toggle('active', btn === chip));
    renderEvents();
  });
});

elements.searchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderEvents();
});

document.querySelectorAll('[data-close="eventModal"]').forEach((button) => {
  button.addEventListener('click', closeModal);
});

document.getElementById('minusQty').addEventListener('click', () => {
  state.quantity = Math.max(1, state.quantity - 1);
  elements.qtyValue.textContent = String(state.quantity);
});

document.getElementById('plusQty').addEventListener('click', () => {
  state.quantity = Math.min(10, state.quantity + 1);
  elements.qtyValue.textContent = String(state.quantity);
});

document.getElementById('confirmPurchaseBtn').addEventListener('click', confirmPurchase);

loadData();
