# Persiapan dalam hardhat

Untuk membuat proyek baru dengan Hardhat, ikuti langkah-langkah berikut:

**1. Pastikan Node.js terinstal**
Pastikan Anda telah menginstal Node.js di komputer Anda. Jika belum, Anda dapat mengunduh dan menginstalnya dari situs resmi Node.js: https://nodejs.org/

**2. Buat direktori untuk proyek**
Buka terminal atau command prompt, kemudian buat direktori baru untuk proyek Hardhat Anda. Misalnya:

```bash
mkdir my-hardhat-project
cd my-hardhat-project
```

**3. Inisialisasi Proyek dengan Hardhat**
Jalankan perintah inisialisasi Hardhat di dalam direktori proyek Anda dengan menggunakan npx (Node Package Runner) seperti berikut:

```bash
npx hardhat
```

Anda akan diminta untuk memilih salah satu dari beberapa template proyek. Pilih "Create a basic sample project" atau "Create an empty hardhat.config.js" untuk proyek kosong. Jika Anda memilih template "Create a basic sample project," Anda akan mendapatkan proyek contoh sederhana dengan kontrak cerdas dan skrip uji.

**4. Struktur Proyek**
Setelah menjalankan perintah di atas, struktur proyek Anda akan terbentuk seperti berikut:

```bash
my-hardhat-project/
  ├── contracts/
  │   └── Greeter.sol (contoh kontrak sederhana)
  ├── scripts/
  │   └── sample-script.js (contoh skrip untuk deploy kontrak)
  ├── test/
  │   └── sample-test.js (contoh skrip uji)
  ├── hardhat.config.js (file konfigurasi Hardhat)
  ├── .env (file lingkungan - opsional)
  └── package.json (file konfigurasi npm)
```

**5. Tulis dan Uji Kontrak Cerdas (Opsional)**
Anda dapat menulis kontrak cerdas di direktori contracts/ dan skrip uji di direktori test/ sesuai dengan kebutuhan proyek Anda. Kemudian, jalankan perintah untuk menjalankan skrip uji:

```bash
npx hardhat test
```

**6. Distribusi dan Implementasi (Opsional)**

Jika Anda ingin mendistribusikan dan mengimplementasikan kontrak cerdas Anda di jaringan blockchain yang sesungguhnya, Anda dapat mengonfigurasi hardhat.config.js dengan benar dan menggunakan perintah npx hardhat run untuk tugas tersebut.

Itulah langkah-langkah untuk membuat proyek baru dengan Hardhat. Anda sekarang memiliki proyek yang siap untuk dikembangkan lebih lanjut dengan kontrak cerdas, skrip uji, dan implementasi di blockchain yang sesungguhnya. Selamat berkoding!





