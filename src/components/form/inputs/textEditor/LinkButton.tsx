/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField
} from "@mui/material";
import { Editor } from "@tiptap/react";
import { ChangeEvent, Fragment, useState } from "react";
import { z } from "zod";

const linkSchemaField = z
  .string()
  .url()
  .min(10, { message: "Must be 10 or more characters long" });

type Props = {
  editor: Editor;
  className?: string;
};
const LinkButton = ({ editor, className }: Props) => {
  const [link, setLink] = useState<string>("");
  const [openLinkDialog, setOpenLinkDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!editor) {
    return null;
  }

  const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLink(value);
  };

  const toggleLinkDialog = () => setOpenLinkDialog(!openLinkDialog);

  const handleConfirm = () => {
    const validation = linkSchemaField.safeParse(link);
    if (!validation.success) {
      setError("Lien invalide");
      return;
    }
    const url = link;
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
    setError("");
    setLink("");
    toggleLinkDialog();
  };

  const handleCancel = () => {
    editor.commands.unsetLink();
    setError("");
    setLink("");
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
          <TextField
            placeholder="Lien"
            variant="standard"
            type="url"
            fullWidth
            onChange={handleChangeLink}
            value={link}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button onClick={handleConfirm} variant="contained" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LinkButton;
