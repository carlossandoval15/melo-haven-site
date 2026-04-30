/* ============================================
   MELO HAVEN — Landing Page JS
   ============================================ */

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

// Form submission — sends lead to email via Web3Forms
async function submitLead(e) {
  e.preventDefault();
  const form = document.getElementById('lead-form');
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Honeypot check
  const honey = form.querySelector('input[name="_honey"]');
  if (honey && honey.value) return false;

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const type    = form.querySelector('#property-type').value;
  const address = form.querySelector('#address').value.trim();
  const situation = form.querySelector('#situation').value.trim();

  const payload = {
    access_key: 'a84914ee-0f40-46de-9b9e-d0cbe667a05e',
    subject: 'New Lead — Melo Haven Website',
    from_name: 'Melo Haven Website',
    name,
    email: email || 'Not provided',
    property_type: type,
    property_address: address,
    situation: situation || 'Not provided'
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = 'thank-you.html';
    } else {
      console.error('Submission error:', data);
      window.location.href = 'thank-you.html';
    }
  } catch (err) {
    console.error('Network error:', err);
    window.location.href = 'thank-you.html';
  }

  return false;
}
