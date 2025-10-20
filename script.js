document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById("loader");
  const progress = document.querySelector(".progress");
  const sideLinks = document.querySelectorAll(".sidebar a");

  // Loading bar logic
  if (!sessionStorage.getItem("loaded")) {
    sessionStorage.setItem("loaded", "true");
    setTimeout(() => loader.classList.add("fade-out"), 2500);
  } else {
    loader.style.display = "none";
  }

  // Sidebar active link
  const path = location.pathname.split("/").pop();
  sideLinks.forEach(link => {
    if (link.getAttribute("href") === path) link.classList.add("active");
  });

  // Fade-slide animation
  const elements = document.querySelectorAll(".fade-slide");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
});
// Khi load trang -> kích hoạt hiệu ứng lướt trái cho các khung
window.addEventListener("load", () => {
  const slideItems = document.querySelectorAll(".card, .project, .award, .certificate, .skill-card");
  slideItems.forEach((el, i) => {
    el.classList.add("slide-in");
    el.style.animationDelay = `${i * 0.1}s`; // tạo hiệu ứng lướt nối tiếp nhau
  });
});
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
    }
  }, 4000);