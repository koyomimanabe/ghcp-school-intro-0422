// コナミコード実装
// ↑↑↓↓←→←→BA を入力すると「まるごとモード」が発動するめぽ

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

let konamiIndex = 0;
let konamiActive = false;

document.addEventListener('keydown', (e) => {
  if (e.key === KONAMI[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === KONAMI.length) {
      konamiIndex = 0;
      activateKonamiMode();
    }
  } else {
    konamiIndex = 0;
    // もし最初のキーにマッチするなら1にセット
    if (e.key === KONAMI[0]) konamiIndex = 1;
  }
});

function activateKonamiMode() {
  if (konamiActive) {
    deactivateKonamiMode();
    return;
  }

  konamiActive = true;

  // 虹色モード発動
  document.body.classList.add('rainbow-mode');

  // BGM風ビープ音（Web Audio API）
  playKonamiSound();

  // オーバーレイ表示
  const overlay = document.getElementById('konami-overlay');
  if (overlay) {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';

    // 3秒後にフェードアウト
    setTimeout(() => {
      overlay.style.transition = 'opacity 0.5s';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }, 3000);
  }

  // 全テキストを虹色に
  const allElements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, li');
  allElements.forEach((el, i) => {
    el.style.animation = `rainbow-color 1s linear infinite`;
    el.style.animationDelay = `${(i % 10) * 0.1}s`;
  });

  // コンソールメッセージ
  console.log('%c🌈 まるごとモード発動！神山高専の隠し機能に気づいたあなたはすごいめぽ！ 🌈', 'color: #FF69B4; font-size: 16px; font-weight: bold;');

  // 10秒後に自動解除
  setTimeout(deactivateKonamiMode, 10000);
}

function deactivateKonamiMode() {
  konamiActive = false;
  document.body.classList.remove('rainbow-mode');

  const allElements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, li');
  allElements.forEach((el) => {
    el.style.animation = '';
    el.style.animationDelay = '';
  });
}

function playKonamiSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // 簡単なメロディー
    const melody = [
      { freq: 523.25, dur: 0.15 }, // C5
      { freq: 659.25, dur: 0.15 }, // E5
      { freq: 783.99, dur: 0.15 }, // G5
      { freq: 1046.5, dur: 0.3  }, // C6
      { freq: 783.99, dur: 0.15 }, // G5
      { freq: 1046.5, dur: 0.4  }, // C6
    ];

    let t = audioCtx.currentTime + 0.05;

    melody.forEach(({ freq, dur }) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.start(t);
      osc.stop(t + dur + 0.01);

      t += dur;
    });
  } catch (e) {
    // AudioContextが使えない環境では音を鳴らさない
    console.warn('Web Audio APIが使えませんでした', e);
  }
}

export {};
