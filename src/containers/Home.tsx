/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import TextEditorField from "../components/form/fields/TextEditorField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Form from "../components/form/Form";

export const problemSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
});

type IProblemInput = z.infer<typeof problemSchema>;

const Home = () => {
  const form = useForm<IProblemInput>({
    resolver: zodResolver(problemSchema)
  });

  const { handleSubmit } = form;

  const onSubmitHandler = (values: IProblemInput) => {
    console.log("values", values);
  };

  return (
    <div css={{ minHeight: "100vh" }} className="flexColumn">
      <div className="flexColumn stretchSelf flex1" css={{ padding: 12 }}>
        <Form
          form={form}
          onSubmit={handleSubmit(onSubmitHandler)}
          primaryButtonText="Save"
          buttonFullWidth
          contentClassName="flexColumn flex1"
        >
          <TextEditorField
            className="flexColumn spaceBetween stretchSelf flex1"
            name="description"
            label="Description"
            placeholder="Provide as much information as possible. This field has only one limit, yours."
          />
        </Form>
      </div>
    </div>
  );
};

export default Home;
