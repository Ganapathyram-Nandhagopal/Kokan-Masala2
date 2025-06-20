// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initNavigation()
  initHeroAnimations()
  initMenuTabs()
  initCounters()
  initContactForm()
  initScrollEffects()
  initBackToTop()
  initNewsletterForm()
  initLoadingAnimations()
})

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Hero animations
function initHeroAnimations() {
  const heroContent = document.querySelector(".hero-content")
  const heroImage = document.querySelector(".hero-image")

  // Add entrance animations
  setTimeout(() => {
    if (heroContent) heroContent.classList.add("fade-in-up")
  }, 300)

  setTimeout(() => {
    if (heroImage) heroImage.classList.add("fade-in-up")
  }, 600)
}

// Menu tabs functionality
function initMenuTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })

  // Order button functionality
  const orderButtons = document.querySelectorAll(".order-btn")
  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const menuItem = this.closest(".menu-item")
      const itemName = menuItem.querySelector("h3").textContent
      const itemPrice = menuItem.querySelector(".price").textContent

      // Simple alert for demo - in real app, this would add to cart
      alert(`Added ${itemName} (${itemPrice}) to cart!`)
    })
  })
}

// Counter animation for statistics
function initCounters() {
  const counters = document.querySelectorAll(".stat-number")
  const speed = 200 // Animation speed

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const count = Number.parseInt(counter.innerText)
    const increment = target / speed

    if (count < target) {
      counter.innerText = Math.ceil(count + increment)
      setTimeout(() => animateCounter(counter), 1)
    } else {
      counter.innerText = target
    }
  }

  // Intersection Observer for counter animation
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          if (!counter.classList.contains("animated")) {
            counter.classList.add("animated")
            animateCounter(counter)
          }
        }
      })
    },
    { threshold: 0.7 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const phone = formData.get("phone")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.")
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".about-card, .menu-item, .service-card, .contact-item")
  animateElements.forEach((el) => {
    observer.observe(el)
  })
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Newsletter form
function initNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = this.querySelector('input[type="email"]').value

      if (!email) {
        alert("Please enter your email address.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate subscription
      alert("Thank you for subscribing to our newsletter!")
      this.reset()
    })
  }
}

// Loading animations
function initLoadingAnimations() {
  const loadingElements = document.querySelectorAll(".loading")

  setTimeout(() => {
    loadingElements.forEach((el) => {
      el.classList.add("loaded")
    })
  }, 100)
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 70
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Parallax effect for hero section
function initParallaxEffect() {
  const hero = document.querySelector(".hero")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallax = scrolled * 0.5

    if (hero) {
      hero.style.transform = `translateY(${parallax}px)`
    }
  })
}

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Service cards hover effect
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Menu item animations
  const menuItems = document.querySelectorAll(".menu-item")
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const img = this.querySelector("img")
      if (img) {
        img.style.transform = "scale(1.1) rotate(2deg)"
      }
    })

    item.addEventListener("mouseleave", function () {
      const img = this.querySelector("img")
      if (img) {
        img.style.transform = "scale(1) rotate(0deg)"
      }
    })
  })
})

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Handle scroll events here if needed
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
