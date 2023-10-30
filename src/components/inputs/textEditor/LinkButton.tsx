/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { IconButton } from "@mui/material";
import { Editor } from "@tiptap/react";
import { Fragment, useState } from "react";

type Props = {
  editor: Editor;
  className?: string;
};
const LinkButton = ({ editor, className }: Props) => {
  const [openLinkDialog, setOpenLinkDialog] = useState<boolean>(false);

  if (!editor) {
    return null;
  }

  const toggleLinkDialog = () => setOpenLinkDialog(!openLinkDialog);

  return (
    <Fragment>
      <IconButton onClick={toggleLinkDialog} className={className}>
        <img alt="link" src="/icons/link.svg" />
      </IconButton>
    </Fragment>
  );
};

export default LinkButton;
