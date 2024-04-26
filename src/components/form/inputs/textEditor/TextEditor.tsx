/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme } from "@emotion/react";
import { useState } from "react";
import "./textEditorStyles.scss";

import { EditorContent, EditorOptions } from "@tiptap/react";
import { cx } from "@emotion/css";
import { FormHelperText, Typography } from "@mui/material";

import MenuBar from "./MenuBar";
import { IEditorToolbar, ISelectOption } from "../../../../types/app.type";
import {
  defaultEditorToolbar,
  getTextEditorSelectedText,
  showTextEditorToolbarMenu
} from "../../../../utils/textEditor.utils";
import { useTextEditor } from "../../../../hooks/useTextEditor";

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
  })
};

export type TextEditorProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  mentions?: ISelectOption[];
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
  menuClassName,
  toolbar = defaultEditorToolbar,
  editable = true,
  ...editorOptions
}: TextEditorProps) => {
  const [selectedIAFeature, setSelectedIAFeature] = useState<string>("");
  const editor = useTextEditor({
    placeholder,
    onChange,
    value,
    mentions,
    editable,
    ...editorOptions
  });

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
    <div
      className={cx("positionRelative flexColumn tiptap", className)}
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
      </div>

      {editor && (
        <MenuBar
          editor={editor}
          onSelectIAFeature={handleSelectIAFeature(editor)}
          selectedIAFeature={selectedIAFeature}
          className="stretchSelf flexRow"
          enableIA={!!getTextEditorSelectedText(editor)}
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
  );
};

export default TextEditor;
