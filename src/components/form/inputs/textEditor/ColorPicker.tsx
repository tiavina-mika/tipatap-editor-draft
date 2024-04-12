/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Editor } from "@tiptap/react";

import { Stack, Typography } from "@mui/material";

const classes = {
  color: {
    WebkitAppearance: "none" as const,
    MozAppearance: "none" as const,
    appearance: "none" as const,
    width: 32,
    height: 32,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    "&::-webkit-color-swatch": {
      borderRadius: 4,
      border: "none"
    },
    "&::-moz-color-swatch": {
      borderRadius: 4,
      border: "none"
    }
  }
};
type Props = {
  editor: Editor;
};
const ColorPicker = ({ editor }: Props) => {
  const handleInput = (event) => {
    editor.chain().focus().setColor(event.target.value).run();
  };

  return (
    <Stack direction="row" alignItems="center" alignSelf="stretch">
      <input
        type="color"
        onInput={handleInput}
        value={editor.getAttributes("textStyle").color}
        css={classes.color}
      />
      <Typography>
        {editor.getAttributes("textStyle").color || "#000"}
      </Typography>
    </Stack>
  );
};

export default ColorPicker;
