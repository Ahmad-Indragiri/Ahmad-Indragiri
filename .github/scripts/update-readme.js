const fs = require('fs');
const path = require('path');

// Path ke file README_BASE.md dan README.md final
const readmeBasePath = path.join(__dirname, '../../README_BASE.md');
const readmePath = path.join(__dirname, '../../README.md');

// --- Konten Dinamis ---

// 1. Tanggal Pembaruan
function getFormattedDate() {
    const today = new Date();
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short', timeZone: 'Asia/Jakarta' // Sesuaikan dengan zona waktu Anda
    };
    return today.toLocaleDateString('id-ID', options); // Ganti 'id-ID' jika ingin bahasa Inggris 'en-US'
}

// 2. Kutipan (Quotes)
const quotes = [
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs"},
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine"},
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler"}
];
function getRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return `"${randomQuote.text}" – ${randomQuote.author}`;
}

// 3. Tech Trivia / Fun Facts
const techFacts = [
    "Did you know that the first computer programmer was a woman named Ada Lovelace?",
    "The first computer 'bug' was an actual moth stuck in a relay of the Harvard Mark II computer.",
    "JavaScript was created in just 10 days by Brendan Eich in 1995.",
    "Python was named after the British comedy group Monty Python.",
    "The term 'Wi-Fi' doesn't actually stand for anything. It was a marketing term created by a branding firm.",
    "Approximately 70% of all coding jobs are in non-tech industries.",
    "The QWERTY keyboard layout was designed to slow typists down to prevent typewriter jams."
];
function getRandomTechFact() {
    return techFacts[Math.floor(Math.random() * techFacts.length)];
}

// 4. Topik Pembelajaran Acak (Contoh)
const learningTopics = [
    "Advanced CSS Animations",
    "Serverless Architectures with AWS Lambda",
    "GraphQL Best Practices",
    "WebAssembly Fundamentals",
    "Rust for Web Development",
    "Quantum Computing Basics (just for fun!)"
];
function getRandomLearningTopic() {
    return learningTopics[Math.floor(Math.random() * learningTopics.length)];
}

// --- Fungsi Utama untuk Memperbarui README ---
async function updateReadme() {
    try {
        let readmeBaseContent = await fs.promises.readFile(readmeBasePath, 'utf8');

        // Ganti placeholder dengan konten dinamis
        // Ini menggunakan regex untuk mengganti konten di dalam tag span
        readmeBaseContent = readmeBaseContent.replace(/<span id="dynamic-quote">.*?<\/span>/, `<span id="dynamic-quote">${getRandomQuote()}</span>`);
        readmeBaseContent = readmeBaseContent.replace(/<span id="last-updated">.*?<\/span>/, `<span id="last-updated">${getFormattedDate()}</span>`);
        readmeBaseContent = readmeBaseContent.replace(/<em id="dynamic-fact">.*?<\/em>/, `<em id="dynamic-fact">${getRandomTechFact()}</em>`);
        readmeBaseContent = readmeBaseContent.replace(/<span id="dynamic-learning-topic">.*?<\/span>/, `<span id="dynamic-learning-topic">${getRandomLearningTopic()}</span>`);

        // Jika Anda ingin menambahkan posting blog (memerlukan parsing RSS/Atom)
        // Misal: const blogPostsHTML = await getLatestBlogPosts();
        // readmeBaseContent = readmeBaseContent.replace(/<ul id="latest-blog-posts">.*?<\/ul>/s, `<ul id="latest-blog-posts">${blogPostsHTML}</ul>`);

        await fs.promises.writeFile(readmePath, readmeBaseContent, 'utf8');
        console.log("README.md berhasil diperbarui dengan konten dinamis!");

    } catch (error) {
        console.error("Gagal memperbarui README:", error);
        process.exit(1);
    }
}

// --- (Opsional) Fungsi untuk mengambil posting blog ---
// Ini adalah contoh SANGAT sederhana, Anda perlu library seperti 'rss-parser'
// async function getLatestBlogPosts() {
//   try {
//     // const Parser = require('rss-parser');
//     // const parser = new Parser();
//     // const feed = await parser.parseURL('URL_RSS_FEED_BLOG_ANDA');
//     // let postsHTML = '';
//     // feed.items.slice(0, 3).forEach(item => { // Ambil 3 posting terbaru
//     //   postsHTML += `<li><a href="${item.link}" target="_blank">${item.title}</a> - ${new Date(item.isoDate).toLocaleDateString('id-ID')}</li>\n`;
//     // });
//     // return postsHTML || "<li>Tidak ada posting terbaru atau gagal mengambil data.</li>";
//     return "<li>Contoh Post 1</li><li>Contoh Post 2</li>"; // Placeholder
//   } catch (error) {
//     console.warn("Gagal mengambil posting blog:", error);
//     return "<li>Gagal mengambil data posting blog.</li>";
//   }
// }

updateReadme();
