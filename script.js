document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".nav");
    const list = parent.querySelector(".nav-list");
    list.classList.toggle("show");
  });
});

window.addEventListener("load", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    setTimeout(() => hero.classList.add("show"), 120);
  }
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeEls.forEach((el) => observer.observe(el));

document.querySelectorAll(".about").forEach((el) => observer.observe(el));
document.querySelectorAll(".projects").forEach((el) => observer.observe(el));
document
  .querySelectorAll(".about-section")
  .forEach((el) => observer.observe(el));

document
  .querySelectorAll(".skills-section")
  .forEach((el) => observer.observe(el));

["year", "year2", "year3", "year4", "year5"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
});

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = Array.from(document.querySelectorAll(".fade-in"));

  if (fadeEls.length === 0) {
    console.debug("No .fade-in elements found.");
    return;
  }

  if (!("IntersectionObserver" in window)) {
    console.warn(
      "IntersectionObserver not supported — revealing fade-in elements immediately."
    );
    fadeEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observerOptions = {
    threshold: 0.18,
    rootMargin: "0px 0px -5% 0px",
  };

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeEls.forEach((el) => io.observe(el));

  setTimeout(() => {
    fadeEls.forEach((el) => {
      if (!el.classList.contains("visible")) {
        el.classList.add("visible");
        io.unobserve(el);
      }
    });
    console.debug("Safety timeout: ensured all fade-in elements are visible.");
  }, 3000);
});

const typingElement = document.querySelector(".typing");
const roles = [
  "Full Stack Developer",
  "Machine Learning Enthusiast",
  "Tech Innovator",
  "Problem Solver",
  "Aspiring software engineer",
];
let roleIndex = 0;
let charIndex = 0;
let currentRole = "";
let isDeleting = false;

function typeEffect() {
  currentRole = roles[roleIndex];
  if (!isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Responsive navigation toggle
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", typeEffect);

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("fade-in");

  if (isOpen) {
    navToggle.textContent = "✖";
    navToggle.classList.add("active");
  } else {
    navToggle.textContent = "☰";
    navToggle.classList.remove("active");
  }
});

// Form validation

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  // Validation
  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
    formStatus.classList.add("error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.classList.add("error");
    return;
  }

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent = "✅ Message sent successfully!";
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      throw new Error("Network error");
    }
  } catch (error) {
    formStatus.textContent = "❌ Something went wrong. Please try again.";
    formStatus.classList.add("error");
  }
});
