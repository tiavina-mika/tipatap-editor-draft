/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { IconButton, useTheme } from "@mui/material";
import { Editor } from "@tiptap/react";
import LinkButton from "./LinkButton";
import { useToggle } from "../../../../hooks/useToggle";
import Tabs from "../../../Tabs";
import { textEditorIAFeatureOptions } from "../../../../utils/textEditor.utils";
import AIButton from "./AIButton";

const classes = {
  menu: (theme: Theme) => ({
    border: "1px solid " + theme.palette.grey[100],
    borderLeft: "none" // because of sparkles button background
  }),
  button: (isActive: boolean) => (theme: Theme) => ({
    borderRadius: 0,
    border: "none",
    cursor: "pointer",
    height: 24,
    width: 24,
    padding: 18,
    backgroundColor: isActive ? theme.palette.primary.light : "#fff"
  }),
  bordered: (theme: Theme) => {
    const borderColor = theme.palette.grey[100];
    return {
      borderRight: "1px solid " + borderColor,
      borderLeft: "1px solid " + borderColor
    };
  },
  tabsContainer: {
    height: "auto",
    borderBottom: "none"
  },
  tabsContent: css({
    // maxWidth: "100vw"
  }),
  tabs: (theme: Theme) =>
    css({
      "& .MuiTabs-flexContainer": {
        gap: 8,
        paddingLeft: 16,
        paddingRight: 16
      },
      backgroundColor: theme.palette.primary.light,
      borderRadius: 0,
      paddingLeft: 0,
      paddingRight: 0,
      height: 48
    }),
  tab: (theme: Theme) =>
    css({
      color: theme.palette.grey[800],
      backgroundColor: "#fff",
      fontSize: 14,
      lineHeight: 1,
      minHeight: "initial",
      flex: "none !important",
      padding: "9px 12px"
    })
};

type Props = {
  editor: Editor;
  className: string;
  selectedIAFeature: string;
  onSelectIAFeature: (feature: string) => void;
  enableIA?: boolean;
};

const MenuBar = ({
  editor,
  selectedIAFeature,
  onSelectIAFeature,
  className,
  enableIA
}: Props) => {
  const theme = useTheme();

  const { open: openIAFeatures, toggle: toggleIAFeatures } = useToggle();

  const handleSelectTab = (tab: string) => {
    onSelectIAFeature(tab);
    toggleIAFeatures();
  };

  const menus = [
    {
      name: "bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run()
    },
    {
      name: "italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run()
    },
    {
      name: "strike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run()
    },
    {
      name: "underline",
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run()
    },
    {
      name: "bulletList",
      icon: "bullet-list",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: !editor.can().chain().focus().toggleBulletList().run()
    }
  ];

  return (
    <div>
      {openIAFeatures && (
        <Tabs
          options={textEditorIAFeatureOptions}
          tab={selectedIAFeature}
          onTabChange={handleSelectTab}
          tabsClassName={classes.tabs(theme)}
          tabClassName={classes.tab(theme)}
          css={classes.tabsContainer}
          tabsContainerClassName={classes.tabsContent}
        />
      )}

      <div className={className} css={classes.menu}>
        <AIButton
          onClick={toggleIAFeatures}
          disabled={!enableIA}
          // isWriting
        />
        {menus.map((menu, index) => (
          <IconButton
            key={menu.name + index}
            onClick={menu.onClick}
            disabled={menu.disabled}
            css={classes.button(editor.isActive(menu.name))}
          >
            <img alt={menu.name} src={`/icons/${menu.icon || menu.name}.svg`} />
          </IconButton>
        ))}

        <LinkButton
          editor={editor}
          css={[classes.button(editor.isActive("link")), classes.bordered]}
        />
        <IconButton
          onClick={() => {
            editor.chain().focus().insertContent("@").run();
          }}
        >
          <img alt="mention" src="/icons/mention.svg" />
        </IconButton>
        {/* 
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        >
          h4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
        >
          h5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
        >
          h6
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
          }
        >
          purple
        </button> */}
      </div>
    </div>
  );
};

export default MenuBar;
