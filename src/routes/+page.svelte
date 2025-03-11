<script>
  let prompt = '';
  let response = '';
  let loading = false;
  
  async function generateText() {
    loading = true;
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      response = data.text;
    } catch (error) {
      console.error('Error:', error);
      response = 'エラーが発生しました';
    } finally {
      loading = false;
    }
  }
</script>

<div class="container">
  <h1>AI テキスト生成</h1>
  
  <textarea bind:value={prompt} placeholder="プロンプトを入力してください"></textarea>
  
  <button on:click={generateText} disabled={loading || !prompt}>
    {#if loading}
      生成中...
    {:else}
      生成する
    {/if}
  </button>
  
  {#if response}
    <div class="response">
      <h2>AI応答:</h2>
      <p>{response}</p>
    </div>
  {/if}

  <div class="resources">
    <h3>参考資料</h3>
    <ul>
      <li><a href="/article">Next.js開発者がSvelteを学ぶ理由と始め方</a></li>
    </ul>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  textarea {
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    padding: 10px;
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .response {
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 4px;
    white-space: pre-wrap;
  }

  h1 {
    color: #ff3e00;
    margin-bottom: 20px;
  }

  .resources {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .resources h3 {
    color: #333;
    font-size: 1.2rem;
  }

  .resources a {
    color: #ff3e00;
    text-decoration: none;
  }

  .resources a:hover {
    text-decoration: underline;
  }
</style>