# Generator Data Pribadi Indonesia

Aplikasi web sederhana untuk menghasilkan data pribadi fiktif dalam konteks Indonesia.

## Fitur

- Menghasilkan data pribadi lengkap termasuk:
    - Nama lengkap (sesuai gender)
    - Foto profil
    - Username dan email
    - Nomor telepon
    - Alamat lengkap
    - Informasi pekerjaan
    - Data kartu kredit (fiktif)
    - Password dan IP address

## Teknologi

- HTML
- CSS
- JavaScript (Vanilla)
- REST API (randomuser.me untuk foto profil)

## Instalasi

1. Clone repository ini
```bash
git clone https://github.com/username/generator-data-pribadi.git
```

2. Buka folder project
```bash
cd generator-data-pribadi
```

3. Jalankan dengan live server atau buka langsung file `index.html` di browser

## Penggunaan

- Klik tombol "Generate Data Baru" untuk menghasilkan set data baru
- Double click pada data untuk menyalin ke clipboard
- Data yang dihasilkan bersifat fiktif dan hanya untuk keperluan testing

## Data

Data yang digunakan disimpan dalam format JSON di folder `data/`:
- `names.json` - Kumpulan nama Indonesia
- `locations.json` - Data lokasi dan alamat
- `personal.json` - Data pribadi lainnya
- `additional.json` - Data tambahan
- `jobs.json` - Data pekerjaan dan jabatan

## Lisensi

MIT License - bebas digunakan dan dimodifikasi