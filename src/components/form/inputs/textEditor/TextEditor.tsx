/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import {
  useEditor,
  // FloatingMenu,
  // BubbleMenu,
  EditorContent,
  EditorOptions,
  mergeAttributes
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
import getSuggestion from "./mention/suggestion";
import { ISelectOption } from "../../../../types/app.type";
import { LAYOUT_CONTENT_PADDING_X } from "../../../../utils/constants";

const classes = {
  editorRoot: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      paddingBottom: 90
    }
  }),
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
  }),
  menu: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      position: "absolute" as const,
      bottom: 0,
      left: -LAYOUT_CONTENT_PADDING_X,
      maxWidth: `calc(100vw + ${LAYOUT_CONTENT_PADDING_X * 2}px)`
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
  Link.configure({
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
    }
  })
];

export type TextEditorProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  mentions?: ISelectOption[];
  menuClassName?: string;
} & Partial<EditorOptions>;

const TextEditor = ({
  placeholder,
  label,
  error,
  onChange,
  className,
  value,
  mentions,
  menuClassName,
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
    <div
      className={cx("positionRelative flexColumn", className)}
      css={classes.editorRoot}
    >
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
      {editor && (
        <div
          css={classes.menu}
          className={cx("positionAbsolute", menuClassName)}
        >
          <MenuBar editor={editor} className="stretchSelf" />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
