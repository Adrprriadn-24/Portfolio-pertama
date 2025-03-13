document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Contoh validasi sederhana
  if (username === "dompuboy" && password === "gueganteng123") {
    // Jika login berhasil, arahkan ke halaman utama
    window.location.href = "halaman-utama.html";
  } else {
    alert("Username atau password salah!");
  }
});

// Cursor functionality
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

function moveCursor(e) {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  requestAnimationFrame(() => {
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
  });
}

document.addEventListener("mousemove", moveCursor);

// Gallery filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-filter") === filterValue
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Help Widget Functionality
const helpToggle = document.querySelector(".help-toggle");
const helpPanel = document.querySelector(".help-panel");
const helpClose = document.querySelector(".help-close");
const faqQuestions = document.querySelectorAll(".faq-question");

if (helpToggle && helpPanel && helpClose) {
  helpToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    helpPanel.classList.toggle("active");
  });

  helpClose.addEventListener("click", (e) => {
    e.stopPropagation();
    helpPanel.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if (!helpPanel.contains(e.target) && !helpToggle.contains(e.target)) {
      helpPanel.classList.remove("active");
    }
  });

  helpPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;

      faqQuestions.forEach((q) => {
        if (q !== question && q.classList.contains("active")) {
          q.classList.remove("active");
          const otherAnswer = q.nextElementSibling;
          otherAnswer.classList.remove("active");
          otherAnswer.style.maxHeight = "0";
        }
      });

      question.classList.toggle("active");
      if (answer) {
        answer.classList.toggle("active");
        if (answer.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
          answer.style.maxHeight = "0";
        }
      }
    });
  });
}

// Logo dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo");
  const logoDropdown = document.querySelector(".logo-dropdown");

  // Toggle dropdown saat logo diklik
  logo.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    logoDropdown.classList.toggle("show");
  });

  // Tutup dropdown ketika klik di luar
  document.addEventListener("click", function (e) {
    if (!logo.contains(e.target)) {
      logoDropdown.classList.remove("show");
    }
  });

  // Handle dropdown item clicks
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const action = item.getAttribute("data-action");

      switch (action) {
        case "login":
          window.location.href = "index.html";
          break;
        case "signup":
          alert("Sign Up clicked");
          break;
        case "logout":
          alert("Logout clicked");
          break;
      }

      // Tutup dropdown setelah item diklik
      logoDropdown.classList.remove("show");
    });
  });
});

// Custom Cursor
document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  if (!cursor || !cursorDot) return; // Pastikan elemen cursor ada

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;

  // Update posisi mouse dengan throttling
  let isMoving = false;
  document.addEventListener("mousemove", (e) => {
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(() => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = false;
      });
    }
  });

  // Animasi cursor yang dioptimasi
  function updateCursor() {
    // Smooth movement untuk cursor utama
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;

    cursorX += diffX * 0.15; // Sedikit lebih cepat
    cursorY += diffY * 0.15;

    // Smooth movement untuk cursor dot
    const dotDiffX = mouseX - dotX;
    const dotDiffY = mouseY - dotY;

    dotX += dotDiffX * 0.35; // Dot bergerak lebih cepat
    dotY += dotDiffY * 0.35;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  // Efek hover yang dioptimasi
  const clickables = document.querySelectorAll("a, button, input, textarea");
  clickables.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    elem.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // Handle cursor visibility
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorDot.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorDot.style.opacity = "1";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Buat overlay element
  const overlay = document.createElement("div");
  overlay.classList.add("menu-overlay");
  body.appendChild(overlay);

  // Toggle menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  });

  // Tutup menu saat klik overlay
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    body.style.overflow = "";
  });

  // Tutup menu saat klik link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
      body.style.overflow = "";
    });
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
