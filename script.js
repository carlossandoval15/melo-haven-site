/* ============================================
   MELO HAVEN — Landing Page JS
   GHL Integration via Private API
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

// GHL API config
const GHL_API_KEY = 'pit-d9542f11-fe00-4d1e-a122-541bfa89dd67';
const GHL_LOCATION_ID = 'hZDOorbVEd1Zdnb42LnG';
const GHL_API_URL = 'https://services.leadconnectorhq.com/contacts/';

// Submit form to GHL as a new contact
async function submitToGHL(e) {
  e.preventDefault();
  const form = document.getElementById('lead-form');
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Honeypot check
  const honey = form.querySelector('input[name="_honey"]');
  if (honey && honey.value) return false;

  const name = form.querySelector('#name').value.trim();
  const phone = form.querySelector('#phone').value.replace(/\D/g, '');
  const email = form.querySelector('#email').value.trim();
  const propertyType = form.querySelector('#property-type').value;
  const address = form.querySelector('#address').value.trim();
  const situation = form.querySelector('#situation').value.trim();
  const smsConsent = form.querySelector('#sms-consent')?.checked || false;

  // Split name
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactData = {
    locationId: GHL_LOCATION_ID,
    firstName: firstName,
    lastName: lastName,
    phone: '+1' + phone,
    email: email || undefined,
    source: 'Website - melohavensolutions.com',
    tags: ['website-lead', propertyType.toLowerCase().replace(/\s+/g, '-')],
    customFields: [
      { key: 'property_type', field_value: propertyType },
      { key: 'property_address', field_value: address },
      { key: 'situation', field_value: situation },
      { key: 'sms_consent', field_value: smsConsent ? 'Yes' : 'No' }
    ]
  };

  // Remove undefined email
  if (!email) delete contactData.email;

  try {
    const response = await fetch(GHL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + GHL_API_KEY,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactData)
    });

    if (response.ok || response.status === 200 || response.status === 201) {
      window.location.href = 'thank-you.html';
    } else {
      // Fallback: still redirect so lead isn't lost, email notification via GHL
      console.error('GHL API error:', response.status);
      window.location.href = 'thank-you.html';
    }
  } catch (err) {
    console.error('Network error:', err);
    // Still redirect - don't lose the lead experience
    window.location.href = 'thank-you.html';
  }

  return false;
}
