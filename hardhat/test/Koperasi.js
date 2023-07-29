import { ethers } from "hardhat";
import { expect } from "chai";
/*
Penjelasan:


--registrasi
Kami menggunakan Hardhat dan Chai untuk melakukan pengujian pada smart contract.

beforeEach function digunakan untuk menginisialisasi kontrak Koperasi dan mengambil alamat pemilik kontrak serta alamat anggota untuk digunakan dalam pengujian.

it function melakukan pengujian pada fungsi registerMember untuk memastikan anggota baru dapat didaftarkan dengan benar.

Kami menetapkan nilai-nilai yang akan digunakan untuk pengujian, seperti nama, email, nomor telepon, dll.

Kami menggunakan connect method dari alamat anggota untuk memanggil fungsi registerMember untuk mendaftarkan anggota baru pada smart contract.

Setelah mendaftarkan anggota baru, kami memverifikasi apakah jumlah anggota bertambah dan apakah data anggota sesuai dengan nilai yang diharapkan.

Pastikan Anda telah melakukan setup pengujian Hardhat dan telah menjalankan smart contract Koperasi pada lingkungan pengujian sebelum menjalankan pengujian ini. 

Selain itu, pastikan Anda telah mengonfirmasi bahwa fungsi getMemberCount dan variabel members di smart contract Koperasi telah diimplementasikan dengan benar untuk menjalankan pengujian ini dengan sukses.


-- deposit
Kode di atas merupakan kelanjutan dari kode test sebelumnya untuk registrasi anggota baru pada smart contract Koperasi.
Test case should deposit savings berfungsi untuk menguji fungsi depositSavings pada smart contract Koperasi.
Kami menentukan jumlah tabungan yang akan diisikan dengan mengonversi 5 ETH menjadi BigNumber menggunakan ethers.utils.parseEther.
Kemudian, kami memanggil fungsi depositSavings menggunakan akun member1 dan menyertakan nilai yang akan diisikan sebagai parameter value dalam transaksi.

Setelah deposit berhasil, kami memverifikasi apakah saldo anggota telah bertambah sesuai dengan jumlah deposit yang diisikan.

Pastikan Anda telah menjalankan smart contract Koperasi pada lingkungan pengujian menggunakan Hardhat sebelum menjalankan pengujian ini. Selain itu, pastikan fungsi depositSavings telah diimplementasikan dengan benar pada smart contract Koperasi untuk melakukan pengujian ini dengan sukses.



-- withdraw

Kode di atas merupakan kelanjutan dari kode test sebelumnya untuk registrasi anggota baru dan pengisian tabungan pada smart contract Koperasi.
Test case should withdraw savings berfungsi untuk menguji fungsi withdrawSavings pada smart contract Koperasi.
Kami menentukan jumlah tabungan yang akan ditarik (withdrawAmount) dengan mengonversi 2 ETH menjadi BigNumber menggunakan ethers.utils.parseEther.
Kemudian, kami memanggil fungsi withdrawSavings menggunakan akun member1 dan menyertakan nilai yang akan ditarik sebagai parameter dalam transaksi.
Setelah penarikan berhasil, kami memverifikasi apakah saldo anggota telah berkurang sesuai dengan jumlah yang ditarik.
Pastikan Anda telah menjalankan smart contract Koperasi pada lingkungan pengujian menggunakan Hardhat sebelum menjalankan pengujian ini. Selain itu, pastikan fungsi withdrawSavings telah diimplementasikan dengan benar pada smart contract Koperasi untuk melakukan pengujian ini dengan sukses.


-- request dan approval loan

Kode di atas merupakan kelanjutan dari kode test sebelumnya untuk registrasi anggota baru, pengisian tabungan, dan pencairan tabungan pada smart contract Koperasi.
Test case should submit loan application berfungsi untuk menguji fungsi submitLoanApplication pada smart contract Koperasi.
Test case should approve loan application berfungsi untuk menguji fungsi approveLoan pada smart contract Koperasi.
Pada test case should submit loan application, kami menentukan jumlah pinjaman dan durasi pinjaman yang diajukan dan memverifikasi bahwa pengajuan pinjaman berhasil.
Pada test case should approve loan application, kami menyetujui pengajuan pinjaman yang telah diajukan sebelumnya menggunakan akun pemilik kontrak (owner) dan memverifikasi bahwa persetujuan berhasil dilakukan.
Pastikan Anda telah menjalankan smart contract Koperasi pada lingkungan pengujian menggunakan Hardhat sebelum menjalankan pengujian ini. Selain itu, pastikan fungsi submitLoanApplication dan approveLoan telah diimplementasikan dengan benar pada smart contract Koperasi untuk melakukan pengujian ini dengan sukses.







*/

