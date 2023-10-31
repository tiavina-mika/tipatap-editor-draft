/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton
} from "@mui/material";
import { Editor } from "@tiptap/react";
import { Fragment, useState } from "react";
import LinkForm from "./LinkForm";

const formId = "link-dialog";

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

  const handleConfirm = (url: string) => {
    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.commands.unsetLink();
      return;
    }

    // update link
    editor.commands.setLink({ href: url });
    toggleLinkDialog();
  };

  const handleCancel = () => {
    editor.commands.unsetLink();
    toggleLinkDialog();
  };

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
        <DialogContent>
          <LinkForm onSubmit={handleConfirm} formId={formId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button variant="contained" form={formId} autoFocus type="submit">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LinkButton;
