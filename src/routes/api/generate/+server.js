import { json } from '@sveltejs/kit';

/**
 * POST /api/generate
 * @param {Request} request
 */
export async function POST({ request }) {
  try {
    const { prompt } = await request.json();
    
    // 実際のアプリケーションでは、ここでOpenAI APIなどを呼び出します
    // この例ではモックレスポンスを返しています
    const mockResponse = `これはプロンプト「${prompt}」に対するAIの応答のモックです。

実際の実装では、ここでOpenAI、Anthropic、または他のAI APIに接続して、本物の応答を取得します。

SvelteKitのAPIルートを使用することで、APIキーをクライアント側に公開せずにバックエンド処理を行うことができます。`;

    // 短い遅延を追加して処理時間をシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000));

    return json({
      text: mockResponse
    });
  } catch (error) {
    console.error('Error generating text:', error);
    return json({ error: 'テキスト生成中にエラーが発生しました' }, { status: 500 });
  }
}