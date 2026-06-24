// ═══════════════════════════════════════════════════════════
//  IKON CONSTRUCTIONS — completed.js
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

  // ─── HERO STATS COUNTERS ───
  const cpStats = document.querySelectorAll('.cp-stat-num[data-target]');
  let heroCountersDone = false;
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !heroCountersDone) {
        heroCountersDone = true;
        cpStats.forEach(el => animateNum(el, parseInt(el.dataset.target)));
        heroObs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const heroStats = document.querySelector('.cp-hero-stats');
  if (heroStats) heroObs.observe(heroStats);

  // ─── ACHIEVEMENT COUNTERS ───
  const achCounters = document.querySelectorAll('.ach-counter');
  const achObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNum(entry.target, parseInt(entry.target.dataset.target));
        achObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  achCounters.forEach(el => achObs.observe(el));

  function animateNum(el, target) {
    let cur = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { el.textContent = target; clearInterval(timer); }
      else { el.textContent = cur; }
    }, 50);
  }

  // ─── FILTER ───
  const filterBtns = document.querySelectorAll('.cp-filter-btn');
  const cards      = document.querySelectorAll('.cp-card');
  const countEl    = document.getElementById('cpCount');
  const noResults  = document.getElementById('cpNoResults');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      let visible  = 0;
      cards.forEach((card, i) => {
        const cat  = card.getAttribute('data-cat');
        const show = filter === 'all' || cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          visible++;
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity .4s ease, transform .4s ease, box-shadow .35s, border-top-color .3s';
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
    card.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .35s, border-top-color .3s';
    setTimeout(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + i * 110);
  });

  // ─── ACHIEVEMENT CARDS STAGGER ───
  const achCards = document.querySelectorAll('.cp-ach-card');
  const achCardObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(achCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 90);
        achCardObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  achCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px) scale(0.97)';
    card.style.transition = 'opacity .55s ease, transform .55s ease, box-shadow .3s, border-bottom-color .3s';
    achCardObs.observe(card);
  });

  // ─── TESTIMONIAL SLIDER ───
  const track    = document.getElementById('cpTslTrack');
  const dotsWrap = document.getElementById('cpTslDots');
  if (track && dotsWrap) {
    const tslCards = track.querySelectorAll('.cp-tsl-card');
    const total    = tslCards.length;
    let current    = 0;
    let autoplay;

    function getVisible() {
      if (window.innerWidth < 768)  return 1;
      if (window.innerWidth < 1100) return 2;
      return 4;
    }

    function getCardW() {
      return tslCards[0] ? tslCards[0].getBoundingClientRect().width + 24 : 0;
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      const pages = total - getVisible() + 1;
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('div');
        dot.className = 'cp-tsl-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function goTo(idx) {
      const max = total - getVisible();
      current   = Math.max(0, Math.min(idx, max));
      track.style.transform = `translateX(-${current * getCardW()}px)`;
      dotsWrap.querySelectorAll('.cp-tsl-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current >= total - getVisible() ? 0 : current + 1); }
    function prev() { goTo(current <= 0 ? total - getVisible() : current - 1); }

    function startAuto() { clearInterval(autoplay); autoplay = setInterval(next, 4000); }

    // touch
    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive:true });
    track.addEventListener('touchend',   e => {
      const diff = tx - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
    });

    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', () => { buildDots(); goTo(0); });

    buildDots();
    goTo(0);
    startAuto();
  }

  // ─── HERO PARALLAX ───
  const heroBgImg = document.querySelector('.cp-hero-bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBgImg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
      }
    }, { passive: true });
  }

  // ─── FILTER BAR TOP OFFSET ───
  const filterBar = document.querySelector('.cp-filter-bar');
  const header    = document.getElementById('header');
  if (filterBar && header) filterBar.style.top = header.offsetHeight + 'px';

  // ─── CARD TESTIMONIAL REVEAL ───
  const testimonials = document.querySelectorAll('.cp-testimonial');
  const tObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        tObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  testimonials.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity .5s ease .2s, transform .5s ease .2s';
    tObs.observe(el);
  });

});