// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Koperasi {
    address public owner;

    struct Member {
        string name;
        string email;
        uint256 phoneNumber;
        string addressInfo;
        uint256 dateOfBirth;
        uint8 gender;
        bool isActive;
        uint256 savingsBalance; // Saldo tabungan anggota
        uint256 lastDepositTime; // Waktu terakhir melakukan deposit
    }

    mapping(address => Member) public members;
    address[] public memberAddresses;

    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya pemilik kontrak yang dapat melakukan ini");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Fungsi untuk mendaftarkan anggota baru
    function registerMember(
        string memory _name,
        string memory _email,
        uint256 _phoneNumber,
        string memory _addressInfo,
        uint256 _dateOfBirth,
        uint8 _gender
    ) public {
        require(members[msg.sender].dateOfBirth == 0, "Anda sudah terdaftar sebagai anggota");

        Member memory newMember = Member({
            name: _name,
            email: _email,
            phoneNumber: _phoneNumber,
            addressInfo: _addressInfo,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            isActive: true,
            savingsBalance: 0,
            lastDepositTime: block.timestamp
        });

        members[msg.sender] = newMember;
        memberAddresses.push(msg.sender);
    }

    // Fungsi untuk menambah tabungan
    function depositSavings(uint256 _amount) public {
        require(members[msg.sender].isActive, "Anda harus menjadi anggota aktif untuk menambah tabungan");
        members[msg.sender].savingsBalance += _amount;
        members[msg.sender].lastDepositTime = block.timestamp;
    }

    // Fungsi untuk mengambil tabungan
    function withdrawSavings(uint256 _amount) public {
        require(members[msg.sender].isActive, "Anda harus menjadi anggota aktif untuk mengambil tabungan");
        require(members[msg.sender].savingsBalance >= _amount, "Saldo tabungan tidak cukup");
        members[msg.sender].savingsBalance -= _amount;
    }

    // Fungsi untuk melihat saldo tabungan
    function getBalance() public view returns (uint256) {
        return members[msg.sender].savingsBalance;
    }

    // Fungsi untuk menghitung bunga tabungan per bulan (misal: 2% per bulan)
    function calculateMonthlyInterest(uint256 _amount) public pure returns (uint256) {
        uint256 interestRate = 2; // Bunga tabungan per bulan (misal: 2%)
        uint256 monthlyInterest = (_amount * interestRate) / 100;
        return monthlyInterest;
    }

    // Fungsi untuk menghitung bunga dan menambahkan ke saldo tabungan
    function addInterestToSavings() public {
        require(members[msg.sender].isActive, "Anda harus menjadi anggota aktif untuk menambahkan bunga tabungan");
        uint256 currentTime = block.timestamp;
        uint256 lastDepositTime = members[msg.sender].lastDepositTime;
        uint256 timeDiff = currentTime - lastDepositTime;
        uint256 monthsPassed = timeDiff / 30 days; // Mengasumsikan 30 hari per bulan
        uint256 interest = calculateMonthlyInterest(members[msg.sender].savingsBalance) * monthsPassed;
        members[msg.sender].savingsBalance += interest;
        members[msg.sender].lastDepositTime = currentTime;
    }
}
