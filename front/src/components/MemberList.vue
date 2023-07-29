<!--
Kode di atas adalah contoh komponen Vue.js untuk menampilkan daftar anggota dalam tabel. Setiap baris dalam tabel memiliki event click yang akan menampilkan detail data anggota dalam sebuah modal. Modal akan ditampilkan saat baris di klik dan ditutup jika tombol close di modal ditekan.

Anda perlu mengimplementasikan fungsi-fungsi seperti getMembers, showMemberDetails, dan closeModal untuk berkomunikasi dengan smart contract menggunakan Web3.js dan mengatur tampilan detail data anggota.

Pastikan untuk mengganti kode yang sesuai dengan smart contract Anda dan jaringan blockchain yang digunakan (Binance atau Arbitrum). Selain itu, pastikan Anda juga telah mengonfigurasi Web3.js dengan benar untuk berkomunikasi dengan jaringan blockchain yang sesuai.


-->
<template>
  <div>
    <h2>Daftar Anggota</h2>
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th>Telepon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in members" :key="index" @click="showMemberDetails(member)">
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal untuk menampilkan detail data anggota -->
    <div v-if="selectedMember" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Detail Anggota</h3>
        <p><strong>Nama:</strong> {{ selectedMember.name }}</p>
        <p><strong>Email:</strong> {{ selectedMember.email }}</p>
        <p><strong>Telepon:</strong> {{ selectedMember.phoneNumber }}</p>
        <!-- Tambahkan detail lainnya sesuai dengan kebutuhan -->
      </div>
    </div>
  </div>
</template>

<script>
import web3 from "../web3Config";

export default {
  data() {
    return {
      members: [], // Daftar anggota
      selectedMember: null, // Anggota yang dipilih untuk menampilkan detail
    };
  },
  created() {
    // Panggil fungsi untuk mendapatkan daftar anggota
    // Misalnya, fungsi getMembers()
  },
  methods: {
    async getMembers() {
      // Implementasi fungsi untuk mendapatkan daftar anggota dari smart contract menggunakan Web3.js
      // Misalnya, menggunakan fungsi di smart contract yang mengembalikan daftar anggota
    },
    showMemberDetails(member) {
      // Fungsi untuk menampilkan detail data anggota ketika baris di klik
      this.selectedMember = member;
    },
    closeModal() {
      // Fungsi untuk menutup modal detail data anggota
      this.selectedMember = null;
    },
  },
};
</script>

<style>
/* Gaya untuk modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
