/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
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
      <Dialog
        open={openLinkDialog}
        onClose={toggleLinkDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>Cool</DialogContent>
        <DialogActions>
          <Button onClick={toggleLinkDialog}>Disagree</Button>
          <Button onClick={toggleLinkDialog} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LinkButton;
