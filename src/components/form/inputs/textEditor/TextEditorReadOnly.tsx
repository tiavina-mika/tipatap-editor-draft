/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import "./textEditorStyles.scss";

import { EditorContent } from "@tiptap/react";

import { useTextEditor } from "../../../../hooks/useTextEditor";

type TextEditorProps = {
  className?: string;
  value?: string;
};

const TextEditorReadOnly = ({ className, value }: TextEditorProps) => {
  const editor = useTextEditor({
    editable: false,
    content: value
  });

  return <EditorContent editor={editor} className={className} />;
};

export default TextEditorReadOnly;
