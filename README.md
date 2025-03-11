# Svelte AI Demo

Svelteを使った簡単なAIテキスト生成デモアプリです。Next.jsからSvelteに移行する方のための参考例として作成しました。

## 機能

- シンプルなUIでAIにテキスト生成を依頼できます
- APIエンドポイントを介してAIモデルと通信します
- Svelteの基本的な機能（状態管理、イベント処理など）を使用しています

## 使い方

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## プロジェクト構造

```
/src
  /routes
    /api
      /generate
        +server.js  # APIエンドポイント
    +page.svelte   # メインページ
  /lib
    # 共有コンポーネントや関数
  app.html         # HTMLテンプレート
```

## 学習リソース

- [Svelte公式ドキュメント](https://svelte.dev/docs)
- [SvelteKit公式ドキュメント](https://kit.svelte.dev/docs)