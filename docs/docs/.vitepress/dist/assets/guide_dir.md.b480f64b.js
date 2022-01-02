import{_ as n,c as s,o as e,a}from"./app.db5862e3.js";const b='{"title":"\u672C\u5730\u5B89\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u672C\u5730\u5B89\u88C5","slug":"\u672C\u5730\u5B89\u88C5"},{"level":2,"title":"\u76EE\u5F55\u7ED3\u6784","slug":"\u76EE\u5F55\u7ED3\u6784"},{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"\u542F\u52A8","slug":"\u542F\u52A8"}],"relativePath":"guide/dir.md","lastUpdated":1641112029642}',t={},o=a(`<h2 id="\u672C\u5730\u5B89\u88C5" tabindex="-1">\u672C\u5730\u5B89\u88C5 <a class="header-anchor" href="#\u672C\u5730\u5B89\u88C5" aria-hidden="true">#</a></h2><ol><li><p>gitlab\u79C1\u6709\u4ED3\u5E93\uFF1A<a href="https://gitlab.com/mingyuefusu/second_class_front" target="_blank" rel="noopener noreferrer">https://gitlab.com/mingyuefusu/second_class_front</a></p></li><li><p>\u786E\u4FDD\u81EA\u5DF1\u662F\u8FD9\u4E2A\u79C1\u6709\u4ED3\u5E93\u7684\u6210\u5458\uFF0C\u5982\u82E5\u6CA1\u6709\uFF0C\u627E\u7BA1\u7406\u5458\u6DFB\u52A0\uFF08\u6797\u8212\u6052\uFF09</p></li><li><p>\u7136\u540E\uFF0C\u672C\u5730\u514B\u9686\u8BE5\u4ED3\u5E93\u7684 <strong>master\u5206\u652F</strong></p></li></ol><div class="language-shell"><pre><code>$ <span class="token function">git</span> clone -b master https://gitlab.com/mingyuefusu/second_class_front
</code></pre></div><ol start="4"><li>\u4F60\u5C06\u4F1A\u5F97\u5230\u5982\u4E0B\u76EE\u5F55\u7ED3\u6784</li></ol><h2 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1">\u76EE\u5F55\u7ED3\u6784 <a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a></h2><div class="language-shell {}"><pre><code>\u251C\u2500 .git         <span class="token comment"># git\u6587\u4EF6\u5939</span>
\u251C\u2500 bin          <span class="token comment"># \u53EF\u6267\u884C\u6587\u4EF6\uFF0C\u6CA1\u5565\u7528</span>
\u251C\u2500 docs         <span class="token comment"># \u6B64\u6587\u6863\u7684\u4ED3\u5E93</span>
\u251C\u2500 out          <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 public       <span class="token comment"># \u914D\u5408webpack\u6253\u5305\u7684\u9759\u6001\u76EE\u5F55</span>
\u251C\u2500 src          <span class="token comment"># \u5F00\u53D1\u6839\u76EE\u5F55</span>
\u251C\u2500 tests        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .editorconfig        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .env.development     <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .env.production      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .env.staging         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .eslintignore        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .eslintrc.js         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .gitignore           <span class="token comment"># git\u63D0\u4EA4\u65F6\u5FFD\u7565\u63D0\u4EA4\u7684\u6587\u4EF6</span>
\u251C\u2500 .prettierignore      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .prettierrc.js       <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 babel.config.js      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 deploy.config.js     <span class="token comment"># \u81EA\u52A8\u5316\u90E8\u7F72\u76F8\u5173</span>
\u251C\u2500 docs-loader.js       <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 jest.config.js       <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 jsdoc-vue.js         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 jsdoc.config.js      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 package-lock.json    <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 package.json         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 README.md            <span class="token comment"># readme\u6587\u6863</span>
\u251C\u2500 vue.config.js        <span class="token comment"># \u6253\u5305\u65F6\u5019\u7684\u914D\u7F6E</span>
\u2514\u2500 yarn.lock            <span class="token comment"># \u4E0D\u7528\u7BA1</span>
</code></pre></div><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><p>\u91C7\u7528 <strong>npm</strong> \u5B89\u88C5\uFF0C\u800C\u4E14\u5FC5\u987B\u4F7F\u7528 <strong>6</strong> \u5F00\u5934\u7684\u7248\u672C</p><p>\u67E5\u770B npm \u7248\u672C:</p><div class="language-shell"><pre><code>$ <span class="token function">npm</span> -v
<span class="token number">6.14</span>.15
</code></pre></div><p>\u5982\u679C\u4E0D\u662F\uFF0C\u5347\u7EA7\u6216\u964D\u7EA7\u52306\u7248\u672C</p><div class="language-shell"><pre><code>$ <span class="token function">npm</span> <span class="token function">install</span> -g npm@6
</code></pre></div><p>\u786E\u4FDD\u4F7F\u75286\u5F00\u5934\u7684npm\u4E4B\u540E\uFF0C\u6267\u884C\uFF1A</p><div class="language-shell"><pre><code>$ <span class="token function">npm</span> <span class="token function">install</span>
</code></pre></div><p>\u5B89\u88C5\u5B8C\u6210\u540E\u53EF\u80FD\u4F1A\u4EA7\u751F\u4E00\u4E9B\u8FC7\u671F\u8B66\u544A\uFF0C\u4F46\u662F\u6CA1\u62A5\u9519\u5C31\u884C</p><p>\u73B0\u5728\u7684\u76EE\u5F55\u7ED3\u6784\uFF1A</p><div class="language-shell"><div class="highlight-lines"><br><br><br><div class="highlighted">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><pre><code>\u251C\u2500 .git         <span class="token comment"># git\u6587\u4EF6\u5939</span>
\u251C\u2500 bin          <span class="token comment"># \u53EF\u6267\u884C\u6587\u4EF6\uFF0C\u6CA1\u5565\u7528</span>
\u251C\u2500 docs         <span class="token comment"># \u6B64\u6587\u6863\u7684\u4ED3\u5E93</span>
\u251C\u2500 node_modules <span class="token comment"># \u61C2\u5F97\u90FD\u61C2</span>
\u251C\u2500 out          <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 public       <span class="token comment"># \u914D\u5408webpack\u6253\u5305\u7684\u9759\u6001\u76EE\u5F55</span>
\u251C\u2500 src          <span class="token comment"># \u5F00\u53D1\u6839\u76EE\u5F55</span>
\u251C\u2500 tests        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .editorconfig        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .env.development     <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .env.production      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .env.staging         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .eslintignore        <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .eslintrc.js         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .gitignore           <span class="token comment"># git\u63D0\u4EA4\u65F6\u5FFD\u7565\u63D0\u4EA4\u7684\u6587\u4EF6</span>
\u251C\u2500 .prettierignore      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 .prettierrc.js       <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 babel.config.js      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 deploy.config.js     <span class="token comment"># \u81EA\u52A8\u5316\u90E8\u7F72\u76F8\u5173</span>
\u251C\u2500 docs-loader.js       <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 jest.config.js       <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 jsdoc-vue.js         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 jsdoc.config.js      <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 package-lock.json    <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 package.json         <span class="token comment"># \u4E0D\u7528\u7BA1</span>
\u251C\u2500 README.md            <span class="token comment"># readme\u6587\u6863</span>
\u251C\u2500 vue.config.js        <span class="token comment"># \u6253\u5305\u65F6\u5019\u7684\u914D\u7F6E</span>
\u2514\u2500 yarn.lock            <span class="token comment"># \u4E0D\u7528\u7BA1</span>
</code></pre></div><h2 id="\u542F\u52A8" tabindex="-1">\u542F\u52A8 <a class="header-anchor" href="#\u542F\u52A8" aria-hidden="true">#</a></h2><div class="language-shell"><pre><code>$ <span class="token function">npm</span> run dev
</code></pre></div><p>\u6253\u5F00 <a href="http://localhost:80" target="_blank" rel="noopener noreferrer">http://localhost:80</a></p><p><img src="https://img-blog.csdnimg.cn/c16324d980eb4673bc57174c0a76f066.png" alt="img"></p>`,21),c=[o];function p(l,m,r,i,d,g){return e(),s("div",null,c)}var h=n(t,[["render",p]]);export{b as __pageData,h as default};
