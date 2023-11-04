/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import {
  useEditor,
  // FloatingMenu,
  // BubbleMenu,
  EditorContent,
  EditorOptions
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapTypography from "@tiptap/extension-typography";
import { css, cx } from "@emotion/css";
import { FormHelperText, Typography, useTheme } from "@mui/material";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import MenuBar from "./MenuBar";
import suggestion from "./mention/suggestion";

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
      fontSize: 12
    }
  }),
  input: (theme: Theme, editable = true) =>
    css({
      borderRadius: 6,
      border: editable ? "1px solid " + theme.palette.grey[800] : "none",
      paddingLeft: editable ? 16 : 0,
      paddingRight: editable ? 16 : 0,
      minHeight: 150,
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
    }),
  label: (theme: Theme) => ({
    pointerEvents: "none" as const,
    color: theme.palette.grey[800],
    fontFamily: "Product Sans Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 1,
    backgroundColor: "#fff",
    zIndex: 100,
    padding: "4px 3px",
    marginLeft: 12,
    top: -8
  })
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  Document,
  Paragraph,
  Text,
  TipTapTypography,
  Underline,
  Link.configure({
    HTMLAttributes: {
      // Change rel to different value
      // Allow search engines to follow links(remove nofollow)
      rel: "noopener noreferrer",
      // Remove target entirely so links open in current tab
      target: null
    }
  }),
  Mention.configure({
    HTMLAttributes: {
      class: "mention"
    },
    suggestion
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  })
];

// const content = "<p>Hello World 2!</p>";

export type TextEditorProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
} & Partial<EditorOptions>;

const TextEditor = ({
  placeholder,
  label,
  error,
  onChange,
  className,
  value,
  editable = true,
  ...editorOptions
}: TextEditorProps) => {
  const theme = useTheme();

  const editor = useEditor({
    editable,
    content: value,
    editorProps: {
      attributes: {
        class: classes.input(theme, editable)
      }
    },
    extensions: [
      // StarterKit,
      Placeholder.configure({
        placeholder
      }),
      ...extensions
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    ...editorOptions
  });

  if (!editable) {
    return <EditorContent editor={editor} className={className} />;
  }

  return (
    <div className={cx("flexColumn", className)}>
      <div className="positionRelative stretchSelf">
        {label && (
          <Typography css={classes.label} className="positionAbsolute">
            {label}
          </Typography>
        )}
        {/* {editor && <FloatingMenu>This is the floating menu</FloatingMenu>}
        {editor && <BubbleMenu>This is the bubble menu</BubbleMenu>} */}
        <EditorContent editor={editor} css={classes.editor} />
        {error && (
          <FormHelperText error css={{ paddingTop: 4, paddingBottom: 4 }}>
            {error}
          </FormHelperText>
        )}
      </div>
      {editor && <MenuBar editor={editor} className="stretchSelf" />}
    </div>
  );
};

export default TextEditor;
