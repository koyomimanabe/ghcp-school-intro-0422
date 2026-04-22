// スクロールギミック - スクロール量に応じてキャラクターが走り、セリフが出るめぽ

let characterEl = null;
let speechBubble = null;
let lastScrollY = 0;

const SPEECHES = [
  { scroll: 10, text: '神山まるごと高専へようこそめぽ！' },
  { scroll: 20, text: 'カリキュラムも見てめぽ！✨' },
  { scroll: 35, text: 'キャンパス最高めぽ〜🏔️' },
  { scroll: 50, text: '入試情報もチェックしてめぽ！' },
  { scroll: 65, text: '神山町、最高の場所めぽ！🌿' },
  { scroll: 80, text: 'スタッフもみんないい人めぽ！' },
  { scroll: 92, text: 'ゲームも遊べるめぽ！🎮' },
];

let shownSpeeches = new Set();

function createScrollCharacter() {
  const container = document.createElement('div');
  container.id = 'scroll-character-container';
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  `;

  // 吹き出し
  speechBubble = document.createElement('div');
  speechBubble.id = 'speech-bubble';
  speechBubble.style.cssText = `
    background: rgba(10,10,26,0.9);
    border: 2px solid #FF69B4;
    border-radius: 12px 12px 0 12px;
    padding: 8px 12px;
    font-family: 'DotGothic16', monospace;
    font-size: 13px;
    color: #FF69B4;
    max-width: 200px;
    text-align: center;
    box-shadow: 0 0 15px rgba(255,105,180,0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translateY(10px);
  `;
  container.appendChild(speechBubble);

  // キャラクター
  characterEl = document.createElement('div');
  characterEl.id = 'scroll-character';
  characterEl.style.cssText = `
    font-size: 40px;
    display: block;
    transition: transform 0.2s ease;
    user-select: none;
  `;
  characterEl.textContent = '🧑‍💻';
  container.appendChild(characterEl);

  document.body.appendChild(container);
}

function updateScrollCharacter() {
  if (!characterEl) return;

  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  const direction = window.scrollY > lastScrollY ? 1 : -1;
  lastScrollY = window.scrollY;

  // スクロール方向に応じてキャラクターを傾ける
  characterEl.style.transform = direction > 0
    ? 'scaleX(1) rotate(5deg)'
    : 'scaleX(-1) rotate(-5deg)';

  // バウンスアニメーション
  characterEl.style.animation = Math.abs(window.scrollY - lastScrollY) > 5
    ? 'bounce 0.3s ease'
    : 'none';

  // 特定のスクロール位置でセリフを表示
  SPEECHES.forEach((speech, i) => {
    if (scrollPercent >= speech.scroll && !shownSpeeches.has(i)) {
      shownSpeeches.add(i);
      showSpeech(speech.text);
    }
  });
}

let speechTimeout = null;

function showSpeech(text) {
  if (!speechBubble) return;

  if (speechTimeout) clearTimeout(speechTimeout);

  speechBubble.textContent = text;
  speechBubble.style.opacity = '1';
  speechBubble.style.transform = 'translateY(0)';

  speechTimeout = setTimeout(() => {
    if (speechBubble) {
      speechBubble.style.opacity = '0';
      speechBubble.style.transform = 'translateY(10px)';
    }
  }, 3000);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  createScrollCharacter();
  window.addEventListener('scroll', updateScrollCharacter, { passive: true });
});

export {};
