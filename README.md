# 神山まるごと高専 冒険サイト（非公式ファンサイト）

GitHub Pages で公開する、デコラ×冒険体験の非公式ファンサイト。Astro + Tailwind + GSAP で構築。画像素材は使わず、絵文字 / SVG / CSS アートのみ。音声も Web Audio API による合成のみ。

公開URL: <https://koyomimanabe.github.io/ghcp-school-intro-0422/>

> ⚠️ 本サイトは個人が制作した非公式ファンサイトです。公式情報は <https://kamiyama.ac.jp/> をご確認ください。

## 開発

### 必要環境
- Node.js 18.17+ (推奨 20+)
- npm

### セットアップ / 起動

```bash
npm install
npm run dev     # http://localhost:4321/ghcp-school-intro-0422/ で開発サーバ
npm run build   # dist/ に静的サイト生成
npm run preview # ビルド後のプレビュー
```

### 構成

- `src/pages/` — 各ページ
  - `index.astro` ホーム
  - `curriculum.astro` 学び（3本柱）
  - `campus.astro` 学生・寮生活
  - `adventure.astro` 採集型ミニゲーム
  - `contact.astro` 公式サイト誘導
  - `secret.astro` 隠しページ（コナミコマンドで遷移）
  - `404.astro` 迷子ページ
- `src/layouts/BaseLayout.astro` — 共通レイアウト、グリッター canvas、設定トグル、ステッカー、スクロール付箋、コナミコマンド
- `src/components/` — Header / Footer / CursorPet / Sticker / HiddenEmoji
- `src/lib/` — gsap / audio / storage
- `src/styles/global.css` — デコラ装飾の Tailwind レイヤ

### デプロイ
`.github/workflows/deploy.yml` により `main` ブランチへの push で GitHub Pages に自動デプロイされます。リポジトリ Settings → Pages の Source を **GitHub Actions** に切り替えてください。

### 遊びかた（小ネタ）
- 各ページに「隠し絵文字」が1つ。全6個クリックでフッターにトロフィー表示。
- ↑↑↓↓←→←→BA でコナミコマンド → `/secret` ページ解禁。
- 右下のトグルで 🔊音 / ✨動き / 🌈Hyperモード を切り替え。
- フッターの「今日の運勢」ボタンで日替りおみくじ。
- 空白クリックでキラキラが飛び散る。
- カーソル追従カエル🐸が着いてくる。クリックでひとこと。

