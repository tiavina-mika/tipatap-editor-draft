import { useFormContext, Controller } from "react-hook-form";
import { TextEditorProps } from "../inputs/textEditor/TextEditor";
import TextEditor from "../inputs/textEditor/TextEditor";

type Props = {
  name: string;
} & Omit<TextEditorProps, "onChange">;

const TextEditorField = ({ name, ...inputProps }: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextEditor
          {...field}
          {...inputProps}
          error={(errors as any)[name]?.message}
        />
      )}
    />
  );
};

export default TextEditorField;
