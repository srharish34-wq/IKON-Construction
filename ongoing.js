// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — ongoing.js
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

  // ─── FLOATING ENQUIRY ───
  const floatingBtn = document.getElementById('floatingEnquiry');
  window.addEventListener('scroll', () => {
    floatingBtn && floatingBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

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

  // ─── FILTER ───
  const filterBtns  = document.querySelectorAll('.og-filter-btn');
  const cards       = document.querySelectorAll('.og-card');
  const countEl     = document.getElementById('visibleCount');
  const noResults   = document.getElementById('ogNoResults');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visible = 0;

      cards.forEach((card, i) => {
        const cat  = card.getAttribute('data-cat');
        const show = filter === 'all' || cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          visible++;
          // stagger re-entrance
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease, box-shadow .3s';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, i * 80);
        }
      });

      if (countEl) countEl.textContent = visible;
      if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    });
  });

  // ─── CARD STAGGER ON LOAD ───
  cards.forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .35s';
    setTimeout(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });

  // ─── PROGRESS BARS ANIMATE ON SCROLL ───
  const progBars = document.querySelectorAll('.og-progress-bar, .opt-bar');
  const progObs  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        progObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  progBars.forEach(bar => {
    bar.style.animationPlayState = 'paused';
    // also pause the ::after pseudo via class trick
    bar.classList.add('paused');
    progObs.observe(bar);
  });

  // ─── TABLE ROWS STAGGER ───
  const tableRows = document.querySelectorAll('.opt-row');
  const tableObs  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(tableRows).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 100);
        tableObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  tableRows.forEach(row => {
    row.style.opacity   = '0';
    row.style.transform = 'translateX(-20px)';
    row.style.transition = 'opacity .5s ease, transform .5s ease, background .3s';
    tableObs.observe(row);
  });

  // ─── PROCESS STEPS STAGGER ───
  const procSteps = document.querySelectorAll('.og-proc-step');
  const procObs   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(procSteps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        procObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  procSteps.forEach(step => {
    step.style.opacity   = '0';
    step.style.transform = 'translateY(28px)';
    step.style.transition = 'opacity .55s ease, transform .55s ease, box-shadow .3s, border-bottom-color .3s';
    procObs.observe(step);
  });

  // ─── HERO STATS COUNTER ───
  const ogStats = document.querySelectorAll('.og-stat-num');
  let statsAnimated = false;
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        ogStats.forEach(el => {
          const raw    = el.textContent;
          const num    = parseInt(raw.replace(/[^0-9]/g, ''));
          const suffix = raw.replace(/[0-9]/g, '').replace(/,/g,'');
          if (!num || num > 99999) return;
          let cur = 0;
          const step = Math.ceil(num / 25);
          const timer = setInterval(() => {
            cur += step;
            if (cur >= num) {
              el.textContent = num.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              el.textContent = cur.toLocaleString() + suffix;
            }
          }, 50);
        });
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const heroStats = document.querySelector('.og-hero-stats');
  if (heroStats) statsObs.observe(heroStats);

  // ─── HERO PARALLAX ───
  const heroBgImg = document.querySelector('.og-hero-bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }

  // ─── CARD HOVER — highlight progress bar ───
  cards.forEach(card => {
    const bar = card.querySelector('.og-progress-bar');
    card.addEventListener('mouseenter', () => {
      if (bar) bar.style.transform = 'scaleY(1.5)';
    });
    card.addEventListener('mouseleave', () => {
      if (bar) bar.style.transform = '';
    });
  });

  // ─── STICKY FILTER BAR TOP OFFSET ───
  // Adjust if header height changes
  const filterBar = document.querySelector('.og-filter-bar');
  const header    = document.getElementById('header');
  if (filterBar && header) {
    filterBar.style.top = header.offsetHeight + 'px';
  }

});