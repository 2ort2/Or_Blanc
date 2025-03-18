document.addEventListener("DOMContentLoaded", function () {
  // Current year for footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");

  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add(
        "bg-white/90",
        "backdrop-blur-md",
        "shadow-sm",
        "py-3"
      );
      navbar.classList.remove("bg-transparent", "py-5");
    } else {
      navbar.classList.add("bg-transparent", "py-5");
      navbar.classList.remove(
        "bg-white/90",
        "backdrop-blur-md",
        "shadow-sm",
        "py-3"
      );
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.querySelector(".menu-icon");
  const xIcon = document.querySelector(".x-icon");

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("translate-x-full");

    if (isOpen) {
      mobileMenu.classList.remove("translate-x-full");
      menuIcon.classList.add("hidden");
      xIcon.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("translate-x-full");
      menuIcon.classList.remove("hidden");
      xIcon.classList.add("hidden");
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // CTA button scroll to products
  const ctaButton = document.querySelector(".cta-btn");
  const scrollButton = document.querySelector(".scroll-btn");

  function scrollToProducts() {
    const productsSection = document.getElementById("produits");
    if (productsSection) {
      window.scrollTo({
        top: productsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  }

  if (ctaButton) ctaButton.addEventListener("click", scrollToProducts);
  if (scrollButton) scrollButton.addEventListener("click", scrollToProducts);

  // Parallax effect for hero section
  const heroContent = document.querySelector(".hero-content");

  function handleParallax() {
    const scrollPosition = window.scrollY;
    const opacity = 1 - scrollPosition / 700;
    const translateY = scrollPosition * 0.4;

    if (opacity > 0) {
      heroContent.style.opacity = opacity.toString();
      heroContent.style.transform = `translateY(${translateY}px)`;
    }
  }

  window.addEventListener("scroll", handleParallax);

  // Animation on scroll
  const animatedElements = document.querySelectorAll(".animate-fade-up");

  function checkScroll() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight * 0.9) {
        const delay = element.getAttribute("data-delay") || 0;
        setTimeout(() => {
          element.style.animationDelay = delay + "s";
          element.style.animationPlayState = "running";
          element.style.opacity = "1";
        }, delay * 1000);
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Here you would normally send the form data to your backend
      console.log("Form submitted:", formData);

      // Show toast
      toast.classList.remove("translate-x-full");

      // Reset form
      contactForm.reset();

      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.add("translate-x-full");
      }, 5000);
    });
  }

  // Create images directory if needed
  console.log(
    'Note: Make sure to create an "images" folder and add your placeholder.svg image there'
  );
});

// Add backdrop-blur polyfill for browsers that don't support it
if (!CSS.supports("backdrop-filter", "blur(4px)")) {
  document
    .querySelectorAll(".glass-panel, .bg-white\\/90")
    .forEach((element) => {
      element.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    });
}
