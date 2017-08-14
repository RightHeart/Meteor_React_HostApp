MarkdownMixin = {
  convertToMarkdown(html) {
    return toMarkdown(html, {converters: [
      {
        filter: ['div', 'p'],
        replacement(content) {
          return content + '\n\n';
        },
      },
      {
        filter: ['u', 'ins'],
        replacement(content) {
          return '++' + content + '++';
        },
      },
      {
        filter: ['i'],
        replacement(content) {
          return '*' + content + '*';
        },
      },
      {
        filter: ['b'],
        replacement(content) {
          return '**' + content + '**';
        },
      },
    ]});
  },
  convertToHtml(m) {
    return markdown.render(m);
  },
};
