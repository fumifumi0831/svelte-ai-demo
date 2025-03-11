import { json } from '@sveltejs/kit';
import { generateText } from '$lib/openai';

/**
 * POST /api/generate
 * @param {Request} request
 */
export async function POST({ request }) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt || prompt.trim() === '') {
      return json({ error: 'プロンプトを入力してください' }, { status: 400 });
    }

    // OpenAI APIを使用してテキスト生成
    const generatedText = await generateText(prompt);

    return json({
      text: generatedText
    });
  } catch (error) {
    console.error('Error generating text:', error);
    return json({ error: 'テキスト生成中にエラーが発生しました' }, { status: 500 });
  }
}