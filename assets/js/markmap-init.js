(function() {
  window.markmap = {
    autoLoader: {
      toolbar: true,
    },
  };

  document.addEventListener('DOMContentLoaded', function() {
    const DEBUG = false;

    const markmapCodeBlocks = document.querySelectorAll('code.language-markmap');

    if (markmapCodeBlocks.length === 0) {
      if (DEBUG) {
        console.log('No markmap code blocks found on this page.');
      }
      return;
    }

    markmapCodeBlocks.forEach(codeElement => {
      const markdownContent = codeElement.textContent;
      const preElement = codeElement.parentNode;

      if (!preElement || preElement.tagName !== 'PRE') {
        if (DEBUG) {
          console.warn('Skipping code block: parent is not a PRE element', codeElement);
        }
        return;
      }

      const markmapDiv = document.createElement('div');
      markmapDiv.className = 'markmap';

      const templateScript = document.createElement('script');
      templateScript.type = 'text/template';
      templateScript.textContent = markdownContent;

      markmapDiv.appendChild(templateScript);
      preElement.parentNode.replaceChild(markmapDiv, preElement);
      
      if (DEBUG) {
        console.log('Transformed a markmap code block');
      }
    });
  });
})();