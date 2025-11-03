// Initialize EmailJS and handle contact form



// 🔍 Search feature for projects, services, and education
document.getElementById("search").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const items = document.querySelectorAll(".card, .timeline-item");

  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? "" : "none";
  });
});

// Optional: mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("open");
});
