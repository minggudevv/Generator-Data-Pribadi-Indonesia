# 🇮🇩 Generator Data Pribadi Indonesia

<div align="center">
  <div class="carousel">
    <div class="slides">
      <img src="screenshots/preview.png" alt="Preview 1" />
      <img src="screenshots/preview2.png" alt="Preview 2" />
    </div>
    <div class="dots">
      <span class="dot active"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ![Version](https://img.shields.io/badge/version-1.2.0-blue)
  ![Status](https://img.shields.io/badge/status-active-success.svg)
</div>

<style>
.carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slides img {
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
}

.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background: white;
}
</style>

<script>
const carousel = document.querySelector('.carousel');
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function updateSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => updateSlide(index));
});

// Auto slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % dots.length;
  updateSlide(currentSlide);
}, 5000);
</script>

## ✨ Fitur Utama

🔥 **Generasi Data Lengkap**
- Nama lengkap sesuai gender
- Foto profil yang sesuai umur & gender
- Username & email yang unik
- Alamat lengkap & valid
- Data pekerjaan yang realistis
- Kartu kredit (data fiktif)
- Status pernikahan & data keluarga

🎯 **Fitur Spesial**
- Multiple profile generation (1-10 profil)
- Copy dengan double-click
- Loading animation yang smooth
- Responsive design
- Error handling yang baik

## 🖥️ Preview

<div align="center">
  <img src="screenshots/preview.png" alt="UI Preview 1" width="400">
  <img src="screenshots/preview2.png" alt="UI Preview 2" width="400">
</div>

## 🚀 Penggunaan

1. Generate satu atau lebih profil:
   ```
   Pilih jumlah profil (1-10) → Klik "Generate Data"
   ```

2. Copy data dengan mudah:
   ```
   Double-click pada item yang ingin di-copy
   ```

3. Data yang dihasilkan termasuk:
   - Profil lengkap
   - Informasi keluarga
   - Data pekerjaan
   - Alamat valid
   - Media sosial
   - Kartu kredit (fiktif)

## 🛠️ Teknologi

- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript
- [RandomUser.me API](https://randomuser.me)

## 📦 Instalasi

1. Clone repository:
```bash
git clone https://github.com/username/generator-data-pribadi.git
```

2. Buka folder project
```bash
cd generator-data-pribadi
```

3. Jalankan dengan live server atau buka langsung file `index.html` di browser

## Known Issues

- API randomuser.me terkadang lambat
- Beberapa foto profil mungkin tidak 100% sesuai dengan umur
- Loading time bisa lama untuk multiple generations

## Data

Data yang digunakan disimpan dalam format JSON di folder `data/`:
- `names.json` - Kumpulan nama Indonesia
- `locations.json` - Data lokasi dan alamat
- `personal.json` - Data pribadi lainnya
- `additional.json` - Data tambahan
- `jobs.json` - Data pekerjaan dan jabatan

## Lisensi

MIT License - bebas digunakan dan dimodifikasi