async function loadData() {
    try {
        // Perbaikan path untuk mengakses file JSON
        const basePath = '../data';  // Ubah path karena file ada di folder js
        const [names, locations, personal, additional, jobs] = await Promise.all([
            fetch(`${basePath}/names.json`).then(res => res.json()),
            fetch(`${basePath}/locations.json`).then(res => res.json()),
            fetch(`${basePath}/personal.json`).then(res => res.json()),
            fetch(`${basePath}/additional.json`).then(res => res.json()),
            fetch(`${basePath}/jobs.json`).then(res => res.json())
        ]);
        console.log('Data loaded successfully:', { names, locations, personal, additional, jobs });
        return { names, locations, personal, additional, jobs };
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Gagal memuat data: ' + error.message);
        return null;
    }
}

let data = null;

async function initializeData() {
    try {
        data = await loadData();
        return true;
    } catch (error) {
        console.error('Error initializing data:', error);
        return false;
    }
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateNama(gender) {
    if (!data) return 'Loading...';
    const namaDepan = gender === 'male' ? getRandom(data.names.namaDepanPria) : getRandom(data.names.namaDepanWanita);
    return `${namaDepan} ${getRandom(data.names.namaTengah)} ${getRandom(data.names.namaBelakang)}`;
}

function generatePekerjaan() {
    if (!data) return { pekerjaan: 'Loading...', tempat: 'Loading...' };
    
    try {
        // Pilih kota secara random
        const kotaList = Object.keys(data.locations.lokasi);
        const kota = getRandom(kotaList);
        const kotaData = data.locations.lokasi[kota];
        
        // Pilih profesi secara random
        const profesiList = Object.keys(data.jobs.profesi);
        const profesi = getRandom(profesiList);
        const profesiData = data.jobs.profesi[profesi];
        
        // Dapatkan tempat kerja sesuai profesi
        const tempatKerja = getRandom(kotaData[profesiData.tempat]);
        const jabatan = getRandom(profesiData.jabatan);

        return {
            kota,
            profesi, // Tambahkan ini untuk referensi profesi
            tempatKerja,
            jabatan: `${jabatan} di ${tempatKerja}`,
            provinsi: kotaData.provinsi
        };
    } catch (error) {
        console.error('Error generating pekerjaan:', error);
        return {
            kota: 'Jakarta',
            profesi: 'Karyawan',
            tempatKerja: 'Perusahaan',
            jabatan: 'Staff',
            provinsi: 'DKI Jakarta'
        };
    }
}

function generateAlamat(kota) {
    if (!data) return 'Loading...';
    const kotaData = data.locations.lokasi[kota];
    const nomorRumah = Math.floor(Math.random() * 150) + 1;
    const rt = Math.floor(Math.random() * 20) + 1;
    const rw = Math.floor(Math.random() * 10) + 1;
    return `Jl. ${getRandom(kotaData.jalan)} No. ${nomorRumah}, RT ${rt}/RW ${rw}\n${kota}, ${kotaData.provinsi}`;
}

function generatePhoneNumber() {
    if (!data) return 'Loading...';
    const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `${getRandom(data.personal.providers)}${number}`;
}

function generateCreditCard() {
    if (!data) return null;
    const bank = getRandom(data.personal.bankNames);
    const number = Array(4).fill(0).map(() => Math.floor(Math.random() * 10000).toString().padStart(4, '0')).join(' ');
    const month = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    const year = (new Date().getFullYear() + Math.floor(Math.random() * 5)).toString().slice(-2);
    const cvv = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return {
        bank,
        number,
        expired: `${month}/${year}`,
        cvv
    };
}

function generateEmail(nama) {
    if (!data) return 'Loading...';
    const namaParts = nama.toLowerCase().split(' ');
    const username = `${namaParts[0]}${namaParts[namaParts.length-1]}${Math.floor(Math.random() * 999)}`;
    return `${username}@${getRandom(data.additional.emailDomains)}`;
}

function generateIP() {
    return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
}

function generateUsername(nama) {
    const namaParts = nama.toLowerCase().split(' ');
    return `${namaParts[0]}_${namaParts[namaParts.length-1]}${Math.floor(Math.random() * 999)}`;
}

function generatePassword() {
    if (!data) return 'Loading...';
    return Array(12).fill(0).map(() => data.additional.passwordChars[Math.floor(Math.random() * data.additional.passwordChars.length)]).join('');
}

function generateAge(profession) {
    const ageRanges = {
        'Dokter': { min: 26, max: 65 },
        'Guru': { min: 24, max: 60 },
        'Dosen': { min: 30, max: 65 },
        'Karyawan': { min: 22, max: 55 }
    };

    const range = ageRanges[profession] || { min: 22, max: 60 };
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function generateParentNames(gender) {
    if (!data) return { ayah: 'Loading...', ibu: 'Loading...' };
    
    const ayah = `${getRandom(data.names.namaDepanPria)} ${getRandom(data.names.namaBelakang)}`;
    const ibu = `${getRandom(data.names.namaDepanWanita)} ${getRandom(data.names.namaBelakang)}`;
    
    return { ayah, ibu };
}

function generateSocialMedia(username) {
    if (!data) return null;

    return {
        instagram: `@${username}`,
        twitter: `@${username}`,
        tiktok: `@${username}`
    };
}

async function getRandomProfilePhoto(gender) {
    try {
        const response = await fetch(`https://randomuser.me/api/?gender=${gender}&nat=us`);
        const result = await response.json();
        const user = result.results[0];
        return {
            url: user.picture.large,
            gender: user.gender === 'male' ? 'Laki-laki' : 'Perempuan'
        };
    } catch (error) {
        console.error('Error fetching profile photo:', error);
        return {
            url: 'https://via.placeholder.com/150',
            gender: gender === 'male' ? 'Laki-laki' : 'Perempuan'
        };
    }
}

function generateKeluarga(gender, umur) {
    if (!data) return null;
    
    // Tentukan probabilitas status pernikahan berdasarkan umur
    let statusPernikahan = 'Belum Menikah';
    let jumlahAnak = 0;
    let anakAnak = [];
    
    const probabilitasMenikah = (umur - 20) * 0.1; // Semakin tua, semakin besar kemungkinan menikah
    
    if (umur >= 20 && Math.random() < probabilitasMenikah) {
        statusPernikahan = 'Menikah';
        
        // Jika menikah, tentukan jumlah anak (0-4 anak)
        const maxAnak = Math.min(Math.floor((umur - 20) / 3), 4);
        jumlahAnak = Math.floor(Math.random() * (maxAnak + 1));
        
        // Generate nama anak-anak
        for (let i = 0; i < jumlahAnak; i++) {
            const anakGender = Math.random() < 0.5 ? 'laki' : 'perempuan';
            const namaAnak = getRandom(data.personal.namaAnak[anakGender]);
            const umurAnak = Math.floor(Math.random() * (umur - 20));
            anakAnak.push({
                nama: namaAnak,
                jenisKelamin: anakGender === 'laki' ? 'Laki-laki' : 'Perempuan',
                umur: umurAnak
            });
        }
        
        // Sortir anak berdasarkan umur
        anakAnak.sort((a, b) => b.umur - a.umur);
    } else if (umur >= 30 && Math.random() < 0.1) {
        // Kemungkinan kecil untuk duda/janda
        statusPernikahan = gender === 'male' ? 'Duda' : 'Janda';
    }
    
    return {
        status: statusPernikahan,
        jumlahAnak,
        anakAnak
    };
}

async function generateDataLengkap() {
    if (!data) {
        console.error('Data belum dimuat');
        return null;
    }
    
    try {
        const gender = Math.random() < 0.5 ? 'male' : 'female';
        const pekerjaan = generatePekerjaan();
        const age = generateAge(pekerjaan.profesi); // Gunakan profesi yang sudah ditambahkan
        const profile = await getRandomProfilePhoto(gender);
        const keluarga = generateKeluarga(gender, age);
        
        const nama = generateNama(gender);
        const username = generateUsername(nama);
        const parents = generateParentNames(gender);
        const socialMedia = generateSocialMedia(username);

        const result = {
            foto: profile.url,
            nama,
            umur: age,
            jenisKelamin: gender === 'male' ? 'Laki-laki' : 'Perempuan',
            namaAyah: parents.ayah,
            namaIbu: parents.ibu,
            username,
            email: generateEmail(nama),
            password: generatePassword(),
            alamat: generateAlamat(pekerjaan.kota),
            telepon: generatePhoneNumber(),
            ip: generateIP(),
            kartuKredit: generateCreditCard(),
            perusahaan: pekerjaan.tempatKerja,
            statusPekerjaan: pekerjaan.jabatan,
            socialMedia,
            statusPernikahan: keluarga.status,
            jumlahAnak: keluarga.jumlahAnak,
            anakAnak: keluarga.anakAnak
        };

        console.log('Generated data:', result); // Untuk debugging
        return result;
    } catch (error) {
        console.error('Error in generateDataLengkap:', error);
        // Return default values dengan gender yang konsisten
        const defaultGender = 'male';
        return {
            foto: 'https://via.placeholder.com/150',
            nama: generateNama(defaultGender),
            umur: 25,
            jenisKelamin: 'Laki-laki',
            // ...rest of default values...
        };
    }
}

// Export functions for use in index.html
window.initializeData = initializeData;
window.generateDataLengkap = generateDataLengkap;
window.updateProfileCard = updateProfileCard;
