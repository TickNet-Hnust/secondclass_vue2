import{_ as n,c as a,o as s,a as t}from"./app.db5862e3.js";const m='{"title":"\u84DD\u8272\u4FA7\u8FB9\u680F","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u84DD\u8272\u4FA7\u8FB9\u680F","slug":"\u84DD\u8272\u4FA7\u8FB9\u680F"},{"level":2,"title":"\u9996\u9875","slug":"\u9996\u9875"}],"relativePath":"guide/views.md","lastUpdated":1641114178165}',p={},e=t(`<div class="info custom-block"><p class="custom-block-title">INFO</p><p>views\u4E2D\u5B58\u653E\u7740\u6240\u6709\u7684\u89C6\u56FE\u9875\u9762\uFF0C\u6253\u611F\u53F9\u53F7\u7684\u90FD\u503C\u5F97\u4F60\u6CE8\u610F\u4E00\u4E0B</p></div><div class="language-shell"><pre><code>\u251C\u2500 views         
\u2502  \u251C\u2500 applications  <span class="token comment"># \u4E8C\u8BFE\u6240\u6709\u91CD\u8981\u7684\u9875\u9762\u7684\u90FD\u5728\u8FD9\u91CC\uFF01</span>
\u2502  \u251C\u2500 components    <span class="token comment"># \u4E0D\u91CD\u8981</span>
\u2502  \u251C\u2500 dashboard     <span class="token comment"># \u4E0D\u91CD\u8981</span>
\u2502  \u251C\u2500 error         <span class="token comment"># \u4E0D\u91CD\u8981</span>
\u2502  \u251C\u2500 home          <span class="token comment"># \u9996\u9875\u7684\u9875\u9762\uFF01</span>
\u2502  \u251C\u2500 monitor       <span class="token comment"># \u4E0D\u91CD\u8981</span>
\u2502  \u251C\u2500 system        <span class="token comment"># \u7CFB\u7EDF\u7BA1\u7406\u7684\u9875\u9762\uFF01</span>
\u2502  \u251C\u2500 tool          <span class="token comment"># \u4E0D\u91CD\u8981</span>
\u2502  \u251C\u2500 index_v1.vue  <span class="token comment"># \u6CA1\u5565\u7528</span>
\u2502  \u251C\u2500 index.vue     <span class="token comment"># \u6CA1\u5565\u7528</span>
\u2502  \u251C\u2500 login.bak.vue <span class="token comment"># login.vue\u7684\u590D\u5236\u54C1\uFF0C\u6CA1\u5565\u7528</span>
\u2502  \u251C\u2500 login.vue     <span class="token comment"># \u767B\u5F55\u9875\u9762\uFF01</span>
\u2502  \u2514\u2500 redirect.vue  <span class="token comment"># \u4E0D\u91CD\u8981</span>
</code></pre></div><h2 id="\u84DD\u8272\u4FA7\u8FB9\u680F" tabindex="-1">\u84DD\u8272\u4FA7\u8FB9\u680F <a class="header-anchor" href="#\u84DD\u8272\u4FA7\u8FB9\u680F" aria-hidden="true">#</a></h2><p>\u84DD\u8272\u4FA7\u8FB9\u680F\u7684\u4F4D\u7F6E\u5728\uFF1A/src/layout/index.vue</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>avatar<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>logout<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    \u6CE8\u9500
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
    <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>device === <span class="token punctuation">&#39;</span>mobile<span class="token punctuation">&#39;</span> &amp;&amp; sidebar.opened<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>drawer-bg<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleClickOutside<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- sidebar\u662F\u84DD\u8272\u4FA7\u8FB9\u680F --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sidebar</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sidebar-container<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{
        backgroundColor:
            sideTheme === <span class="token punctuation">&#39;</span>theme-dark<span class="token punctuation">&#39;</span>
                ? variables.menuBg
                : variables.menuLightBg
    }<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">/&gt;</span></span>
<span class="token comment">&lt;!-- &lt;router-view\u662F\u53F3\u8FB9\u7684\u5185\u5BB9 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-view</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>\u4E3B\u8981\u6709\u4E24\u90E8\u5206\u7EC4\u6210\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/16f36df409d84a4b9fb4a556a37e4420.png" alt="img"></p><h2 id="\u9996\u9875" tabindex="-1">\u9996\u9875 <a class="header-anchor" href="#\u9996\u9875" aria-hidden="true">#</a></h2><p>\u9996\u9875\u7684\u4F4D\u7F6E\u5728\uFF1A/src/views/home/index.vue</p><div class="language-vue"><pre><code><span class="token comment">&lt;!-- Menubar\u662F\u5DE6\u4FA7\u4FA7\u8FB9\u680F --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Menubar</span> <span class="token punctuation">/&gt;</span></span>  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
    <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span> ;<span class="token punctuation">&quot;</span></span></span>
    <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ hasTagsView: needTagsView }<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>main-container<span class="token punctuation">&quot;</span></span>
<span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ <span class="token punctuation">&#39;</span>fixed-header<span class="token punctuation">&#39;</span>: fixedHeader }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- tags-view\u662F\u52A8\u6001\u6807\u7B7E --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tags-view</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>needTagsView<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- appMain\u662F\u4E2D\u95F4\u7684\u5185\u5BB9 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-main</span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>\u5BF9\u5E94\u7684\u9875\u9762\uFF1A</p><p><img src="https://img-blog.csdnimg.cn/47c31e01dd5145b99183defe3dac3553.png" alt="img"></p>`,12),o=[e];function c(l,u,i,k,r,g){return s(),a("div",null,o)}var v=n(p,[["render",c]]);export{m as __pageData,v as default};
