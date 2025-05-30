const fs = require('fs');
const path = require('path');

// Path ke file README_BASE.md dan README.md final
// __dirname di sini akan merujuk ke .github/scripts/
const readmeBasePath = path.join(__dirname, '../../README_BASE.md');
const readmePath = path.join(__dirname, '../../README.md');

// --- Pembuatan Konten Dinamis ---

// 1. Tanggal
const today = new Date();
const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
};
// Anda bisa mengganti 'en-US' dengan 'id-ID' jika ingin format tanggal Indonesia
const formattedDate = today.toLocaleDateString('en-US', dateOptions) + " (UTC)";

// 2. Kutipan (Quotes)
const quotes = [
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    "“The best way to predict the future is to create it.” - Peter Drucker",
    "“Simplicity is the ultimate sophistication.” – Leonardo da Vinci",
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Make it work, make it right, make it fast.” – Kent Beck",
    "“Talk is cheap. Show me the code.” – Linus Torvalds"
    // Tambahkan kutipan favorit Anda di sini
];
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

// --- Baca, Ganti Placeholder, dan Tulis ---
fs.readFile(readmeBasePath, 'utf8', (err, readmeBaseContent) => {
    if (err) {
        console.error("Gagal membaca README_BASE.md:", err);
        process.exit(1);
    }

    let updatedReadme = readmeBaseContent;

    // Ganti placeholder dengan konten dinamis
    updatedReadme = updatedReadme.replace('', randomQuote);
    updatedReadme = updatedReadme.replace('', formattedDate);

    fs.writeFile(readmePath, updatedReadme, 'utf8', (errWrite) => {
        if (errWrite) {
            console.error("Gagal menulis README.md:", errWrite);
            process.exit(1);
        }
        console.log("README.md berhasil diperbarui dengan konten dinamis.");
    });
});
