# Plan: 神山まるごと高専 紹介ページ（原宿系・冒険サイト）

GitHub Pages で公開する神山まるごと高専の非公式紹介ページ。デコラ×ポップアートの派手ビジュアル、GSAPによる動き、散りばめた小ネタ・イースターエッグ・採集型ミニゲームで「サイトを冒険する」体験を作る。Astro + Tailwind + GSAP 構成、自作の絵文字/CSSアートのみを使用、GitHub Actions で自動デプロイ。

## Steps

### Phase 1: 足場作り（基盤セットアップ）
1. リポジトリ直下に Astro プロジェクトを初期化（`npm create astro@latest` を最小テンプレで実行）。既存 README.md は Astro 初期化時に上書きせず、本プロジェクトの案内内容を維持したうえで起動手順等を追記する形で更新する。
2. Tailwind 統合（`npx astro add tailwind`）。`tailwind.config.mjs` にデコラ系のカスタムカラーパレット（ホットピンク/ミント/レモン/ラベンダー/電気ブルー/黒）と`comic`フォント、`wiggle`/`bounce-slow`/`spin-slow`/`rainbow`等のkeyframes animationを定義。
3. GSAP を依存追加（`npm i gsap`）。`src/lib/gsap.ts` に ScrollTrigger 登録の共通初期化。
4. `astro.config.mjs` に `site` と `base` を設定（`https://koyomimanabe.github.io/ghcp-school-intro-0422`、base は `/ghcp-school-intro-0422/`）。
5. GitHub Actions ワークフロー `.github/workflows/deploy.yml` を作成（公式 `withastro/action@v3` 利用、Pages 環境にデプロイ）。
6. `.gitignore`、`README.md` 追記（ローカル起動手順）。

### Phase 2: 共通レイアウトとビジュアル言語
7. `src/layouts/BaseLayout.astro`: HTML骨組み、OGP、派手背景（斜めストライプ＋グリッター粒子を`<canvas>`で）、BGM/SE/動き軽減トグルを右下固定。
8. `src/components/Header.astro`: ネオン看板風ロゴ（CSSアートで「神山まるごと高専」を派手タイポ）、メニューはリボン/吹き出し/星型ボタン混在。スクロールで揺れる。
9. `src/components/Footer.astro`: 公式サイトへの外部リンク、注意書き（非公式ファンサイト）、隠しコマンドのヒント。
10. `src/components/Sticker.astro`: 再利用可能なキラキラ装飾（ハート/星/リボン/♡/★）。ページ全体にランダム配置。
11. `src/styles/global.css`: スクロールバー装飾、テキストグラデ、コミック風ふきだし、派手カーソル定義。

### Phase 3: ページ／セクション実装
12. `src/pages/index.astro`（トップ）:
    - ヒーロー: 「ようこそ冒険者！」大見出し（GSAP で文字分割バウンドイン）
    - 学校概要カード（場所：徳島県神山町／理念：テック×デザイン×起業家精神／創設：2023年）
    - セクション区切りはギザギザSVG、リボン、コミックのコマ割り風
13. `src/pages/curriculum.astro`（学び）: 3本柱を「テック」「デザイン」「起業家精神」のコマ風レイアウト。各柱をホバーでキラキラ拡大、スクロールで左右から飛び込み。
14. `src/pages/campus.astro`（学生・寮生活）: 山×街の横スクロールパララックスイラスト（CSS/SVG）。吹き出しで生徒のひとことランダム表示。
15. `src/pages/contact.astro`: 「公式はこっち！」巨大派手ボタンで公式サイトへ外部リンク（`rel="noopener"`）。本サイトが非公式である旨を明記。
16. `src/pages/404.astro`: 迷子キャラが「道に迷った？」＋ランダム名言。

