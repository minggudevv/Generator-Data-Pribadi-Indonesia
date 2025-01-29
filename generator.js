async function loadData() {
    try {
        const [names, locations, personal, additional, jobs] = await Promise.all([
            fetch('./data/names.json').then(res => res.json()),
            fetch('./data/locations.json').then(res => res.json()),
            fetch('./data/personal.json').then(res => res.json()),
            fetch('./data/additional.json').then(res => res.json()),
            fetch('./data/jobs.json').then(res => res.json())
        ]);
        
        return { names, locations, personal, additional, jobs };
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

let data = null;

async function initializeData() {
    data = await loadData();
    generateBoth(); // Initial generation after data is loaded
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateNama(gender) {
    if (!data) return 'Loading...';
    const namaDepan = gender === 'male' ? 
        getRandom(data.names.namaDepanPria) : 
        getRandom(data.names.namaDepanWanita);
    return `${namaDepan} ${getRandom(data.names.namaTengah)} ${getRandom(data.names.namaBelakang)}`;
}

function generatePekerjaan() {
    if (!data) return { pekerjaan: 'Loading...', tempat: 'Loading...' };
    
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
        tempatKerja,
        jabatan: `${jabatan} di ${tempatKerja}`,
        provinsi: kotaData.provinsi
    };
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
    const number = Array(4).fill(0)
        .map(() => Math.floor(Math.random() * 10000).toString().padStart(4, '0'))
        .join(' ');
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
    return Array(4).fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join('.');
}

function generateUsername(nama) {
    const namaParts = nama.toLowerCase().split(' ');
    return `${namaParts[0]}_${namaParts[namaParts.length-1]}${Math.floor(Math.random() * 999)}`;
}

function generatePassword() {
    if (!data) return 'Loading...';
    return Array(12).fill(0)
        .map(() => data.additional.passwordChars[Math.floor(Math.random() * data.additional.passwordChars.length)])
        .join('');
}

async function getRandomProfilePhoto(gender) {
    try {
        const response = await fetch(`https://randomuser.me/api/?gender=${gender}`);
        const result = await response.json();
        const user = result.results[0];
        return {
            url: user.picture.large,
            gender: user.gender === 'male' ? 'Laki-laki' : 'Perempuan'
        };
    } catch (error) {
        console.error('Error fetching profile photo:', error);
        return null;
    }
}

async function generateDataLengkap() {
    if (!data) return null;
    
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const profile = await getRandomProfilePhoto(gender);
    const nama = generateNama(gender);
    const pekerjaan = generatePekerjaan();

    return {
        foto: profile.url,
        nama: nama,
        username: generateUsername(nama),
        email: generateEmail(nama),
        password: generatePassword(),
        alamat: generateAlamat(pekerjaan.kota),
        telepon: generatePhoneNumber(),
        ip: generateIP(),
        kartuKredit: generateCreditCard(),
        perusahaan: pekerjaan.tempatKerja,
        statusPekerjaan: pekerjaan.jabatan,
        jenisKelamin: gender === 'male' ? 'Laki-laki' : 'Perempuan'
    };
}

// Initialize data when the script loads
initializeData();
