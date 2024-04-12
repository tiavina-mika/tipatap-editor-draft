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
  open: boolean;
  onClose: () => void;
};
const LinkDialog = ({ editor, open, onClose }: Props) => {
  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!editor) {
    return null;
  }

  const handleChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLink(value);
  };

  const handleConfirm = () => {
    const validation = linkSchemaField.safeParse(link);
    if (!validation.success) {
      setError("Lien invalide");
      return;
    }

    // cancelled
    if (link === null) {
      return;
    }

    // empty
    if (link === "") {
      (editor.commands as any).unsetLink();
      return;
    }

    // update link
    (editor.commands as any).setLink({ href: link });
    setError("");
    setLink("");
    onClose();
  };

  const handleCancel = () => {
    (editor.commands as any).unsetLink();
    setError("");
    setLink("");
    onClose();
  };

  return (
    <Fragment>
      {/* <IconButton onClick={onClose} className={className}>
        <img alt="link" src="/icons/link.svg" />
      </IconButton> */}
      <Dialog
        open={open}
        onClose={onClose}
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

export default LinkDialog;
