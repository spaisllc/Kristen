/* ============================================================================
   Oakley — UI interactions (toast, count-ups, reveals, bark translator,
   mock shop, treat fund). The snow/pawprint canvas lives in oakley-snow.js.
   ============================================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Toast ---- */
  var toast = document.getElementById('toast'), toastT;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }

  /* ---- Nav condensation ---- */
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- Count-up stats ---- */
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var div = parseFloat(el.getAttribute('data-div') || '1');
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    function fmt(v) {
      var n = v / div;
      return (dec ? n.toFixed(dec) : Math.round(n).toLocaleString()) + suffix;
    }
    if (reduce) { el.textContent = fmt(target); return; }
    var start = null, dur = 1300;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }

  /* ---- Reveals + one-shot count trigger ---- */
  var counted = false;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.classList.contains('hero') && !counted) {
          counted = true;
          document.querySelectorAll('.hero-stats b[data-count]').forEach(runCount);
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('.reveal, .hero').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('.hero-stats b[data-count]').forEach(runCount);
  }

  /* ---- Bark translator (shuffle bag, no repeats until exhausted) ---- */
  var barks = [
    ['I have not been fed in—', 'checks watch — twenty minutes. This is neglect.'],
    ['I did NOT do it.', 'But if I did, I would absolutely do it again.'],
    ["That's my chair now.", "I've claimed it. In front of witnesses."],
    ["You said the word 'walk'.", 'We are now legally bound to go on a walk.'],
    ['AWOOOOO.', 'No reason. I just felt it deep in my soul.'],
    ['The vacuum has returned.', 'I will be narrating my feelings for the next 45 minutes.'],
    ['I love you very much.', 'I would also like the entire sandwich.'],
    ["I'm not stubborn.", "I have a five-year plan and 'sit' is not in it."],
    ['I heard a treat bag open.', 'Three counties over. I am on my way.'],
    ['New house rule:', 'the bed is mine. You may apply for weekend access.']
  ];
  var bag = [];
  function refill() { bag = barks.map(function (_, i) { return i; }); }
  refill();
  var barkText = document.getElementById('barkText');
  var barkBtn = document.getElementById('barkBtn');
  var prevIdx = -1;
  barkBtn.addEventListener('click', function () {
    if (bag.length === 0) refill();
    var pos = Math.floor(Math.random() * bag.length);
    var idx = bag[pos];
    if (idx === prevIdx && bag.length > 1) { pos = (pos + 1) % bag.length; idx = bag[pos]; }
    bag.splice(pos, 1); prevIdx = idx;
    var line = barks[idx];
    if (reduce) {
      barkText.textContent = line[0] + ' ' + line[1];
    } else {
      barkText.style.opacity = '0';
      setTimeout(function () {
        barkText.textContent = line[0] + ' ' + line[1];
        barkText.style.opacity = '1';
      }, 220);
    }
    barkBtn.textContent = '🎙️ Again';
  });

  /* ---- Merch add-to-bag (mock) ---- */
  document.querySelectorAll('.bag-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('added')) return;
      var orig = btn.textContent;
      btn.classList.add('added');
      btn.textContent = 'Added ✓';
      showToast('Added to the (imaginary) bag 🛍️');
      setTimeout(function () { btn.classList.remove('added'); btn.textContent = orig; }, 1600);
    });
  });

  /* ---- Treat fund (mock) ---- */
  document.querySelectorAll('.tier').forEach(function (tier) {
    tier.addEventListener('click', function () {
      showToast('Oakley thanks you for ' + tier.getAttribute('data-treat') + '! 🐾 (concept only — no charge)');
    });
  });

  /* ---- Social placeholders ---- */
  document.querySelectorAll('.social-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (card.getAttribute('href') === '#') {
        e.preventDefault();
        showToast(card.getAttribute('data-social') + ' links go here when the handles are live 🐺');
      }
    });
  });
})();
