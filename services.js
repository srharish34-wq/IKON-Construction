// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — services.js
//  Services page specific scripts
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── HAMBURGER MENU ───
  // const hamburger = document.getElementById('hamburger');
  // const nav       = document.getElementById('nav');
  // if (hamburger && nav) {
  //   hamburger.addEventListener('click', () => {
  //     nav.classList.toggle('open');
  //     const bars = hamburger.querySelectorAll('span');
  //     const open = nav.classList.contains('open');
  //     bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
  //     bars[1].style.opacity   = open ? '0' : '';
  //     bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  //   });
  // }

  // ─── FLOATING ENQUIRY ───
  const floatingEnquiry = document.getElementById('floatingEnquiry');
  window.addEventListener('scroll', () => {
    floatingEnquiry && floatingEnquiry.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ─── BUILD + INJECT STICKY SERVICE NAV ───
  const services = [
    { id: 'individual', icon: '🏠', label: 'Individual Houses' },
    { id: 'apartments', icon: '🏢', label: 'Apartments'        },
    { id: 'villas',     icon: '🏡', label: 'Villas'            },
    { id: 'commercial', icon: '🏗️', label: 'Commercial'        },
    { id: 'renovation', icon: '🔨', label: 'Renovation'        },
    { id: 'peb',        icon: '⚙️', label: 'PEB Construction'  },
    { id: 'interior',   icon: '🎨', label: 'Interior Design'   },
    { id: 'landscape',  icon: '🌿', label: 'Landscape'         },
  ];

  const stickyNav = document.createElement('div');
  stickyNav.className = 'srv-sticky-nav';
  const inner = document.createElement('div');
  inner.className = 'srv-sticky-inner container';
  services.forEach(s => {
    const a = document.createElement('a');
    a.href = `#${s.id}`;
    a.className = 'srv-sticky-link';
    a.setAttribute('data-target', s.id);
    a.innerHTML = `<span class="snav-icon">${s.icon}</span>${s.label}`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(s.id);
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
    inner.appendChild(a);
  });
  stickyNav.appendChild(inner);
  document.body.insertBefore(stickyNav, document.body.firstChild.nextSibling);

  // ─── STICKY NAV VISIBILITY + ACTIVE SECTION ───
  const stickyLinks = stickyNav.querySelectorAll('.srv-sticky-link');
  const sectionEls  = services.map(s => document.getElementById(s.id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Show sticky nav after hero
    const hero = document.querySelector('.srv-hero');
    if (hero) {
      stickyNav.classList.toggle('visible', scrollY > hero.offsetHeight - 100);
    }

    // Highlight active section
    let currentSection = '';
    sectionEls.forEach(sec => {
      const top = sec.getBoundingClientRect().top + scrollY - 200;
      if (scrollY >= top) currentSection = sec.id;
    });
    stickyLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-target') === currentSection);
    });
  }, { passive: true });

  // ─── SMOOTH SCROLL FOR PILL LINKS ───
  document.querySelectorAll('.srv-pill, .ov-card').forEach(el => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 130;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    });
  });

  // ─── OVERVIEW CARD STAGGER ───
  const ovCards = document.querySelectorAll('.ov-card');
  const ovObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(ovCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 80);
        ovObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  ovCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-color 0.3s';
    ovObserver.observe(card);
  });

  // ─── PROCESS STEP HOVER GLOW ───
  document.querySelectorAll('.pf-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.querySelector('.pf-icon').style.boxShadow = '0 0 24px rgba(201,168,76,0.4)';
    });
    step.addEventListener('mouseleave', () => {
      step.querySelector('.pf-icon').style.boxShadow = '';
    });
  });

  // ─── INTERIOR THEME SWITCHER ───
  const themeCards = document.querySelectorAll('.theme-card');
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      themeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      // Could swap image here if multiple interior images exist
    });
  });

  // ─── PEB ADVANTAGE CARDS STAGGER ───
  const pebAdvs = document.querySelectorAll('.peb-adv');
  const pebObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(pebAdvs).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        pebObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  pebAdvs.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s';
    pebObserver.observe(el);
  });

  // ─── PRICE CARD STAGGER ───
  const priceCards = document.querySelectorAll('.price-card');
  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(priceCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = entry.target.classList.contains('featured-price')
            ? 'scale(1.03) translateY(0)'
            : 'translateY(0)';
        }, idx * 120);
        priceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  priceCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = card.classList.contains('featured-price')
      ? 'scale(1.03) translateY(20px)'
      : 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s';
    priceObserver.observe(card);
  });

  // ─── SERVICE DETAIL SECTIONS — ENTRANCE ANIMATION ───
  const detailSections = document.querySelectorAll('.srv-detail');
  const detailObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-entered');
        detailObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  detailSections.forEach(sec => detailObserver.observe(sec));

  // ─── WHY CARDS STAGGER ───
  const swCards = document.querySelectorAll('.sw-card');
  const swObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(swCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 90);
        swObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  swCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.3s, border-color 0.3s';
    swObserver.observe(card);
  });

  // ─── LANDSCAPE FEATURE STAGGER ───
  const lfItems = document.querySelectorAll('.lf-item');
  const lfObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(lfItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 60);
        lfObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  lfItems.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px) scale(0.95)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s, box-shadow 0.3s, color 0.3s';
    lfObserver.observe(el);
  });

  // ─── PROCESS STEP STAGGER ───
  const pfSteps = document.querySelectorAll('.pf-step');
  const pfObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(pfSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        pfObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  pfSteps.forEach(step => {
    step.style.opacity   = '0';
    step.style.transform = 'translateY(24px)';
    step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    pfObserver.observe(step);
  });

  // ─── HERO PARALLAX ───
  const heroBgImg = document.querySelector('.srv-hero-bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }

  // ─── SPEC ITEMS HOVER PULSE ───
  document.querySelectorAll('.spec-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.spec-val').style.color = 'var(--gold)';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.spec-val').style.color = '';
    });
  });

});
