// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Mobile dropdown toggles
document.querySelectorAll('.nav-item.has-dropdown .nav-link').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      btn.closest('.nav-item').classList.toggle('dropdown-open');
    }
  });
});

// Close mobile menu on link click
document.querySelectorAll('.dropdown__link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Tabs
document.querySelectorAll('.tabs__btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    const tabsContainer = btn.closest('.tabs');
    tabsContainer.querySelectorAll('.tabs__btn').forEach(b => b.classList.remove('active'));
    tabsContainer.querySelectorAll('.tabs__panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
  });
});

// Solution filter tabs
document.querySelectorAll('.tabs__btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    btn.closest('.tabs__nav').querySelectorAll('.tabs__btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.solution-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .solution-card, .testimonial-card, .number-card, .insight-card, .article-card, .partner-card').forEach(el => {
  observer.observe(el);
});

// Number counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalValue = parseInt(target.getAttribute('data-target'));
      if (!finalValue) return;
      let current = 0;
      const increment = Math.ceil(finalValue / 60);
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
          current = finalValue;
          clearInterval(timer);
        }
        target.textContent = current.toLocaleString() + '+';
      }, 16);
      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.number-card__value[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// Header scroll effect
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    header.style.boxShadow = 'none';
  }
  lastScrollY = window.scrollY;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mainNav.classList.remove('open');
    }
  });
});
