// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Koperasi {
    address public owner;
    
    // Struktur data untuk informasi anggota
    struct Member {
        string name;
        string email;
        uint256 phoneNumber;
        string addressInfo;
        uint256 dateOfBirth;
        uint8 gender;
        bool isActive;
    }

    // Struktur data untuk pinjaman
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        bool isApproved;
        bool isPaid;
    }

    // Mapping untuk menyimpan data anggota berdasarkan alamat Ethereum mereka
    mapping(address => Member) public members;
    
    // Array untuk menyimpan alamat anggota secara terurut
    address[] public memberAddresses;
    
    // Array untuk menyimpan data pinjaman
    Loan[] public loans;

    // Modifier untuk membatasi akses hanya untuk pemilik kontrak
    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya pemilik kontrak yang dapat melakukan ini");
        _;
    }

    // Constructor kontrak
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
            isActive: true
        });

        members[msg.sender] = newMember;
        memberAddresses.push(msg.sender);
    }

    // Fungsi untuk mengajukan pinjaman
    function applyLoan(
        uint256 _amount,
        uint256 _interestRate,
        uint256 _duration
    ) public {
        require(members[msg.sender].isActive, "Anda harus menjadi anggota aktif untuk mengajukan pinjaman");

        Loan memory newLoan = Loan({
            borrower: msg.sender,
            amount: _amount,
            interestRate: _interestRate,
            duration: _duration,
            isApproved: false,
            isPaid: false
        });

        loans.push(newLoan);
    }

    // Fungsi untuk menyetujui pinjaman (hanya pemilik kontrak)
    function approveLoan(uint256 _loanIndex) public onlyOwner {
        require(_loanIndex < loans.length, "Indeks pinjaman tidak valid");
        loans[_loanIndex].isApproved = true;
    }

    // Fungsi untuk menandai pinjaman sebagai telah dibayar
    function markLoanAsPaid(uint256 _loanIndex) public onlyOwner {
        require(_loanIndex < loans.length, "Indeks pinjaman tidak valid");
        loans[_loanIndex].isPaid = true;
    }

    // Fungsi untuk mengubah status anggota (aktif/nonaktif)
    function changeMemberStatus(address _memberAddress, bool _isActive) public onlyOwner {
        members[_memberAddress].isActive = _isActive;
    }
}

