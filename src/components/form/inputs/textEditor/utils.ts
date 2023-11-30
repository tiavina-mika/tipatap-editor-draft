import { Editor } from "@tiptap/react";
import { DOMSerializer } from "prosemirror-model";

type OutputType = {
  text: string;
  from: number;
  to: number;
};

export const getTextEditorSelectedText = (
  editor: Editor,
  returnType = "text"
): OutputType | null => {
  if (!editor) return null;
  const { state } = editor;
  const { from, to, empty } = state.selection;

  if (empty) return null;

  // -------- html element --------- //
  if (returnType === "node") {
    const nodesArray: string[] = [];

    state.doc.nodesBetween(from, to, (node, pos, parent) => {
      if (parent === state.doc) {
        const serializer = DOMSerializer.fromSchema(editor.schema);
        const dom = serializer.serializeNode(node);
        const tempDiv = document.createElement("div");
        tempDiv.appendChild(dom);
        nodesArray.push(tempDiv.innerHTML);
      }
    });

    return {
      text: nodesArray.join(""),
      from,
      to
    };
  }

  // -------- text --------- //
  return {
    text: editor.state.doc.textBetween(from, to, " "),
    from,
    to
  };
};
