# Svelte AI Demo

Svelteを使った簡単なAIテキスト生成デモアプリです。Next.jsからSvelteに移行する方のための参考例として作成しました。

## 機能

- シンプルなUIでAIにテキスト生成を依頼できます
- OpenAI APIを使用してAIテキスト生成を行います
- Svelteの基本的な機能（状態管理、イベント処理など）を使用しています

## セットアップ

1. このリポジトリをクローンします：
```bash
git clone https://github.com/fumifumi0831/svelte-ai-demo.git
cd svelte-ai-demo
```

2. 依存関係をインストールします：
```bash
npm install
```

3. `.env`ファイルを作成し、OpenAI APIキーを設定します：
```
OPENAI_API_KEY=your_api_key_here
```

4. 開発サーバーを起動します：
```bash
npm run dev
```

5. ブラウザで`http://localhost:5173`にアクセスします。

## OpenAI APIの使用方法

このプロジェクトでは、OpenAI APIを使用してテキスト生成を行っています。以下のファイルが関連しています：

- `src/lib/openai.js` - OpenAI APIクライアントの設定
- `src/routes/api/generate/+server.js` - APIエンドポイント

APIキーは`.env`ファイルで管理され、サーバーサイドでのみ使用されます。クライアントサイドにAPIキーが漏れることはありません。

## プロジェクト構造

```
/src
  /routes
    /api
      /generate
        +server.js  # OpenAI APIを呼び出すエンドポイント
    +page.svelte   # メインページ
  /lib
    openai.js      # OpenAI API設定
  app.html         # HTMLテンプレート
```

## カスタマイズ

- 別のAIモデルを使用する場合は、`src/lib/openai.js`の`generateText`関数を修正してください。
- 生成パラメータを調整する場合も同様に`src/lib/openai.js`を編集してください。
- UIをカスタマイズする場合は、`src/routes/+page.svelte`を編集してください。

## 学習リソース

- [Svelte公式ドキュメント](https://svelte.dev/docs)
- [SvelteKit公式ドキュメント](https://kit.svelte.dev/docs)
- [OpenAI API リファレンス](https://platform.openai.com/docs/api-reference)