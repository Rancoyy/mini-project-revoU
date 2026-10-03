# 🍱 Food Order & Budget Visualizer

Aplikasi web sederhana untuk memilih menu makanan, mencatat pesanan, dan memvisualisasikan distribusi pengeluaran berdasarkan kategori.

## Fitur

- **Pilih menu** — klik kartu menu untuk menambahkan ke daftar pesanan
- **Search menu** — cari menu berdasarkan nama secara real-time
- **Daftar pesanan** — lihat semua item yang dipilih beserta total harga
- **Hapus item** — hapus pesanan satu per satu dari daftar
- **Pesan Sekarang** — konfirmasi pesanan, daftar dibersihkan otomatis
- **Pie chart** — visualisasi distribusi pengeluaran per kategori (Food, Transport, Fun)
- **Persistent data** — data pesanan tersimpan di localStorage, tidak hilang saat refresh

## Teknologi

| Layer      | Teknologi              |
|------------|------------------------|
| Structure  | HTML5                  |
| Styling    | CSS3 (Vanilla)         |
| Logic      | JavaScript (Vanilla)   |
| Chart      | Chart.js (CDN)         |
| Storage    | Browser LocalStorage   |

## Cara Pakai

1. Buka `index.html` langsung di browser — tidak perlu server
2. Klik kartu menu untuk menambah pesanan
3. Gunakan kolom search untuk mencari menu tertentu
4. Klik **🛒 Pesan Sekarang** untuk mengkonfirmasi semua pesanan

## Struktur File

```
file/
├── index.html   # Struktur halaman
├── style.css    # Styling dan layout
├── script.js    # Logic aplikasi & localStorage
└── README.md    # Dokumentasi ini
```

## Browser Support

Chrome · Firefox · Edge · Safari (semua versi modern)
