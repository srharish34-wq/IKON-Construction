// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — script.js
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── HEADER SCROLL EFFECT ───
  const header = document.getElementById('header');
  const floatingEnquiry = document.getElementById('floatingEnquiry');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    header.classList.toggle('scrolled', scrolled);
    floatingEnquiry.classList.toggle('visible', window.scrollY > 400);
  });

  // ─── HAMBURGER MENU ───
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = nav.classList.contains('open') ? 'translateY(7px) rotate(45deg)' : '';
    bars[1].style.opacity = nav.classList.contains('open') ? '0' : '';
    bars[2].style.transform = nav.classList.contains('open') ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // ─── SCROLL REVEAL ───
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Start counters when hero stats are visible
        if (entry.target.closest('.hero-content') || window.scrollY < 200) {
          startCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // Trigger hero counters after a short delay on load
  setTimeout(startCounters, 1200);

  // ─── PROJECT TABS ───
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + target).classList.add('active');
    });
  });

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.classList.remove('open');
      }
    });
  });

  // ─── HERO IMAGE FALLBACK (if no image loaded) ───
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    heroImg.onerror = () => {
      heroImg.style.display = 'none';
      heroImg.parentElement.style.background = 'linear-gradient(135deg, #0A1931 0%, #112240 50%, #0A1931 100%)';
    };
  }

  // ─── NAV ACTIVE STATE ON SCROLL ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current ||
          (current === 'home' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  });

});

// ─── FAQ ACCORDION ───
const faqBtns = document.querySelectorAll('.faq-q');
faqBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    faqBtns.forEach(b => { b.classList.remove('open'); b.nextElementSibling.classList.remove('open'); });
    if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
  });
});

// ─── IMPACT COUNTERS ───
const impactCounters = document.querySelectorAll('.impact-counter');
const impactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const step = target / (1600 / 16);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else { el.textContent = Math.floor(current); }
      }, 16);
      impactObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
impactCounters.forEach(el => impactObserver.observe(el));