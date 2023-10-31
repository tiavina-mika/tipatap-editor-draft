import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const linkSchema = z.object({
  link: z
    .string()
    .url()
    .min(2, { message: "Must be 2 or more characters long" })
});

export type ILinkInput = z.infer<typeof linkSchema>;

type Props = {
  onSubmit: (value: string) => void;
  formId: string;
};

const LinkForm = ({ onSubmit, formId }: Props) => {
  const form = useForm<ILinkInput>({
    resolver: zodResolver(linkSchema)
  });

  const { handleSubmit, register } = form;

  const onSubmitHandler = (values: ILinkInput) => {
    onSubmit(values.link);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flexColumn stretchSelf flex1"
    >
      <TextField
        placeholder="Lien"
        variant="standard"
        type="url"
        fullWidth
        {...register("link")}
      />
    </form>
  );
};

export default LinkForm;
