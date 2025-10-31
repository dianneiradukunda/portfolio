// Initialize EmailJS
(function () {
  emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY_HERE", // replace with your EmailJS public key
  });
})();

// Handle contact form submission
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  status.innerHTML = "Sending...";

  emailjs
    .sendForm("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", this)
    .then(() => {
      status.style.color = "#00ffe7";
      status.innerHTML = "✅ Message sent successfully!";
      form.reset();
    })
    .catch((error) => {
      status.style.color = "red";
      status.innerHTML = "❌ Failed to send message. Try again later.";
      console.error("EmailJS Error:", error);
    });
});

// Highlight active nav link on scroll
const navLinks = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 60;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
