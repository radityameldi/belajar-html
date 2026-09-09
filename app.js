// ============================================
// 1. Tahun otomatis di footer
// ============================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================
// 2. Animasi reveal judul hero saat halaman dimuat
//    (dihormati jika user memilih reduced motion)
// ============================================
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  document.body.classList.add("loaded");
} else {
  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      document.body.classList.add("loaded");
    });
  });
}

// ============================================
// 3. Pratinjau proyek mengikuti kursor
//    Setiap baris proyek punya data-color sebagai
//    warna placeholder. Ganti dengan gambar asli
//    dengan menambahkan background-image di sini.
// ============================================
const preview = document.getElementById("projectPreview");
const rows = document.querySelectorAll(".project-row");

rows.forEach((row) => {
  const color = row.dataset.color || "#B08A3E";

  row.addEventListener("mouseenter", () => {
    preview.style.background = `linear-gradient(135deg, ${color}, ${color}cc)`;
    preview.classList.add("visible");
  });

  row.addEventListener("mouseleave", () => {
    preview.classList.remove("visible");
  });

  row.addEventListener("mousemove", (e) => {
    preview.style.left = `${e.clientX}px`;
    preview.style.top = `${e.clientY}px`;
  });
});

// ============================================
// 4. Menandai link navigasi yang sedang aktif
//    berdasarkan section yang terlihat di layar
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.nav === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));
