import { Editor } from "@tiptap/react";
import { DOMSerializer } from "prosemirror-model";
import { ISelectOption } from "../types/app.type";

export const textEditorIAFeatureOptions: ISelectOption[] = [
  {
    label: "Complete",
    value: "complete"
  },
  {
    label: "Shorten",
    value: "shorten"
  },
  {
    label: "Extend",
    value: "extend"
  },
  {
    label: "Rephrase",
    value: "rephrase"
  },
  {
    label: "Summarize",
    value: "summarize"
  },
  {
    label: "Simplify",
    value: "simplify"
  },
  {
    label: "Spelling & Grammar",
    value: "spelling"
  },
  {
    label: "Emojify",
    value: "emojify"
  },
  {
    label: "Emojify",
    value: "emojify"
  },
  {
    label: "Tone of voice",
    value: "toneOfVoice"
  },
  {
    label: "Translate",
    value: "translate"
  }
];

type OutputType = {
  text: string;
  from: number;
  to: number;
};

/**
 * retrieve the selected text with it position
 * @param editor
 * @param returnType
 */
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
