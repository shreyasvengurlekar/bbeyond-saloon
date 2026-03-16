import {
  WHATSAPP_NUMBER,
  NOTIFICATION_EMAIL,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '../data/firebase.config.js';
import { showToast } from '../utils/toast.js';
import { getEl }     from '../utils/dom.js';

export function initBooking(db) {
  // Set minimum selectable date to today
  const dateInput = getEl('f-date');
  if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);

  // Pre-fill service dropdown and scroll to booking form
  window.bookService = function (service) {
    const select = getEl('f-service');
    if (select) select.value = service;
    getEl('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit booking → Firebase + EmailJS + WhatsApp
  window.submitBooking = async function () {
    const name    = getEl('f-name')?.value.trim()  ?? '';
    const phone   = getEl('f-phone')?.value.trim() ?? '';
    const service = getEl('f-service')?.value      ?? '';
    const date    = getEl('f-date')?.value         ?? '';
    const time    = getEl('f-time')?.value         ?? '';
    const note    = getEl('f-note')?.value.trim()  ?? '';

    if (!name || !phone || !service || !date || !time) {
      alert('Please fill all required fields (Name, Phone, Service, Date & Time).');
      return;
    }

    const booking = {
      name, phone, service, date, time,
      note:      note || 'None',
      bookedAt:  new Date().toLocaleString('en-IN'),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      // 1 — Save to Firestore
      await db.collection('bookings').add(booking);

      // 2 — Email via EmailJS
      if (EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: NOTIFICATION_EMAIL,
          from_name: name, phone, service, date, time,
          note: note || 'None',
          reply_to: 'noreply@bbeyond.com',
        });
      }

      // 3 — Open WhatsApp
      const msg =
        `🌟 *New Appointment Request*\n\n` +
        `👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💇 *Service:* ${service}\n` +
        `📅 *Date:* ${date}\n🕐 *Time:* ${time}\n📝 *Note:* ${note || 'None'}\n\n` +
        `_Sent via B Beyond Salon Website_`;
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
        '_blank', 'noopener,noreferrer'
      );

      // 4 — Reset form
      ['f-name', 'f-phone', 'f-note'].forEach((id) => { const el = getEl(id); if (el) el.value = ''; });
      ['f-service', 'f-time'].forEach((id)         => { const el = getEl(id); if (el) el.value = ''; });
      if (dateInput) dateInput.value = '';

      showToast('✅ Booking sent! Check WhatsApp for confirmation.');

    } catch (err) {
      console.error('[Booking error]', err);
      alert('Something went wrong. Please try again or call us directly.');
    }
  };
}
