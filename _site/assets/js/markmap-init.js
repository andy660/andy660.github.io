// assets/js/markmap-init.js
document.addEventListener('DOMContentLoaded', function() {
  console.log('Transforming Markmap code blocks for autoloader.');

  const markmapCodeBlocks = document.querySelectorAll('code.language-markmap');

  // 调试：如果页面上没有找到 Markmap 代码块，提前退出并给出警告
  if (markmapCodeBlocks.length === 0) {
    console.warn('No markmap code blocks found with class "language-markmap" on this page.');
    return; // 没有找到，直接返回，不执行后续转换
  }

  markmapCodeBlocks.forEach(codeElement => {
    const markdownContent = codeElement.textContent;
    const preElement = codeElement.parentNode; // 获取 <code class="language-markmap"> 的父元素 <pre>

    if (preElement && preElement.tagName === 'PRE') {
      // 创建 markmap-autoloader 期望的结构：<div class="markmap"><script type="text/template">...</script></div>
      const markmapDiv = document.createElement('div');
      markmapDiv.className = 'markmap'; // 必须有 'markmap' 类

      const templateScript = document.createElement('script');
      templateScript.type = 'text/template'; // 必须是 type="text/template"
      templateScript.textContent = markdownContent; // 将 Markdown 内容放入 <script> 标签

      markmapDiv.appendChild(templateScript);

      // 用新的 .markmap div 替换原始的 <pre> 元素
      preElement.parentNode.replaceChild(markmapDiv, preElement);
      console.log('Transformed code block to markmap div:', markmapDiv);
    } else {
      console.warn('Could not find parent <pre> element for code block:', codeElement);
    }
  });
  console.log('Finished transforming Markmap code blocks.');
});

// Markmap AutoLoader 配置 (必须在 markmap-autoloader 脚本加载之前)
window.markmap = {
  autoLoader: {
    toolbar: true, // 启用工具栏，提供缩放、平移等交互功能
  },
};