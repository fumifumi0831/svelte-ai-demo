import OpenAI from 'openai';

// API設定
const apiKey = import.meta.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI APIキーが設定されていません。.envファイルにOPENAI_API_KEYを設定してください。');
}

// OpenAIのクライアントを初期化
export const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: false // サーバーサイドでのみ使用する設定
});

/**
 * テキスト生成関数
 * @param {string} prompt ユーザーからのプロンプト
 * @returns {Promise<string>} 生成されたテキスト
 */
export async function generateText(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI APIエラー:', error);
    throw new Error('テキスト生成中にエラーが発生しました');
  }
}