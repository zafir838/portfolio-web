// ==========================================================================
// 1. PENGATURAN EMAIL TUJUAN (GANTI ALAMAT GMAIL DI BARIS BAWAH INI)
// ==========================================================================
const GMAIL_TUJUAN = "zafirjaa83@gmail.com";

// ==========================================================================
// 2. THEME SWITCHER (LIGHT MODE & DARK MODE)
// ==========================================================================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("raffa-theme");

// Jika belum ada pilihan tersimpan, gunakan dark mode sebagai tampilan awal
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
} else {
  document.documentElement.dataset.theme = "dark";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("raffa-theme", nextTheme);
  updateThemeIcon();
});

function updateThemeIcon() {
  themeIcon.textContent =
    document.documentElement.dataset.theme === "dark" ? "☀" : "☾";
}

// ==========================================================================
// 3. NAVIGASI MOBILE (MENU HAMBURGER DI LAYAR HP)
// ==========================================================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ==========================================================================
// 4. ANIMASI MUNCUL SAAT DI-SCROLL (REVEAL OBSERVER)
// ==========================================================================
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

// ==========================================================================
// 5. INDIKATOR GARIS PROGRES SCROLL DI BAGIAN ATAS
// ==========================================================================
const progressBar = document.getElementById("scrollProgress");
window.addEventListener(
  "scroll",
  () => {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  },
  { passive: true },
);

// ==========================================================================
// 6. FORMULIR GET IN TOUCH (LANGSUNG MEMBUKA GMAIL / EMAIL CLIENT)
// ==========================================================================
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const displayEmail = document.getElementById("displayEmail");

// Sinkronkan teks email di halaman dengan variabel GMAIL_TUJUAN di atas
if (displayEmail) {
  displayEmail.textContent = `${GMAIL_TUJUAN} ↗`;
  displayEmail.href = `mailto:${GMAIL_TUJUAN}`;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const subject = encodeURIComponent(`Pesan Portfolio dari ${name}`);
  const body = encodeURIComponent(
    `Halo Raffa,

Nama: ${name}
Email Pengirim: ${email}

Isi Pesan:
${message}`,
  );

  // Buka Gmail Web Compose di tab baru agar langsung siap kirim
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    GMAIL_TUJUAN,
  )}&su=${subject}&body=${body}`;

  formNote.textContent =
    "Membuka jendela Gmail dengan pesan yang sudah terisi otomatis...";
  window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
});

// ==========================================================================
// 7. TAHUN OTOMATIS DI FOOTER
// ==========================================================================
document.getElementById("year").textContent = new Date().getFullYear();
