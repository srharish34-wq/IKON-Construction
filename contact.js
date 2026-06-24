// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — contact.js
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ─── HAMBURGER ───
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
  const floatingBtn = document.getElementById('floatingEnquiry');
  window.addEventListener('scroll', () => {
    floatingBtn && floatingBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

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
  const heroBg = document.querySelector('.con-hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }

  // ─── SMOOTH SCROLL for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ─── INFO CARDS STAGGER ───
  const infoCards = document.querySelectorAll('.con-info-card');
  const infoObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(infoCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 90);
        infoObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  infoCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s, border-color .3s';
    infoObs.observe(card);
  });

  // ─── FORM HIGHLIGHTS STAGGER ───
  const fhls = document.querySelectorAll('.con-fhl');
  const fhlObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(fhls).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 90);
        fhlObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fhls.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .3s';
    fhlObs.observe(el);
  });

  // ─── REACH ITEMS STAGGER ───
  const reachItems = document.querySelectorAll('.con-reach-item');
  const reachObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(reachItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        reachObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reachItems.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateX(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    reachObs.observe(el);
  });

  // ─── VISIT STEPS STAGGER ───
  const visitSteps = document.querySelectorAll('.con-visit-step');
  const vsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(visitSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 120);
        vsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  visitSteps.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateX(-24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    vsObs.observe(el);
  });

  // ─── MAP PIN ANIMATION ───
  const mapInner = document.querySelector('.con-map-inner');
  if (mapInner) {
    const mapObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // trigger all ring animations
          document.querySelectorAll('.con-pin-ring').forEach(ring => {
            ring.style.animationPlayState = 'running';
          });
          mapObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    mapObs.observe(mapInner);
    // pause initially
    document.querySelectorAll('.con-pin-ring').forEach(ring => {
      ring.style.animationPlayState = 'paused';
    });
  }

  // ─── COPY ADDRESS ───
  const addrLink = document.querySelector('.con-addr-link');
  if (addrLink) {
    addrLink.addEventListener('click', e => {
      e.preventDefault();
      const address = 'Near SRM Public School, Guduvancheri, Chennai, Tamil Nadu - 603202';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(() => {
          const original = addrLink.textContent;
          addrLink.textContent = '✓ Copied!';
          addrLink.style.color = '#16a34a';
          setTimeout(() => {
            addrLink.textContent = original;
            addrLink.style.color = '';
          }, 2000);
        });
      }
    });
  }

  // ─── INTEREST OPTION STYLES ───
  document.querySelectorAll('.con-int-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.con-int-opt').forEach(o => {
        o.style.borderColor = '';
        o.style.background  = '';
        o.style.color       = '';
      });
    });
  });

  // ─── PREFERRED CONTACT TOGGLE ───
  document.querySelectorAll('.con-pref-opt').forEach(opt => {
    const inp = opt.querySelector('input');
    opt.addEventListener('click', () => {
      setTimeout(() => {
        if (inp.checked) {
          opt.style.borderColor = 'var(--navy)';
          opt.style.background  = 'var(--white)';
          opt.style.color       = 'var(--navy)';
        } else {
          opt.style.borderColor = '';
          opt.style.background  = '';
          opt.style.color       = '';
        }
      }, 0);
    });
  });

  // ─── FAQ ACCORDION ───
  const faqBtns = document.querySelectorAll('.con-faq-q');
  faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      // Close all
      faqBtns.forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });
      // Open clicked
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ─── MAIN FORM SUBMIT ───
  const conSubmit  = document.getElementById('conSubmit');
  const conForm    = document.getElementById('conForm');
  const conSuccess = document.getElementById('conSuccess');

  if (conSubmit) {
    conSubmit.addEventListener('click', () => {
      const name    = document.getElementById('con-name')?.value.trim();
      const phone   = document.getElementById('con-phone')?.value.trim();
      const message = document.getElementById('con-message')?.value.trim();
      const interest = document.querySelector('input[name="interest"]:checked');

      if (!name)  { showConErr('con-name', 'Please enter your full name'); return; }
      if (!phone || phone.length < 10) { showConErr('con-phone', 'Enter a valid phone number'); return; }
      if (!interest) {
        // highlight interest grid
        const grid = document.querySelector('.con-interest-grid');
        if (grid) {
          grid.style.outline = '2px solid #e53e3e';
          grid.style.borderRadius = '8px';
          setTimeout(() => { grid.style.outline = ''; }, 2500);
        }
        return;
      }
      if (!message || message.length < 10) { showConErr('con-message', 'Please tell us a bit about your project'); return; }

      // submit animation
      conSubmit.textContent = '⏳ Sending your enquiry...';
      conSubmit.disabled    = true;
      conSubmit.style.opacity = '0.7';

      setTimeout(() => {
        if (conForm)    conForm.style.display    = 'none';
        if (conSuccess) conSuccess.style.display = 'block';

        // scroll to success
        const formCard = document.querySelector('.con-form-card');
        if (formCard) {
          const offset = formCard.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }, 1500);
    });
  }

  function showConErr(fieldId, msg) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#e53e3e';
    field.focus();
    const existing = field.parentElement.querySelector('.con-field-err');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'con-field-err';
    err.style.cssText = 'font-size:11px;color:#e53e3e;margin-top:4px;font-weight:600;';
    err.textContent = msg;
    field.parentElement.appendChild(err);
    setTimeout(() => {
      field.style.borderColor = '';
      err.remove();
    }, 2800);
  }

  // ─── PILL HOVER effect ───
  document.querySelectorAll('.con-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'translateY(-2px) scale(1.02)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });

  // ─── FORM FIELD FOCUS ANIMATIONS ───
  document.querySelectorAll('.con-fgroup input, .con-fgroup select, .con-fgroup textarea').forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.querySelector('label') &&
      (field.parentElement.querySelector('label').style.color = 'var(--gold)');
    });
    field.addEventListener('blur', () => {
      field.parentElement.querySelector('label') &&
      (field.parentElement.querySelector('label').style.color = '');
    });
  });

  // ─── AUTO-CHECK INTEREST from URL hash ───
  // e.g. contact.html#silver-heights auto-selects that option
  const hash = window.location.hash.replace('#', '');
  if (hash && hash !== 'enquiry') {
    const matchingOpt = document.querySelector(`input[name="interest"][value="${hash}"]`);
    if (matchingOpt) {
      matchingOpt.checked = true;
      matchingOpt.closest('.con-int-opt').style.borderColor = 'var(--navy)';
      matchingOpt.closest('.con-int-opt').style.background  = 'var(--navy)';
      matchingOpt.closest('.con-int-opt').style.color       = 'var(--white)';
    }
  }

  // ─── WhatsApp floating pulse ───
  const waPill = document.querySelector('.wa-pill');
  if (waPill) {
    setInterval(() => {
      waPill.style.boxShadow = '0 0 0 6px rgba(37,211,102,.2)';
      setTimeout(() => { waPill.style.boxShadow = ''; }, 600);
    }, 3000);
  }

});