### Phase 4: 冒険要素・小ネタ・イースターエッグ
17. カーソル追従キャラ: `src/components/CursorPet.astro` + クライアントスクリプト。マスコット絵文字が遅延追従、クリックで吹き出しコメント。
18. クリック増殖ステッカー: 空白クリックで絵文字が飛び散る（キャップ50個で古いものから消す）。
19. BGM/SE トグル: 音声素材ファイルは一切用意せず、Web Audio API による矩形波合成のみで SE/BGM を生成する（`src/lib/audio.ts` でワンショット再生）。初期OFF、localStorage保存。`public/audio/` ディレクトリも作成しない。
20. ダークモード（派手→さらに派手）: ネオン発光強化・背景極彩色・スクロール速度アップ等。`prefers-reduced-motion` 尊重。
21. コナミコマンド: 入力で `/secret` 隠しページ出現（`src/pages/secret.astro`：歴代開発ログ風のジョークページ＋感謝のメッセージ）。
22. おみくじ: フッター付近のボタンで今日の運勢（学び運/寮メシ運/コード運）をランダム生成、日替わりでseed固定。
23. 採集型ミニゲーム `src/pages/adventure.astro`:
    - 横スクロール神山マップ（CSS/SVG背景）。プレイヤー（絵文字）をキー/タップで左右移動。
    - 散在する「象徴アイテム」（葉っぱ🍃・LED💡・スダチ🍊・コード📜・アート🎨・起業スパーク⚡）を時間内に採集。
    - 採集数に応じた称号表示、localStorageでベストスコア保存。
    - 実装は Canvas ではなく DOM+GSAP で軽量に。
24. スクロール連動ランダムメッセージ: スクロール一定距離ごとに画面端から付箋が飛んでくる。
25. ページ間に「隠し絵文字」を各1個配置、全部見つけるとフッターにトロフィー表示（localStorage）。

### Phase 5: 仕上げ・検証・公開
26. アクセシビリティ: `prefers-reduced-motion` でアニメ大幅抑制、コントラスト確認、キーボード操作でミニゲーム可能にする。
27. パフォーマンス: GSAP は必要ページのみ client 読込、画像は使わずSVG/絵文字のみなので軽量維持。
28. Lighthouse 簡易チェック（ローカル `npm run build && npm run preview`）。
29. GitHub Pages の設定を Actions ソースに切替（リポジトリ Settings → Pages）。push で自動デプロイ確認。

## Relevant files
- `astro.config.mjs` — `site`/`base` 設定、integrations
- `tailwind.config.mjs` — デコラ系カラー・keyframes・フォント
- `src/layouts/BaseLayout.astro` — 共通レイアウト、グローバル装飾、トグル群
- `src/components/Header.astro` / `Footer.astro` / `Sticker.astro` / `CursorPet.astro` — 共通UI
- `src/lib/gsap.ts` — ScrollTrigger登録
- `src/lib/audio.ts` — Web Audio合成SE/BGM
- `src/lib/storage.ts` — localStorage ラッパ（収集状況/ベストスコア/設定）
- `src/pages/index.astro` / `curriculum.astro` / `campus.astro` / `contact.astro` / `adventure.astro` / `secret.astro` / `404.astro` — 各ページ
- `src/styles/global.css` — グローバルCSS
- `.github/workflows/deploy.yml` — GitHub Actions デプロイ
- `README.md` — 起動手順追記

## Verification
1. `npm run dev` でローカル起動し、全ページ遷移・ミニゲーム動作・コナミコマンドでsecret出現・おみくじ・ステッカー増殖・カーソル追従を手動確認。
2. `npm run build` がエラーなく完了、`dist/` に静的ファイルが生成される。
3. OS設定で「視差効果を減らす」をONにしてアニメが抑制されることを確認。
4. GitHub Actions のワークフロー実行成功・Pages URL (`https://koyomimanabe.github.io/ghcp-school-intro-0422/`) で表示崩れなし。
5. モバイル幅（375px）とデスクトップ（1440px）でレイアウト確認。
6. リンク切れ・外部リンクが `target="_blank" rel="noopener noreferrer"` で開くことを確認。

## Decisions
- **非公式ファンサイト**として明記（公式ロゴ/写真は一切使わない）。公式への誘導リンクはcontactに設置。
- 画像素材は自作しない方針: すべて絵文字 + SVG + CSSアート。
- 音声も素材ファイル不要: Web Audio API による合成音のみ。
- Tailwind 採用（デコラの装飾クラスを量産するため相性◎）。
- デプロイは GitHub Actions（公式 `withastro/action`）。
- ミニゲームはDOM + GSAPで軽量実装、Canvasは使わない。

## Fixed Decisions (おすすめで確定)
- 問い合わせリンク: 公式トップ `https://kamiyama.ac.jp/` へリンク
- 隠しページ: 開発ログ風ジョーク + クレジット/感謝のハイブリッド
- OGP: text-only（画像なし）
