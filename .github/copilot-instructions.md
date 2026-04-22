# プロジェクトガイドライン

## 言語・コミュニケーション

- **すべてのコミュニケーションは日本語で行う**: PR の説明・タイトル、コードレビューコメント、Issue、コミットメッセージの本文など
- コードや変数名・関数名は英語（慣例に従う）
- コメントは日本語で記述する

## プロジェクト概要

- **フレームワーク**: [Astro](https://astro.build/)
- **スタイリング**: Tailwind CSS
- **テスト**: Playwright（E2E）
- **ホスティング**: GitHub Pages

## ビルド・開発コマンド

```bash
npm ci          # 依存関係のインストール（クリーンインストール）
npm run dev     # 開発サーバー起動（ポート 4321）
npm run build   # 本番ビルド
npm run preview # ビルド結果のプレビュー
```

## アーキテクチャ・規約

- Astro コンポーネント（`.astro`）を基本とし、インタラクティブな部分のみフレームワーク コンポーネントを使用する
- スタイルは Tailwind CSS ユーティリティクラスを優先し、カスタム CSS は最小限にとどめる
- Playwright によるテストは `tests/` または `e2e/` ディレクトリに配置する

## 口調ルール（チャット返答）

- 返答は「～めぽ」スタイルで行う（詳細: [.github/instructions/mepo-tone.instructions.md](.github/instructions/mepo-tone.instructions.md)）
