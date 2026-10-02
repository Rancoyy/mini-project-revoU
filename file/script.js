const foodMenu = [
  { 
    name: 'Nasi Goreng', 
    price: 10000, 
    category: 'Food', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmEW68PvW4szQbq1xi59Rjjeo6ff8BO3rlGzBf0nkDcQ&s=10' 
  },
  { 
    name: 'Mie Ayam', 
    price: 12000, 
    category: 'Food', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAeQiISBJVBFQrl-zp-QI2ulTsfTfqlj_qnsUZm1uF5w&s=10' 
  },
  { 
    name: 'Ayam Geprek', 
    price: 18000, 
    category: 'Food', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiNS9eQQYM1vH7wlCsGCjMohG5i90TkzhgTN2BwaXZA&s=10' 
  },
  { 
    name: 'Es Teh Manis', 
    price: 5000, 
    category: 'Food', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Pd3xOdLDWR1ros44gZ-KVDLNUDXQs9bAn-ky7whYYQ&s=10'
  },
  { 
    name: 'Ojek Online', 
    price: 12000, 
    category: 'Transport', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhwGOEaDx8No2M_DajKg5Jnvpt-H16Y40gzViwrb7WQ&s=10' 
  },
  { 
    name: 'Tiket Bioskop', 
    price: 40000, 
    category: 'Fun', 
    image: 'https://bengkuluekspress.disway.id/upload/e8cbf5a8116a91fb7334b89ffdb59d6b.jpg'
  }
];

// --- State & DOM Elements ---
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let pieChart = null;

const totalBalanceEl = document.getElementById('totalBalance');
const transactionListEl = document.getElementById('transactionList');
const menuGridEl = document.getElementById('menuGrid');

// --- Helper Functions ---
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function saveToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// --- Render Food Menu Cards (dengan Foto) ---
function renderMenuCards(filter = '') {
  menuGridEl.innerHTML = '';
  const keyword = filter.toLowerCase().trim();
  const filtered = keyword
    ? foodMenu.filter(item => item.name.toLowerCase().includes(keyword))
    : foodMenu;

  if (filtered.length === 0) {
    menuGridEl.innerHTML = '<p class="no-result">Menu tidak ditemukan</p>';
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('menu-card');
    const imgClass = item.name === 'Es Teh Manis' ? 'menu-img es-teh-manis-img' : 'menu-img';
    card.innerHTML = `
      <img class="${imgClass}" src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="menu-details">
        <span class="menu-name">${item.name}</span>
        <span class="menu-price">${formatRupiah(item.price)}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      addTransaction(item.name, item.price, item.category);
    });
    menuGridEl.appendChild(card);
  });
}

// --- Core Function: Add Transaction ---
function addTransaction(name, amount, category) {
  const newTransaction = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  };

  transactions.push(newTransaction);
  saveToLocalStorage();
  updateUI();
}

// --- Render Functions ---

function renderList() {
  transactionListEl.innerHTML = '';

  if (transactions.length === 0) {
    transactionListEl.innerHTML = '<p class="empty-msg">Belum ada pesanan</p>';
    return;
  }

  transactions.forEach((item) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('transaction-item');
    itemEl.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-category">${item.category}</span>
      </div>
      <div class="item-right">
        <span class="item-amount">${formatRupiah(item.amount)}</span>
        <button class="btn-delete" onclick="deleteTransaction(${item.id})">&times;</button>
      </div>
    `;
    transactionListEl.appendChild(itemEl);
  });
}

function renderTotal() {
  const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  totalBalanceEl.textContent = formatRupiah(total);
}

function renderChart() {
  const categories = ['Food', 'Transport', 'Fun'];
  
  const categoryTotals = categories.map(cat => {
    return transactions
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const ctx = document.getElementById('categoryChart').getContext('2d');

  if (pieChart) {
    pieChart.destroy();
  }

  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function updateUI() {
  renderList();
  renderTotal();
  renderChart();
}

window.handlePesan = function (e, name, price, category) {
  e.stopPropagation(); // supaya tidak trigger klik card sekaligus
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    addTransaction(name, price, category);
  }, 2000);
};

window.pesanSekarang = function () {
  if (transactions.length === 0) {
    alert('Belum ada pesanan yang dipilih!');
    return;
  }
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    transactions = [];
    saveToLocalStorage();
    updateUI();
  }, 2000);
};

window.deleteTransaction = function (id) {
  transactions = transactions.filter(item => item.id !== id);
  saveToLocalStorage();
  updateUI();
};

// --- Initialization ---
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  renderMenuCards(searchInput.value);
});

renderMenuCards();
updateUI();
