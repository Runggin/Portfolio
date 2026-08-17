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

// Lightbox for Certificates and Awards
document.addEventListener("DOMContentLoaded", function() {
  // Tạo HTML cho Modal
  const modalHtml = `
    <div id="imageModal" class="image-modal">
      <span class="modal-close">&times;</span>
      <img class="modal-content" id="modalImg">
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const span = document.getElementsByClassName("modal-close")[0];

  // Tìm tất cả ảnh trong award và certificate
  const images = document.querySelectorAll(".award img, .certificate img");
  
  images.forEach(img => {
    img.addEventListener("click", function() {
      modal.style.display = "flex"; // hiển thị tạm để tính layout
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);
      modalImg.src = this.src;
    });
  });

  // Đóng modal khi click dấu x
  span.addEventListener("click", function() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });

  // Đóng modal khi click ra ngoài ảnh
  modal.addEventListener("click", function(e) {
    if (e.target !== modalImg) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });
});