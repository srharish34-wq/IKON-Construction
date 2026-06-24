// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — silver-heights.js  (FIXED)
//  Silver Heights project page scripts
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── HAMBURGER ───
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const bars = hamburger.querySelectorAll('span');
      const open = nav.classList.contains('open');
      bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
      bars[1].style.opacity   = open ? '0' : '';
      bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
    });
  }

  // ─── FLOATING BUTTON ───
  const floatingBtn = document.getElementById('floatingEnquiry');
  window.addEventListener('scroll', () => {
    floatingBtn && floatingBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('.sh-scroll-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    });
  });

  // ─── SCROLL REVEAL ───
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObs.observe(el));

  // ─── UNIT TYPE TABS (2BHK / 3BHK / 4BHK) ───
  const unitTabs   = document.querySelectorAll('.unit-tab');
  const unitPanels = document.querySelectorAll('.unit-panel');

  unitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-unit');
      unitTabs.forEach(t => t.classList.remove('active'));
      unitPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
        panel.querySelectorAll('.rr-fill').forEach(bar => {
          bar.style.animation = 'none';
          bar.offsetHeight; // reflow
          bar.style.animation = '';
        });
      }
    });
  });

  // ─── UNIT IMAGE THUMBNAILS ───
  function setupThumbs(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const thumbs  = panel.querySelectorAll('.uth-item');
    const mainImg = panel.querySelector('.unit-img-display img');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.getAttribute('data-src');
        if (mainImg && src) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
          }, 200);
        }
      });
    });
  }
  setupThumbs('panel-2bhk');
  setupThumbs('panel-3bhk');
  setupThumbs('panel-4bhk');

  // ─── UNIT IMAGE TAB BUTTONS ───
  function setupImgTabs(panelId) {
    const panel   = document.getElementById(panelId);
    if (!panel) return;
    const imgTabs = panel.querySelectorAll('.unit-img-tab');
    const mainImg = panel.querySelector('.unit-img-display img');
    imgTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        imgTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const imgName = tab.getAttribute('data-img');
        if (mainImg && imgName) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = `images/${imgName}`;
            mainImg.style.opacity = '1';
          }, 200);
        }
      });
    });
  }
  setupImgTabs('panel-2bhk');
  setupImgTabs('panel-3bhk');
  setupImgTabs('panel-4bhk');

  // ─── FLOOR PLAN LAYOUT TABS ───
  const layoutTabs   = document.querySelectorAll('.layout-tab');
  const layoutPanels = document.querySelectorAll('.layout-panel');

  layoutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-layout');
      layoutTabs.forEach(t => t.classList.remove('active'));
      layoutPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`layout-${target}`);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 60);
        });
      }
    });
  });

  // ─── LAYOUT ZOOM ───
  document.querySelectorAll('.layout-zoom-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      if (imgSrc) openLightbox(imgSrc, btn.closest('.layout-panel')?.querySelector('h3')?.textContent || 'Floor Plan');
    });
  });

  // ─── GALLERY FILTER ───
  const gfBtns   = document.querySelectorAll('.gf-btn');
  const galItems = document.querySelectorAll('.gal-item');

  gfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gfBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      galItems.forEach(item => {
        const cat  = item.getAttribute('data-cat');
        const show = filter === 'all' || cat === filter;
        item.classList.toggle('hidden', !show);
        if (show) {
          item.style.opacity   = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'opacity .4s ease, transform .4s ease';
            item.style.opacity    = '1';
            item.style.transform  = 'scale(1)';
          }, 50);
        }
      });
    });
  });

  // ─── LIGHTBOX ───
  const lightbox   = document.getElementById('shLightbox');
  const lbImg      = document.getElementById('lbImg');
  const lbCaption  = document.getElementById('lbCaption');
  const lbClose    = document.getElementById('lbClose');
  const lbPrev     = document.getElementById('lbPrev');
  const lbNext     = document.getElementById('lbNext');
  const lbBackdrop = document.getElementById('lbBackdrop');

  let galleryImages = [];
  let currentLbIdx  = 0;

  function buildGalleryImages() {
    galleryImages = [];
    galItems.forEach(item => {
      if (item.classList.contains('hidden')) return;
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gal-overlay p')?.textContent || '';
      if (img) galleryImages.push({ src: img.src, caption });
    });
  }

  function openLightbox(src, caption = '') {
    if (!lightbox) return;
    lbImg.src             = src;
    lbCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    const idx = galleryImages.findIndex(i => i.src === src || src.includes(i.src.split('/').pop()));
    currentLbIdx = idx >= 0 ? idx : 0;
  }

  function closeLightbox() {
    lightbox && lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lbNavigate(dir) {
    if (!galleryImages.length) return;
    currentLbIdx = (currentLbIdx + dir + galleryImages.length) % galleryImages.length;
    const item = galleryImages[currentLbIdx];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src             = item.src;
      lbCaption.textContent = item.caption;
      lbImg.style.opacity   = '1';
    }, 200);
  }

  galItems.forEach(item => {
    item.addEventListener('click', () => {
      buildGalleryImages();
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gal-overlay p')?.textContent || '';
      if (img) openLightbox(img.src, caption);
    });
  });

  lbClose    && lbClose.addEventListener('click', closeLightbox);
  lbBackdrop && lbBackdrop.addEventListener('click', closeLightbox);
  lbPrev     && lbPrev.addEventListener('click', () => lbNavigate(-1));
  lbNext     && lbNext.addEventListener('click', () => lbNavigate(1));

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbNavigate(-1);
    if (e.key === 'ArrowRight') lbNavigate(1);
  });

  let lbTouchX = 0;
  lbImg && lbImg.addEventListener('touchstart', e => { lbTouchX = e.changedTouches[0].clientX; }, { passive: true });
  lbImg && lbImg.addEventListener('touchend',   e => {
    const diff = lbTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) lbNavigate(diff > 0 ? 1 : -1);
  });

  // ─── AMENITY CARDS STAGGER ───
  const amCards = document.querySelectorAll('.am-card');
  const amObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(amCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 80);
        amObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  amCards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(24px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s, border-color .3s';
    amObs.observe(card);
  });

  // ─── OVERVIEW STATS STAGGER ───
  const ovStats = document.querySelectorAll('.sh-ov-stat');
  const ovObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(ovStats).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 100);
        ovObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  ovStats.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px) scale(0.95)';
    el.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s, border-bottom-color .3s';
    ovObs.observe(el);
  });

  // ─── ROOM BAR ANIMATIONS ───
  const rrFills = document.querySelectorAll('.rr-fill');
  const rrObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        rrObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  rrFills.forEach(el => {
    el.style.animationPlayState = 'paused';
    rrObs.observe(el);
  });

  // ─── INFO STRIP ITEMS ───
  const infoItems = document.querySelectorAll('.sh-info-item');
  const infoObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(infoItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 70);
        infoObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  infoItems.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(12px)';
    el.style.transition = 'opacity .4s ease, transform .4s ease';
    infoObs.observe(el);
  });

  // ─── LOCATION PERKS STAGGER ───
  const locPerks = document.querySelectorAll('.sh-loc-perk');
  const locObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(locPerks).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 90);
        locObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  locPerks.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateX(-20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s';
    locObs.observe(el);
  });

  // ─── HERO PARALLAX ───
  const heroBgImg = document.getElementById('shHeroBg');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ─── GALLERY ITEMS ENTRANCE ───
  const galObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(galItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'scale(1)';
        }, (idx % 4) * 80);
        galObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  galItems.forEach(item => {
    item.style.opacity    = '0';
    item.style.transform  = 'scale(0.95)';
    item.style.transition = 'opacity .5s ease, transform .5s ease';
    galObs.observe(item);
  });

  // ─── ENQUIRY FORM ───
  const submitBtn   = document.getElementById('submitEnquiry');
  const formSuccess = document.getElementById('formSuccess');
  const enquiryForm = document.getElementById('enquiryForm');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = document.getElementById('eq-name')?.value.trim();
      const phone = document.getElementById('eq-phone')?.value.trim();

      if (!name) {
        showFieldError('eq-name', 'Please enter your full name');
        return;
      }
      if (!phone || phone.length < 10) {
        showFieldError('eq-phone', 'Please enter a valid phone number');
        return;
      }

      submitBtn.textContent = '⏳ Sending...';
      submitBtn.disabled    = true;

      setTimeout(() => {
        if (enquiryForm) enquiryForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display  = 'block';
      }, 1200);
    });
  }

  function showFieldError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#e53e3e';
    field.focus();
    setTimeout(() => { field.style.borderColor = ''; }, 2000);
    const existing = field.parentElement.querySelector('.field-err');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className   = 'field-err';
    err.style.cssText = 'font-size:11px;color:#e53e3e;margin-top:4px;';
    err.textContent = msg;
    field.parentElement.appendChild(err);
    setTimeout(() => err.remove(), 2500);
  }

  // ─── INTEREST OPTION STYLING ───
  document.querySelectorAll('.interest-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.interest-opt').forEach(o => {
        o.style.borderColor = '';
        o.style.color       = '';
        o.style.background  = '';
      });
      opt.style.borderColor = 'var(--navy)';
      opt.style.color       = 'var(--navy)';
      opt.style.background  = 'var(--off-white)';
    });
  });

  // ─── UNIT PRICE FADE IN ───
  const unitPrices = document.querySelectorAll('.unit-price');
  const priceObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        priceObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  unitPrices.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(10px)';
    el.style.transition = 'opacity .6s ease .2s, transform .6s ease .2s';
    priceObs.observe(el);
  });

  // ─── MOBILE: collapse nav on link click ───
  document.querySelectorAll('.nav .nav-link, .nav .btn-enquiry').forEach(link => {
    link.addEventListener('click', () => {
      nav && nav.classList.remove('open');
    });
  });

  // ─── HERO HIGHLIGHT COUNTER ───
  const hlNums = document.querySelectorAll('.sh-hl-num');
  hlNums.forEach(el => {
    const txt = el.textContent.replace(/[^0-9]/g, '');
    if (!txt) return;
    const target = parseInt(txt);
    if (isNaN(target) || target > 100) return;
    const suffix = el.textContent.replace(txt, '');
    let cur      = 0;
    const step   = Math.ceil(target / 20);
    const timer  = setInterval(() => {
      cur += step;
      if (cur >= target) { el.textContent = target + suffix; clearInterval(timer); }
      else               { el.textContent = cur + suffix; }
    }, 60);
  });

});