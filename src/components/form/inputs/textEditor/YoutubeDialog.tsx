/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Stack
} from "@mui/material";
import { Editor } from "@tiptap/react";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

const youtubeSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number()
});

type YoutubeInput = z.infer<typeof youtubeSchema>;

const initialValues = {
  url: "",
  width: 640,
  height: 480
};

type Props = {
  editor: Editor;
  open: boolean;
  onClose: () => void;
};
const YoutubeDialog = ({ editor, open, onClose }: Props) => {
  const [values, setValues] = useState<YoutubeInput>(initialValues);
  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues(
      (prev: YoutubeInput): YoutubeInput => ({
        ...prev,
        [event.target.name]: event.target.value
      })
    );
  };

  const handleClose = () => {
    onClose();
    setValues(initialValues);
    setErrors(null);
  };

  if (!editor) {
    return null;
  }

  const handleConfirm = () => {
    const result = youtubeSchema.safeParse(values);
    if (!result.success) {
      const errorsResult = JSON.parse((result as any).error?.message);
      errorsResult.forEach((error) => {
        setErrors((prev) => ({
          ...prev,
          [error.validation]: error.message
        }));
      });
      return;
    }

    if (!values.url) return;
    editor.commands.setYoutubeVideo({
      src: values.url,
      width: Math.max(320, values.width),
      height: Math.max(180, values.height)
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            name="url"
            label="Lien"
            variant="standard"
            type="url"
            fullWidth
            onChange={handleChange}
            value={values.url}
            error={!!errors?.url}
            helperText={errors?.url}
          />
          <TextField
            name="width"
            label="Width"
            variant="standard"
            type="number"
            fullWidth
            onChange={handleChange}
            value={values.width}
            error={!!errors?.width}
            helperText={errors?.width}
          />
          <TextField
            name="height"
            label="Height"
            variant="standard"
            type="number"
            fullWidth
            onChange={handleChange}
            value={values.height}
            error={!!errors?.height}
            helperText={errors?.height}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleConfirm} variant="contained" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default YoutubeDialog;
