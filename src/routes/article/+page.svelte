<script>
  import { onMount } from 'svelte';
  
  let articleContent = '';
  let loading = true;
  
  onMount(async () => {
    try {
      const response = await fetch('/articles/nextjs-to-svelte.md');
      articleContent = await response.text();
    } catch (error) {
      console.error('記事の読み込みに失敗しました:', error);
      articleContent = '記事の読み込みに失敗しました。';
    } finally {
      loading = false;
    }
  });
</script>

<div class="article-container">
  <nav>
    <a href="/">← ホームに戻る</a>
  </nav>
  
  {#if loading}
    <div class="loading">
      <p>記事を読み込み中...</p>
    </div>
  {:else}
    <div class="article-content">
      {@html formatMarkdown(articleContent)}
    </div>
  {/if}
</div>

<style>
  .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
  }
  
  nav {
    margin-bottom: 20px;
  }
  
  nav a {
    color: #ff3e00;
    text-decoration: none;
    font-weight: 500;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  
  .loading {
    text-align: center;
    padding: 40px;
    color: #666;
  }
  
  .article-content {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .article-content :global(h1) {
    color: #ff3e00;
    margin-top: 0;
  }
  
  .article-content :global(h2) {
    color: #333;
    margin-top: 1.5em;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3em;
  }
  
  .article-content :global(pre) {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
  }
  
  .article-content :global(code) {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.9em;
  }
  
  .article-content :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
  }
  
  .article-content :global(th), .article-content :global(td) {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }
  
  .article-content :global(th) {
    background-color: #f6f8fa;
  }
</style>

<script context="module">
  // 簡易的なMarkdownパーサー（実際のアプリでは marked.js などのライブラリを使うことをお勧めします）
  function formatMarkdown(markdown) {
    if (!markdown) return '';
    
    // コードブロック処理（```で囲まれた部分）
    let formatted = markdown.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code)}</code></pre>`;
    });
    
    // 見出し処理
    formatted = formatted.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // リスト処理
    formatted = formatted.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/^- (.*)$/gm, '<li>$1</li>');
    
    // 段落処理
    formatted = formatted.replace(/^(?!<h|<li|<pre|<\/)(.*$)/gm, function(match) {
      if (match.trim() === '') return '';
      return `<p>${match}</p>`;
    });
    
    // リンク処理
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // テーブル処理（非常に簡易的）
    formatted = formatted.replace(/\|(.+)\|/g, '<tr><td>$1</td></tr>');
    formatted = formatted.replace(/<td>(.+)<\/td>/g, function(match, content) {
      return '<td>' + content.replace(/\|/g, '</td><td>') + '</td>';
    });
    
    return formatted;
  }
  
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
</script>