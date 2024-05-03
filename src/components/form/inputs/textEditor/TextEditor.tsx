/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme } from "@emotion/react";
import { useState, SyntheticEvent } from "react";

import { EditorContent, EditorOptions } from "@tiptap/react";
import { cx } from "@emotion/css";
import { FormHelperText, Typography, Tab, Tabs } from "@mui/material";

import MenuBar from "./MenuBar";
import { IEditorToolbar, ISelectOption } from "../../../../types/app.type";
import {
  defaultEditorToolbar,
  getTextEditorSelectedText,
  showTextEditorToolbarMenu
} from "../../../../utils/textEditor.utils";
import { useTextEditor } from "../../../../hooks/useTextEditor";

import "./textEditorStyles.scss";

const classes = {
  editorRoot: (theme: Theme) => ({
    [theme.breakpoints.down("md")]: {
      paddingBottom: 90
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
  tabs: {
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent"
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "transparent"
    }
  },
  tab: (theme: Theme) => ({
    textTransform: "none" as const,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&.Mui-selected": {
      color: "#000",
      backgroundColor: "#ededed",
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)"
    }
  })
};

/**
 * future feature
 * TODO: add this as a props
 */
const enableAI = true;

export type TextEditorProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  mentions?: ISelectOption[];
  user?: ISelectOption;
  menuClassName?: string;
  toolbar?: IEditorToolbar[];
} & Partial<EditorOptions>;

const TextEditor = ({
  placeholder,
  label,
  error,
  onChange,
  className,
  value,
  mentions,
  user,
  menuClassName,
  toolbar = defaultEditorToolbar,
  editable = true,
  ...editorOptions
}: TextEditorProps) => {
  const [selectedIAFeature, setSelectedIAFeature] = useState<string>("");
  const [tab, setTab] = useState<"editor" | "preview">("editor");

  const editor = useTextEditor({
    placeholder,
    onChange,
    value,
    mentions,
    editable,
    tab,
    ...editorOptions
  });

  const handleTabChange = (_: SyntheticEvent, value: "editor" | "preview") =>
    setTab(value);

  if (!editable) {
    return <EditorContent editor={editor} className={className} />;
  }

  /**
   * change the select text in edito if a feature is selected
   * @param editor
   */
  const handleSelectIAFeature = (editor: Editor) => (feature: string) => {
    setSelectedIAFeature(feature);
    const node = getTextEditorSelectedText(editor);
    if (!node) return;
    if (feature === "complete" && node.text === "hello") {
      editor.chain().focus().insertContent("cool").run();
    }

    // set the cursor after the selected text
    editor.commands.setTextSelection(node.to);
  };

  return (
    <div>
      {/* ----------- tabs ----------- */}
      {label && <Typography css={classes.label}>{label}</Typography>}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />
        }}
        css={classes.tabs}
      >
        <Tab css={classes.tab} label="Editor" value="editor" />
        <Tab css={classes.tab} label="Preview" value="preview" />
      </Tabs>
      {tab === "editor" ? (
        <div
          className={cx("positionRelative flexColumn tiptap", className)}
          css={classes.editorRoot}
        >
          <div className="positionRelative stretchSelf">
            {/* {editor && <FloatingMenu>This is the floating menu</FloatingMenu>}
              {editor && <BubbleMenu>This is the bubble menu</BubbleMenu>} */}
            <EditorContent editor={editor} css={classes.editor} />
          </div>

          {editor && (
            <MenuBar
              editor={editor}
              onSelectIAFeature={handleSelectIAFeature(editor)}
              selectedIAFeature={selectedIAFeature}
              className="stretchSelf flexRow"
              enableAI={enableAI}
              openAIOptions={!!getTextEditorSelectedText(editor)}
              toolbar={toolbar}
            />
          )}
          {/* error */}
          {error && (
            <FormHelperText error css={{ paddingTop: 4, paddingBottom: 4 }}>
              {error}
            </FormHelperText>
          )}
          {/* number of user online */}
          {editor && showTextEditorToolbarMenu(toolbar, "mention") && (
            <div css={{ paddingTop: 6, padddingBottom: 6 }}>
              <Typography variant="body1">
                {editor.storage.collaborationCursor?.users.length} user
                {editor.storage.collaborationCursor?.users.length === 1
                  ? ""
                  : "s"}{" "}
                online
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <EditorContent editor={editor} className={className} />
      )}
    </div>
  );
};

export default TextEditor;