describe("Koperasi", function() {
    let koperasi;
    let owner;
    let member1;
    let member2;

    beforeEach(async function() {
        const Koperasi = await ethers.getContractFactory("Koperasi");
        [owner, member1, member2] = await ethers.getSigners();

        koperasi = await Koperasi.deploy();
        await koperasi.deployed();

        // Register member1 for the test
        await koperasi.connect(member1).registerMember(
            "John Doe",
            "john.doe@example.com",
            1234567890,
            "123 Main Street, City",
            20000101,
            0
        );
    });

    it("should register a new member", async function() {
        const testName = "John Doe";
        const testEmail = "john.doe@example.com";
        const testPhoneNumber = 1234567890;
        const testAddressInfo = "123 Main Street, City";
        const testDateOfBirth = 20000101; // January 1, 2000
        const testGender = 0; // 0 for male, 1 for female

        const initialMemberCount = await koperasi.getMemberCount();

        await koperasi.connect(member1).registerMember(
            testName,
            testEmail,
            testPhoneNumber,
            testAddressInfo,
            testDateOfBirth,
            testGender
        );

        const newMemberCount = await koperasi.getMemberCount();
        expect(newMemberCount).to.equal(initialMemberCount.add(1));

        const registeredMember = await koperasi.members(member1.address);
        expect(registeredMember.name).to.equal(testName);
        expect(registeredMember.email).to.equal(testEmail);
        expect(registeredMember.phoneNumber).to.equal(testPhoneNumber);
        expect(registeredMember.addressInfo).to.equal(testAddressInfo);
        expect(registeredMember.dateOfBirth).to.equal(testDateOfBirth);
        expect(registeredMember.gender).to.equal(testGender);
        expect(registeredMember.isActive).to.be.true;
    });

    // Test case for depositing savings
    it("should deposit savings", async function() {
        const initialBalance = await koperasi.getBalance(member1.address);

        const depositAmount = ethers.utils.parseEther("5.0"); // 5 ETH
        await koperasi.connect(member1).depositSavings({ value: depositAmount });

        const newBalance = await koperasi.getBalance(member1.address);
        expect(newBalance).to.equal(initialBalance.add(depositAmount));
    });

    // Test case for withdrawing savings
    it("should withdraw savings", async function() {
        const initialBalance = await koperasi.getBalance(member1.address);

        const withdrawAmount = ethers.utils.parseEther("2.0"); // 2 ETH
        await koperasi.connect(member1).withdrawSavings(withdrawAmount);

        const newBalance = await koperasi.getBalance(member1.address);
        expect(newBalance).to.equal(initialBalance.sub(withdrawAmount));
    });


    // Test case for loan application
    it("should submit loan application", async function() {
        const loanAmount = ethers.utils.parseEther("10.0"); // 10 ETH
        const loanDuration = 12; // 12 bulan

        const initialLoanApplications = await koperasi.getLoanApplicationsCount();

        await koperasi.connect(member1).submitLoanApplication(loanAmount, loanDuration);

        const newLoanApplications = await koperasi.getLoanApplicationsCount();
        expect(newLoanApplications).to.equal(initialLoanApplications.add(1));

        const loanApplication = await koperasi.getLoanApplication(newLoanApplications.sub(1));
        expect(loanApplication.amount).to.equal(loanAmount);
        expect(loanApplication.duration).to.equal(loanDuration);
        expect(loanApplication.status).to.equal(0); // 0 for pending
        expect(loanApplication.approvedBy).to.equal(address(0)); // 0 address for pending
    });

    // Test case for loan approval
    it("should approve loan application", async function() {
        const loanAmount = ethers.utils.parseEther("10.0"); // 10 ETH
        const loanDuration = 12; // 12 bulan

        // Submit loan application
        await koperasi.connect(member1).submitLoanApplication(loanAmount, loanDuration);

        const initialLoanApplications = await koperasi.getLoanApplicationsCount();

        // Approve loan application by owner
        await koperasi.connect(owner).approveLoan(initialLoanApplications.sub(1));

        const newLoanApplications = await koperasi.getLoanApplicationsCount();
        expect(newLoanApplications).to.equal(initialLoanApplications);

        const loanApplication = await koperasi.getLoanApplication(initialLoanApplications.sub(1));
        expect(loanApplication.status).to.equal(1); // 1 for approved
        expect(loanApplication.approvedBy).to.equal(owner.address);
    });
});