import { showToast } from '../utils/toast.js';
import { getEl }     from '../utils/dom.js';

export function initAdmin(db, auth) {

  // Open login modal
  window.openAdminLogin = function () {
    getEl('login-modal')?.classList.add('active');
    setTimeout(() => getEl('admin-email')?.focus(), 100);
  };

  // Login
  window.adminLogin = async function () {
    const email    = getEl('admin-email')?.value.trim() ?? '';
    const password = getEl('admin-password')?.value     ?? '';
    const btn      = getEl('login-btn');
    const errEl    = getEl('login-error');

    if (!email || !password) {
      if (errEl) { errEl.textContent = '❌ Please enter email and password.'; errEl.style.display = 'block'; }
      return;
    }

    if (btn)   { btn.textContent = 'Logging in…'; btn.disabled = true; }
    if (errEl) { errEl.style.display = 'none'; }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      getEl('login-modal')?.classList.remove('active');
      const e = getEl('admin-email');    if (e) e.value = '';
      const p = getEl('admin-password'); if (p) p.value = '';
      openAdmin();
    } catch {
      if (errEl) { errEl.textContent = '❌ Wrong email or password. Try again.'; errEl.style.display = 'block'; }
    } finally {
      if (btn) { btn.textContent = 'Login →'; btn.disabled = false; }
    }
  };

  // Logout
  window.adminLogout = async function () {
    await auth.signOut();
    closeAdmin();
    showToast('👋 Logged out successfully.');
  };

  // Open / close panel
  function openAdmin() {
    const panel = getEl('admin-panel');
    if (!panel) return;
    panel.style.display          = 'block';
    document.body.style.overflow = 'hidden';
    loadAdminData();
  }

  function closeAdmin() {
    const panel = getEl('admin-panel');
    if (!panel) return;
    panel.style.display          = 'none';
    document.body.style.overflow = '';
  }

  window.closeAdmin = closeAdmin;

  // Load bookings table
  async function loadAdminData() {
    const tbody = getEl('admin-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">Loading bookings…</td></tr>';

    try {
      const snap = await db.collection('bookings').orderBy('timestamp', 'desc').get();

      const statTotal = getEl('stat-total');
      const statToday = getEl('stat-today');
      if (statTotal) statTotal.textContent = snap.size;
      if (statToday) {
        const todayStr = new Date().toISOString().slice(0, 10);
        statToday.textContent = snap.docs.filter((d) => d.data().date === todayStr).length;
      }

      if (snap.empty) {
        tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">No bookings yet.</td></tr>';
        return;
      }

      tbody.innerHTML = snap.docs.map((doc, i) => {
        const b = doc.data();
        return `
          <tr>
            <td>${snap.size - i}</td>
            <td style="color:var(--cream);font-weight:400;">${b.name}</td>
            <td><a href="tel:${b.phone}" style="color:var(--orange);text-decoration:none;">${b.phone}</a></td>
            <td><span class="admin-badge">${b.service}</span></td>
            <td>${b.date}</td>
            <td>${b.time}</td>
            <td>${b.note || '—'}</td>
            <td style="font-size:0.75rem;">${b.bookedAt || '—'}</td>
          </tr>
        `;
      }).join('');

    } catch (err) {
      console.error('[Admin load error]', err);
      tbody.innerHTML = '<tr><td colspan="8" class="admin-empty">⚠️ Permission denied. Please login again.</td></tr>';
    }
  }

  // Clear all bookings
  window.clearBookings = async function () {
    if (!confirm('Clear ALL bookings from Firebase? This cannot be undone!')) return;
    try {
      const snap  = await db.collection('bookings').get();
      const batch = db.batch();
      snap.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
      loadAdminData();
      showToast('🗑️ All bookings cleared.');
    } catch (err) {
      console.error('[Clear bookings error]', err);
      alert('Error clearing bookings. Make sure you are logged in.');
    }
  };
}
