<!--
Kode di atas adalah contoh komponen Vue.js untuk menampilkan data mutasi tabungan per anggota. Komponen ini akan menampilkan tabel yang berisi informasi tentang tanggal transaksi, keterangan (misalnya, deposit, withdraw, bunga bulanan, atau biaya administrasi), debit (jika ada), kredit (jika ada), dan saldo setelah transaksi.

Anda perlu mengimplementasikan fungsi getAccountTransactions untuk berkomunikasi dengan smart contract menggunakan Web3.js dan mendapatkan daftar transaksi mutasi tabungan anggota. Pastikan untuk mengganti kode yang sesuai dengan smart contract Anda dan jaringan blockchain yang digunakan (Binance atau Arbitrum). Selain itu, pastikan Anda juga telah mengonfigurasi Web3.js dengan benar untuk berkomunikasi dengan jaringan blockchain yang sesuai.

Selain itu, Anda juga dapat mengimplementasikan fungsi formatDate dan formatAmount untuk mengubah format tanggal dan jumlah menjadi format yang lebih mudah dibaca dan sesuai dengan preferensi tampilan Anda.

-->

<template>
  <div>
    <h2>Data Mutasi Tabungan - {{ selectedMember.name }}</h2>
    <table>
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Keterangan</th>
          <th>Debit</th>
          <th>Kredit</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td>{{ formatDate(transaction.timestamp) }}</td>
          <td>{{ transaction.description }}</td>
          <td v-if="transaction.debit">{{ formatAmount(transaction.amount) }}</td>
          <td v-else></td>
          <td v-if="transaction.credit">{{ formatAmount(transaction.amount) }}</td>
          <td v-else></td>
          <td>{{ formatAmount(transaction.balance) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import web3 from "../web3Config";

export default {
  props: {
    selectedMember: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      transactions: [], // Daftar transaksi mutasi tabungan anggota
    };
  },
  created() {
    // Panggil fungsi untuk mendapatkan data mutasi tabungan anggota
    // Misalnya, fungsi getAccountTransactions(selectedMember.address)
  },
  methods: {
    async getAccountTransactions(memberAddress) {
      // Implementasi fungsi untuk mendapatkan daftar transaksi mutasi tabungan anggota dari smart contract menggunakan Web3.js
      // Misalnya, menggunakan fungsi di smart contract yang mengembalikan daftar transaksi
    },
    formatDate(timestamp) {
      // Fungsi untuk mengubah timestamp menjadi format tanggal yang lebih mudah dibaca
      // Anda dapat menggunakan library date-fns atau fungsi JavaScript bawaan untuk melakukan ini
    },
    formatAmount(amount) {
      // Fungsi untuk mengubah jumlah menjadi format yang lebih mudah dibaca (misalnya, dengan menambahkan tanda koma atau mengubah desimal)
      // Anda dapat menggunakan library seperti numeral.js atau fungsi JavaScript bawaan untuk melakukan ini
    },
  },
};
</script>
