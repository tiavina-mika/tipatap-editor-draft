import { Editor } from "@tiptap/react";
import { DOMSerializer } from "prosemirror-model";
import { Theme } from "@emotion/react";

import {
  IEditorToolbar,
  ISelectOption,
  ITextEditorCollaborationUser
} from "../types/app.type";

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

const names = [
  "Tiavina Michael Ralainirina",
  "Tanteraka Mario",
  "Miora Sarobidy Razainirina",
  "Koloina",
  "Tatiana Maria",
  "Tojo Heritiana",
  "Jean Paul Valiha",
  "Tafita",
  "Manitra Raz",
  "Jean Rolland",
  "Ally Sheedy",
  "Debbie Harry",
  "Olivia Newton-John",
  "Elton John",
  "Michael J. Fox",
  "Axl Rose",
  "Emilio Estevez",
  "Ralph Macchio",
  "Rob Lowe",
  "Jennifer Grey",
  "Mickey Rourke",
  "John Cusack",
  "Matthew Broderick",
  "Justine Bateman",
  "Lisa Bonet"
];

const getRandomElement = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

const getRandomName = () => getRandomElement(names);

export const getTextEditorInitialUser = (
  theme: Theme
): ITextEditorCollaborationUser => {
  const colors = [
    theme.palette.primary.main,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.info.main,
    theme.palette.warning.main
  ];

  return {
    name: getRandomName(),
    color: getRandomElement(colors)
  };
};

export const defaultEditorToolbar: IEditorToolbar[] = [
  "heading",
  "bold",
  "italic",
  "strike",
  "link",
  "underline",
  "image",
  "code",
  "orderedList",
  "bulletList",
  "align",
  "codeBlock",
  "blockquote",
  "table",
  "history",
  "youtube",
  "color",
  "mention",
  "ai"
];

// menus to display
export const showTextEditorToolbarMenu = (
  toolbar: IEditorToolbar[],
  menu
): boolean => {
  return !!toolbar?.find((t: IEditorToolbar) => {
    if (typeof menu === "string") {
      return t === menu;
    }
    if (menu.default) return true;
    // if group is defined, otherwise check the name
    return menu.group ? menu.group === t : menu.name === t;
  });
};
