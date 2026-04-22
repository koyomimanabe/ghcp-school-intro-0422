# 神山まるごと高専 冒険サイト（非公式ファンサイト）

GitHub Pages で公開予定の、デコラ×冒険体験の非公式ファンサイト。Astro + Tailwind + GSAP での構築を計画中。画像素材は使わず、絵文字 / SVG / CSS アートのみ。音声も Web Audio API による合成のみ。

公開予定URL: <https://koyomimanabe.github.io/ghcp-school-intro-0422/>

> ⚠️ 本サイトは個人が制作予定の非公式ファンサイトです。公式情報は <https://kamiyama.ac.jp/> をご確認ください。

## 現在のステータス

**準備中 / 計画段階です。** 実装は未着手で、本リポジトリには計画ドキュメント（[`.github/prompts/plan-kamiyamaCollegeIntroSite.prompt.md`](.github/prompts/plan-kamiyamaCollegeIntroSite.prompt.md)）のみが含まれています。Astro プロジェクト本体（`package.json` / `src/` / `.github/workflows/deploy.yml` 等）は今後順次追加していく予定です。

## 実装予定の内容（計画）

詳細は [プラン](.github/prompts/plan-kamiyamaCollegeIntroSite.prompt.md) を参照してください。ここでは概要のみ記載します。

### 予定している開発フロー

Astro プロジェクト追加後は、以下のコマンドで開発できるようにする予定です（`package.json` 追加後に有効になります）。

```bash
npm install
npm run dev     # http://localhost:4321/ghcp-school-intro-0422/ で開発サーバ
npm run build   # dist/ に静的サイト生成
npm run preview # ビルド後のプレビュー
```

### 予定しているディレクトリ構成

- `src/pages/` — 各ページ（ホーム / 学び / 学生・寮生活 / 採集型ミニゲーム / 公式サイト誘導 / 隠しページ / 404）
- `src/layouts/BaseLayout.astro` — 共通レイアウト、グリッター canvas、設定トグル、ステッカー、スクロール付箋、コナミコマンド
- `src/components/` — Header / Footer / CursorPet / Sticker / HiddenEmoji 等
- `src/lib/` — gsap / audio / storage
- `src/styles/global.css` — デコラ装飾の Tailwind レイヤ

### 予定しているデプロイ方法

`.github/workflows/deploy.yml`（今後追加予定）により `main` ブランチへの push で GitHub Pages に自動デプロイする構成を想定しています。追加後はリポジトリ Settings → Pages の Source を **GitHub Actions** に切り替える必要があります。

## 遊びかた（小ネタ・実装予定）

- 各ページに「隠し絵文字」を1つ配置。全6個クリックでフッターにトロフィー表示。
- ↑↑↓↓←→←→BA でコナミコマンド → `/secret` ページ解禁。
- 右下のトグルで 🔊音 / ✨動き / 🌈Hyperモード を切り替え。
- フッターの「今日の運勢」ボタンで日替わりおみくじ。
- 空白クリックでキラキラが飛び散る。
- カーソル追従カエル🐸が着いてくる。クリックでひとこと。
