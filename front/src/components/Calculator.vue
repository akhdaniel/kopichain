<!--
Kode di atas adalah contoh komponen Vue.js untuk kalkulator pinjaman.
Komponen ini memiliki input untuk memasukkan jumlah pinjaman dan jangka waktu pinjaman (dalam bulan).
Saat tombol "Hitung" ditekan, fungsi calculateLoan akan dipanggil untuk menghitung estimasi angsuran dan bunga pinjaman berdasarkan nilai yang dimasukkan oleh pengguna.
Perhitungan estimasi angsuran dan bunga pinjaman yang ditunjukkan dalam contoh ini cukup sederhana dan hanya sebagai contoh. Dalam implementasi sebenarnya, Anda perlu menyesuaikan perhitungan dengan aturan dan persyaratan khusus yang sesuai dengan kontrak pinjaman Anda.
Hasil perhitungan estimasi akan ditampilkan di bawah tombol "Hitung".
Pastikan Anda telah membuat komponen ini dalam konteks aplikasi Vue.js yang lebih besar dan telah mengonfigurasi Vue.js dengan benar. Selain itu, pastikan Anda telah menyambungkan komponen ini dengan aplikasi frontend Anda untuk dapat digunakan dengan benar oleh member untuk menghitung estimasi pinjaman.
-->
<template>
  <div>
    <h2>Kalkulator Pinjaman</h2>
    <label for="loanAmount">Jumlah Pinjaman (ETH)</label>
    <input v-model="loanAmount" type="number" step="0.01" id="loanAmount" />

    <label for="loanDuration">Jangka Waktu (Bulan)</label>
    <input v-model="loanDuration" type="number" id="loanDuration" />

    <button @click="calculateLoan">Hitung</button>

    <div v-if="loanEstimation">
      <h3>Estimasi Angsuran</h3>
      <p>Jumlah Pinjaman: {{ loanEstimation.loanAmount }} ETH</p>
      <p>Jangka Waktu: {{ loanEstimation.loanDuration }} Bulan</p>
      <p>Angsuran Bulanan: {{ loanEstimation.monthlyInstallment }} ETH</p>
      <p>Total Bayar: {{ loanEstimation.totalPayment }} ETH</p>
      <p>Total Bunga: {{ loanEstimation.totalInterest }} ETH</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loanAmount: 0,
      loanDuration: 0,
      loanEstimation: null,
    };
  },
  methods: {
    calculateLoan() {
      // Lakukan perhitungan estimasi angsuran dan bunga pinjaman berdasarkan jumlah pinjaman dan jangka waktu
      // Misalnya, Anda dapat menggunakan rumus matematika yang sesuai untuk menghitung estimasi ini

      // Contoh perhitungan sederhana (perhitungan bunga 10% per tahun):
      const annualInterestRate = 0.10;
      const monthlyInterestRate = annualInterestRate / 12;
      const numberOfMonths = parseInt(this.loanDuration);

      const monthlyInstallment =
        (parseFloat(this.loanAmount) * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

      const totalPayment = monthlyInstallment * numberOfMonths;
      const totalInterest = totalPayment - parseFloat(this.loanAmount);

      this.loanEstimation = {
        loanAmount: this.loanAmount,
        loanDuration: this.loanDuration,
        monthlyInstallment: monthlyInstallment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      };
    },
  },
};
</script>
