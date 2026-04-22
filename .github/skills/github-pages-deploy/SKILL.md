---
name: github-pages-deploy
description: 'GitHub Pages へのデプロイをセットアップする。Astro サイトを GitHub Pages で公開する、GitHub Actions ワークフローを作成する、astro.config.mjs を設定する、デプロイを実行する場合に使う。Use when: deploying to GitHub Pages, setting up CI/CD for static site, configuring Astro for GitHub Pages.'
argument-hint: 'リポジトリ名またはデプロイ対象のブランチ（省略可）'
---

# GitHub Pages デプロイ

## 概要

Astro プロジェクトを GitHub Pages で公開するためのセットアップ手順めぽ。

**参考ドキュメント:**
- [GitHub Pages 公式ドキュメント（日本語）](https://docs.github.com/ja/pages)
- [Astro × GitHub Pages デプロイガイド](https://docs.astro.build/ja/guides/deploy/github/)

---

## 手順

### Step 1: `astro.config.mjs` を確認・設定する

`site` と `base` オプションを設定するめぽ。

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<ユーザー名>.github.io',
  base: '/<リポジトリ名>',
});
```

- `site`: GitHub Pages の公開 URL（`https://<org>.github.io/<repo>` 形式）
- `base`: リポジトリ名をスラッシュ付きで指定（カスタムドメインの場合は不要）

> カスタムドメインを使う場合は `base` を省略し、`site` にカスタムドメインを設定するめぽ。

---

### Step 2: GitHub Actions ワークフローを作成する

`.github/workflows/deploy.yml` を作成するめぽ。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

### Step 3: GitHub リポジトリの Pages 設定を変更する

1. リポジトリの **Settings** → **Pages** を開くめぽ
2. **Build and deployment** の **Source** を `GitHub Actions` に変更するめぽ

> 参考: [公開ソースの設定](https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

---

### Step 4: デプロイを実行する

```bash
git add .
git commit -m "GitHub Pages デプロイ設定を追加"
git push origin main
```

push 後、GitHub Actions の **Actions** タブでワークフローの実行を確認するめぽ。

---

## チェックリスト

- [ ] `astro.config.mjs` に `site` が設定されている
- [ ] リポジトリ名が `base` に設定されている（カスタムドメイン不使用の場合）
- [ ] `.github/workflows/deploy.yml` が存在する
- [ ] リポジトリの Pages 設定が `GitHub Actions` になっている
- [ ] ワークフローが正常に完了している

---

## よくあるトラブル

| 症状 | 原因 | 対処 |
|------|------|------|
| CSS・画像が読み込まれない | `base` が未設定または間違い | `astro.config.mjs` の `base` を確認 |
| 404 エラー | Pages が有効でない | Settings → Pages で Source を確認 |
| ワークフローが失敗する | `permissions` 不足 | `pages: write` と `id-token: write` を確認 |
| デプロイされない | ブランチ名が違う | `on.push.branches` を現在のブランチ名に合わせる |
