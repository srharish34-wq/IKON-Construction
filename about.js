// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — about.js
//  About Us page specific scripts
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── HEADER SCROLL ───
  const header = document.getElementById('header');
  const floatingEnquiry = document.getElementById('floatingEnquiry');

  window.addEventListener('scroll', () => {
    floatingEnquiry && floatingEnquiry.classList.toggle('visible', window.scrollY > 400);
  });

  // ─── HAMBURGER MENU ───
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const bars = hamburger.querySelectorAll('span');
      const isOpen = nav.classList.contains('open');
      bars[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      bars[1].style.opacity   = isOpen ? '0' : '';
      bars[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });
  }

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ─── ABOUT COUNTERS ───
  const aboutCounters = document.querySelectorAll('.about-counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  aboutCounters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target  = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step    = target / (duration / 16);
    let current   = 0;
    const timer   = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ─── TESTIMONIAL SLIDER ───
  const track    = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('tslDots');
  const prevBtn  = document.getElementById('tslPrev');
  const nextBtn  = document.getElementById('tslNext');

  if (track && dotsWrap) {
    const cards       = track.querySelectorAll('.tsl-card');
    const total       = cards.length;
    let current       = 0;
    let autoplay;
    let visibleCards  = getVisibleCount();

    // Build dots
    function buildDots() {
      dotsWrap.innerHTML = '';
      const totalSlides = total - visibleCards + 1;
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('tsl-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function getVisibleCount() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function getCardWidth() {
  const wrapperWidth = track.parentElement.getBoundingClientRect().width;
  const visible = getVisibleCount();
  const gap = 28;
  return (wrapperWidth - (gap * (visible - 1))) / visible + gap;
}

    function goTo(index) {
      const maxIndex = total - visibleCards;
      current = Math.max(0, Math.min(index, maxIndex));
      const offset = current * getCardWidth();
      track.style.transform = `translateX(-${offset}px)`;
      // Update dots
      dotsWrap.querySelectorAll('.tsl-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function nextSlide() {
      const maxIndex = total - visibleCards;
      goTo(current >= maxIndex ? 0 : current + 1);
    }

    function prevSlide() {
      const maxIndex = total - visibleCards;
      goTo(current <= 0 ? maxIndex : current - 1);
    }

    function startAutoplay() {
      clearInterval(autoplay);
      autoplay = setInterval(nextSlide, 4500);
    }

    prevBtn && prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    nextBtn && nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        startAutoplay();
      }
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', startAutoplay);

    // Resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        visibleCards = getVisibleCount();
        buildDots();
        goTo(0);
      }, 250);
    });

    buildDots();
    goTo(0);
    startAutoplay();
  }

  // ─── TIMELINE ANIMATION ───
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 120);
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    tlObserver.observe(item);
  });

  // ─── STRENGTH BARS ANIMATION ───
  const strFills = document.querySelectorAll('.str-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // bars animate via CSS animation, just trigger
        entry.target.style.animationPlayState = 'running';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  strFills.forEach(el => {
    el.style.animationPlayState = 'paused';
    barObserver.observe(el);
  });

  // ─── IMPACT BARS ───
  const impactFills = document.querySelectorAll('.impact-bar-fill');
  const impactBarObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        impactBarObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  impactFills.forEach(el => {
    el.style.animationPlayState = 'paused';
    impactBarObs.observe(el);
  });

  // ─── PAGE HERO PARALLAX ───
  const heroBg = document.querySelector('.page-hero-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ─── VMV CARDS STAGGER ───
  const vmvCards = document.querySelectorAll('.vmv-card');
  const vmvObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = Array.from(vmvCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 150);
        vmvObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  vmvCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, background 0.3s, transform 0.3s';
    vmvObserver.observe(card);
  });

  // ─── CERT CARDS STAGGER ───
  const certCards = document.querySelectorAll('.cert-card');
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(certCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        certObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  certCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-top-color 0.3s';
    certObserver.observe(card);
  });

  // ─── SUPPORT CARDS STAGGER ───
  const supportCards = document.querySelectorAll('.support-card');
  const supObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(supportCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 90);
        supObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  supportCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, background 0.3s, border-bottom-color 0.3s';
    supObserver.observe(card);
  });

});