<!--
Kode ini adalah contoh komponen Vue.js untuk pendaftaran anggota. Komponen ini akan menampilkan formulir yang memungkinkan pengguna untuk memasukkan data pribadi mereka seperti nama, email, nomor telepon, alamat, tanggal lahir, dan jenis kelamin. Ketika pengguna mengisi dan mengirim formulir, fungsi registerMember akan dipanggil untuk mendaftarkan anggota menggunakan Web3.js.

Anda perlu mengimplementasikan fungsi registerMember untuk mengirim transaksi ke smart contract yang relevan untuk pendaftaran anggota. Pastikan untuk mengganti kode yang sesuai dengan smart contract Anda dan jaringan blockchain yang digunakan (Binance atau Arbitrum). Selain itu, pastikan Anda juga telah mengonfigurasi Web3.js dengan benar untuk berkomunikasi dengan jaringan blockchain yang sesuai.
-->

<template>
  <div>
    <h2>Pendaftaran Anggota</h2>
    <form @submit.prevent="registerMember">
      <div>
        <label for="name">Nama:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div>
        <label for="phoneNumber">Nomor Telepon:</label>
        <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required />
      </div>
      <div>
        <label for="address">Alamat:</label>
        <textarea id="address" v-model="formData.address" required></textarea>
      </div>
      <div>
        <label for="dateOfBirth">Tanggal Lahir:</label>
        <input type="date" id="dateOfBirth" v-model="formData.dateOfBirth" required />
      </div>
      <div>
        <label for="gender">Jenis Kelamin:</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="0">Pria</option>
          <option value="1">Wanita</option>
        </select>
      </div>
      <button type="submit">Daftar</button>
    </form>
  </div>
</template>

<script>
import web3 from "../web3Config";

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        gender: 0,
      },
    };
  },
  methods: {
    async registerMember() {
      // Implementasi fungsi untuk mendaftarkan anggota menggunakan Web3.js
      // Misalnya, mengirim transaksi untuk memanggil fungsi registerMember di smart contract
    },
  },
};
</script>
