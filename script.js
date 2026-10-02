/**
 * SWASTI PARAS JAIN - ONE-PAGE PORTFOLIO SCRIPT
 * Lightweight, fast, and recruiter-focused single-page interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPdfModalListeners();
});

/* ============================================================
   1. Mobile Menu Drawer Handling (Single-Page Navigation)
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile drawer when clicking any section jump link
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* ============================================================
   2. Clipboard Copy with Toast Feedback
   ============================================================ */
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  if (toastIcon) {
    toastIcon.className = isSuccess
      ? 'fas fa-check-circle text-emerald-400'
      : 'fas fa-exclamation-circle text-amber-400';
  }

  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 2600);
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied to clipboard: ${text}`);
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    showToast(`Copied: ${text}`);
  } catch (err) {
    showToast(`Contact: ${text}`);
  }
}

/* ============================================================
   3. PDF Viewer Modal Handling
   ============================================================ */
function openPdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function initPdfModalListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePdfModal();
    }
  });

  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePdfModal();
      }
    });
  }
}
