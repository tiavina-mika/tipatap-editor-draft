import { Editor } from "@tiptap/react";
import { DOMSerializer } from "prosemirror-model";

export const getSelectedText = (
  editor: Editor,
  returnType = "text"
): string | null => {
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

    return nodesArray.join("");
  }

  // -------- text --------- //
  return editor.state.doc.textBetween(from, to, " ");
};
