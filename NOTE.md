### code block

- the doc is not updated (as of 11/04/24): https://tiptap.dev/docs/editor/api/nodes/code-block-lowlight
- use lowlight doc instead: https://www.npmjs.com/package/lowlight
- the extension is purely to display the code, so should style the code ourself (see textEditorStyles.css)
- add manually highlight.js as a cdn in index.html
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
    />

- issues:
  https://github.com/ueberdosis/tiptap/issues/4874
