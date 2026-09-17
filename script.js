// ============================================
// 1. Tahun otomatis di sidebar
// ============================================
document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ============================================
// 2. Kursor kustom mengikuti mouse
//    (titik mengikuti langsung, lingkaran dengan jeda halus)
// ============================================
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover && cursorDot && cursorRing) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function followCursor() {
    ringX += (mouseX - ringX) * 0.50;
    ringY += (mouseY - ringY) * 0.50;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(followCursor);
  }
  followCursor();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovering"));
  });
}

// ============================================
// 3. Reveal galeri karya saat discroll ke layar
// ============================================
const tiles = document.querySelectorAll(".tile, .about-photo");

const tileObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        tileObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

tiles.forEach((tile) => tileObserver.observe(tile));

if (prefersReducedMotion) {
  tiles.forEach((tile) => tile.classList.add("in-view"));
}

// ============================================
// 4. Angka statistik menghitung naik saat terlihat
// ============================================
const statNumbers = document.querySelectorAll(".stat-num");

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (prefersReducedMotion) {
          entry.target.textContent = entry.target.dataset.count;
        } else {
          animateCount(entry.target);
        }
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => statObserver.observe(el));

// ============================================
// 5. Menandai link sidebar yang sedang aktif
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".side-nav a");

const sectionObserver = new IntersectionObserver(
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

sections.forEach((section) => sectionObserver.observe(section));
