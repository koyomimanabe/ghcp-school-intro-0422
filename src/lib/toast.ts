// Toast notification system (global)
export type ToastKind = 'info' | 'success' | 'warn' | 'achievement';

function container(): HTMLElement {
  let c = document.getElementById('kmg-toast-layer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'kmg-toast-layer';
    c.style.cssText =
      'position:fixed;top:88px;left:50%;transform:translateX(-50%);z-index:60;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:90vw;';
    document.body.appendChild(c);
  }
  return c;
}

const COLORS: Record<ToastKind, string> = {
  info: '#6bf2c6',
  success: '#fff25a',
  warn: '#ff3ea5',
  achievement: '#c9a7ff',
};

export function toast(message: string, kind: ToastKind = 'info', ms = 2200) {
  const el = document.createElement('div');
  el.textContent = message;
  el.style.cssText = `pointer-events:auto;background:${COLORS[kind]};color:#0c0a1a;border:3px solid #0c0a1a;border-radius:999px;padding:8px 18px;font-weight:800;box-shadow:4px 4px 0 #0c0a1a;transform:translateY(-12px) rotate(-2deg);opacity:0;transition:all .35s cubic-bezier(.2,.8,.2,1);font-family:inherit;`;
  container().appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0) rotate(-2deg)';
  });
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-12px) rotate(2deg)';
    setTimeout(() => el.remove(), 400);
  }, ms);
}

export function achievement(title: string) {
  toast(`🏅 ${title}`, 'achievement', 2600);
}
