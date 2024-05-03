import { useEffect } from "react";
import { Theme } from "@emotion/react";

import {
  useEditor,
  AnyExtension,
  EditorOptions,
  mergeAttributes
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapTypography from "@tiptap/extension-typography";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Collaboration from "@tiptap/extension-collaboration";
import Gapcursor from "@tiptap/extension-gapcursor";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import { createLowlight, common } from "lowlight";

import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { ISelectOption, ITextEditorCollaborationUser } from "../types/app.type";
import getSuggestion from "../components/form/inputs/textEditor/mention/suggestion";

const classes = {
  editor: (theme: Theme) => ({
    "& .mention": {
      backgroundColor: theme.palette.grey[200],
      paddingLeft: 6,
      paddingRight: 6,
      paddingBottom: 3,
      borderRadius: 12,
      fontWeight: 300,
      color: "#000",
      fontSize: 12,
      textDecoration: "none"
    },
    " & .collaboration-cursor-name-label": {
      maxWidth: 200,
      borderRadius: 2,
      padding: "4px 5px",
      fontFamily: "Product Sans Regular",
      fontWeight: 300
    }
  }),
  input: (theme: Theme, editable = true) =>
    css({
      borderRadius: 6,
      borderTopLeftRadius: 0,
      border: editable ? "1px solid " + theme.palette.grey[400] : "none",
      paddingLeft: editable ? 16 : 0,
      paddingRight: editable ? 16 : 0,
      minHeight: editable ? 150 : "initial",
      "& p.is-editor-empty:first-child::before": {
        content: "attr(data-placeholder)",
        float: "left",
        height: 0,
        pointerEvents: "none",
        color: theme.palette.grey[300],
        fontFamily: "Product Sans Regular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "157.143%" /* 157.143% */
      }
    })
};

const CustomMention = Mention.extend({
  // use a link (with url) instead of the default span
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(
        { href: `/user/${HTMLAttributes["data-id"]}` },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node
      })
    ];
  },
  // the attribute should be user id for exemple
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id?.value) {
            return {};
          }

          return {
            "data-id": attributes.id.value
          };
        }
      }
    };
  }
});

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  Document,
  Paragraph,
  Text,
  TipTapTypography,
  Underline,
  // SelectedText,
  Link.configure({
    protocols: [
      "https",
      "mailto",
      {
        scheme: "tel",
        optionalSlashes: true
      }
    ],
    HTMLAttributes: {
      // Change rel to different value
      // Allow search engines to follow links(remove nofollow)
      rel: "noopener noreferrer",
      // Remove target entirely so links open in current tab
      target: null
    }
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    codeBlock: false
  }),
  Table.configure({
    resizable: true
  }),
  TableRow,
  TableHeader,
  TableCell,
  Gapcursor,
  Youtube,
  TextAlign.configure({
    types: ["heading", "paragraph"]
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    defaultLanguage: "javascript"
  })
];

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("workspace-04", ydoc);

const CustomCollaborationCursor = CollaborationCursor.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      render: (user: ITextEditorCollaborationUser) => {
        const cursor = document.createElement("div");

        cursor.classList.add("collaboration-cursor-name-container");

        const label = document.createElement("span");

        label.classList.add("collaboration-cursor-name-label");
        label.setAttribute("style", `background-color: ${user.color}`);
        label.insertBefore(document.createTextNode(user.name), null);
        cursor.insertBefore(label, null);

        return cursor;
      }
    };
  }
});

export type UseTextEditorInputProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  mentions?: ISelectOption[];
  user?: ISelectOption;
  tab: "editor" | "preview";
} & Partial<EditorOptions>;

export const useTextEditor = ({
  placeholder,
  onChange,
  value,
  mentions,
  tab,
  user,
  editable = true,
  ...editorOptions
}: UseTextEditorInputProps) => {
  const theme = useTheme();

  const editor = useEditor({
    content: value,
    extensions: [
      Placeholder.configure({
        placeholder
      }),
      CustomMention.configure({
        HTMLAttributes: {
          class: "mention"
        },
        renderLabel({ options, node }) {
          return `${options.suggestion.char}${
            node.attrs.label ?? node.attrs.id.label
          }`;
        },
        suggestion: getSuggestion(mentions)
      }),
      // colaboration
      CustomCollaborationCursor.configure({
        provider,
        user
      }),
      Collaboration.configure({
        document: ydoc
      }),
      ...extensions
    ] as AnyExtension[],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    ...editorOptions
  });

  // set initial value for edition even if it's already set (below)
  useEffect(() => {
    if (!(editor && value)) return;
    editor.commands.setContent(value);
    // !important: to avoid update for each taping, the value should be excluded from the dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  /**
   * change the editable state of the editor on the fly
   * for every tab change
   */
  useEffect(() => {
    // preview tab or not editable
    if (!editable) {
      editor?.setOptions({
        editable: false,
        editorProps: {
          attributes: {
            class: classes.input(theme, false)
          }
        }
      });
      return;
    }

    // editor tab
    editor?.setOptions({
      editable: tab === "editor",
      editorProps: {
        attributes: {
          class: classes.input(theme, tab === "editor")
        }
      }
    });
  }, [editor, tab, editable, theme]);

  return editor;
};
