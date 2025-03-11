import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// セキュリティの都合上、プロジェクトルート以外のファイルへのアクセスを許可しない
			strict: true
		}
	},
	// 環境変数の設定
	envPrefix: 'OPENAI_'
});