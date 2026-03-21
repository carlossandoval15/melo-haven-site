/* ============================================
   MELO HAVEN — Landing Page JS
   ============================================ */

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    if (val.length >= 7) {
      val = `(${val.slice(0,3)}) ${val.slice(3,6)}-${val.slice(6)}`;
    } else if (val.length >= 4) {
      val = `(${val.slice(0,3)}) ${val.slice(3)}`;
    } else if (val.length >= 1) {
      val = `(${val}`;
    }
    e.target.value = val;
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form submission feedback
const form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', function() {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
  });
}
