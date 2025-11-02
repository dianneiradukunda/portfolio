// Initialize EmailJS and handle contact form
(function() {
  emailjs.init("public_123abcXYZ"); // ← YOUR PUBLIC KEY

  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_abc123", "template_456xyz", this)
      .then(() => {
        document.getElementById("form-status").textContent = "✅ Message sent successfully!";
        this.reset();
      }, (error) => {
        document.getElementById("form-status").textContent = "❌ Failed to send message.";
        console.error(error);
      });
  });
})();


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
