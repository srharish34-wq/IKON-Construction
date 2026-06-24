// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — careers.js
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
    floatingBtn && floatingBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('.car-scroll').forEach(link => {
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
  const revealEls = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObs.observe(el));

  // ─── HERO PARALLAX ───
  const heroBgImg = document.querySelector('.car-hero-bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }

  // ─── DEPARTMENT FILTER ───
  const deptBtns = document.querySelectorAll('.car-dept-btn');
  const jobCards = document.querySelectorAll('.car-job-card');
  const noResults = document.getElementById('carNoResults');

  deptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deptBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const dept = btn.getAttribute('data-dept');
      let visible = 0;

      jobCards.forEach((card, i) => {
        const cardDept = card.getAttribute('data-dept');
        const show = dept === 'all' || cardDept === dept;
        card.classList.toggle('hidden', !show);
        if (show) {
          visible++;
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease, box-shadow .3s, border-color .3s';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, i * 70);
        }
      });

      if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  // ─── JOB CARDS STAGGER ON LOAD ───
  jobCards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s, border-color .3s';
    setTimeout(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + i * 90);
  });

  // ─── WHY CARDS STAGGER ───
  const whyCards = document.querySelectorAll('.car-why-card');
  const whyObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(whyCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 80);
        whyObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  whyCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s, border-color .3s';
    whyObs.observe(card);
  });

  // ─── PERKS STAGGER ───
  const perkItems = document.querySelectorAll('.car-perk-item');
  const perkObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(perkItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 70);
        perkObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  perkItems.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s, border-bottom-color .3s';
    perkObs.observe(el);
  });

  // ─── PROCESS STEPS STAGGER ───
  const procSteps = document.querySelectorAll('.car-proc-step');
  const procObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(procSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 110);
        procObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  procSteps.forEach(step => {
    step.style.opacity   = '0';
    step.style.transform = 'translateY(24px)';
    step.style.transition = 'opacity .6s ease, transform .6s ease';
    procObs.observe(step);
  });

  // ─── EMPLOYEE CARDS STAGGER ───
  const empCards = document.querySelectorAll('.car-emp-card');
  const empObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(empCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 120);
        empObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  empCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity .55s ease, transform .55s ease, box-shadow .3s';
    empObs.observe(card);
  });

  // ─── CULTURE VALUES STAGGER ───
  const cvItems = document.querySelectorAll('.car-cv-item');
  const cvObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cvItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        cvObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cvItems.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease, background .3s';
    cvObs.observe(el);
  });

  // ─── FILE UPLOAD ───
  const fileUpload = document.getElementById('carFileUpload');
  const fileInput  = document.getElementById('car-resume');
  const fileName   = document.getElementById('carFileName');

  if (fileUpload && fileInput) {
    fileUpload.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file && fileName) {
        fileName.textContent = `✅ ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
      }
    });

    // drag & drop
    fileUpload.addEventListener('dragover', e => {
      e.preventDefault();
      fileUpload.style.borderColor = 'var(--navy)';
      fileUpload.style.background  = 'var(--white)';
    });
    fileUpload.addEventListener('dragleave', () => {
      fileUpload.style.borderColor = '';
      fileUpload.style.background  = '';
    });
    fileUpload.addEventListener('drop', e => {
      e.preventDefault();
      fileUpload.style.borderColor = '';
      fileUpload.style.background  = '';
      const file = e.dataTransfer.files[0];
      if (file && fileName) {
        fileName.textContent = `✅ ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
      }
    });
  }

  // ─── FORM SUBMIT ───
  const submitBtn = document.getElementById('carSubmit');
  const carForm   = document.getElementById('carForm');
  const carSuccess = document.getElementById('carSuccess');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = document.getElementById('car-name')?.value.trim();
      const phone = document.getElementById('car-phone')?.value.trim();
      const email = document.getElementById('car-email')?.value.trim();
      const role  = document.getElementById('car-role')?.value;
      const why   = document.getElementById('car-why')?.value.trim();

      // validate
      if (!name)  { showErr('car-name',  'Please enter your full name'); return; }
      if (!phone || phone.length < 10) { showErr('car-phone', 'Enter a valid phone number'); return; }
      if (!email || !email.includes('@')) { showErr('car-email', 'Enter a valid email address'); return; }
      if (!role)  { showErr('car-role',  'Please select a position'); return; }
      if (!why || why.length < 20) { showErr('car-why', 'Tell us a bit more about yourself (min 20 chars)'); return; }

      // submit
      submitBtn.textContent = '⏳ Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        if (carForm)    carForm.style.display    = 'none';
        if (carSuccess) carSuccess.style.display = 'block';
      }, 1400);
    });
  }

  function showErr(fieldId, msg) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#e53e3e';
    field.focus();
    // remove existing error
    const existing = field.parentElement.querySelector('.car-field-err');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'car-field-err';
    err.style.cssText = 'font-size:11px;color:#e53e3e;margin-top:4px;font-weight:600;';
    err.textContent = msg;
    field.parentElement.appendChild(err);
    setTimeout(() => {
      field.style.borderColor = '';
      err.remove();
    }, 2800);
  }

  // ─── APPLY NOW LINKS — Pre-select role in form ───
  document.querySelectorAll('.car-apply-btn[href="#apply-form"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card   = btn.closest('.car-job-card');
      const title  = card?.querySelector('.car-job-title')?.textContent;
      const select = document.getElementById('car-role');
      if (title && select) {
        // Find matching option
        Array.from(select.options).forEach(opt => {
          if (opt.text.includes(title.split(' ').slice(0,2).join(' '))) {
            select.value = opt.value;
          }
        });
      }
    });
  });

  // ─── STICKY HEADER ACTIVE ───
  const header = document.getElementById('header');
  if (header) {
    const filterBar = document.querySelector('.car-dept-filter');
    // no sticky bar on careers, just header
  }

  // ─── CHIP HOVER ripple ───
  document.querySelectorAll('.car-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'translateY(-2px)';
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = '';
    });
  });

  // ─── JOB CARD — highlight on apply hover ───
  jobCards.forEach(card => {
    const applyBtn = card.querySelector('.car-apply-btn');
    card.addEventListener('mouseenter', () => {
      if (applyBtn) applyBtn.style.background = 'var(--gold)';
      if (applyBtn) applyBtn.style.color = 'var(--navy)';
    });
    card.addEventListener('mouseleave', () => {
      if (applyBtn) applyBtn.style.background = '';
      if (applyBtn) applyBtn.style.color = '';
    });
  });

});