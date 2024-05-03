/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import TextEditorField from "../components/form/fields/TextEditorField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Form from "../components/form/Form";
import { css } from "@emotion/css";
import Footer from "../components/Footer";
import { getTextEditorInitialUser } from "../utils/textEditor.utils";
import { useTheme } from "@mui/material";

const mentions = [
  { label: "Lea Thompson", value: "xxxx1" },
  { label: "Cyndi Lauper", value: "xxxx2" },
  { label: "Tom Cruise", value: "xxxx3" },
  { label: "Madonna", value: "xxxx4" },
  { label: "Jerry Hall", value: "xxxx5" },
  { label: "Joan Collins", value: "xxxx6" },
  { label: "Winona Ryder", value: "xxxx7" },
  { label: "Christina Applegate", value: "xxxx8" },
  { label: "Alyssa Milano", value: "xxxx9" },
  { label: "Molly Ringwald", value: "xxxx10" },
  { label: "Ally Sheedy", value: "xxxx11" },
  { label: "Debbie Harry", value: "xxxx12" },
  { label: "Olivia Newton-John", value: "xxxx13" },
  { label: "Elton John", value: "xxxx14" },
  { label: "Michael J. Fox", value: "xxxx15" },
  { label: "Axl Rose", value: "xxxx16" },
  { label: "Emilio Estevez", value: "xxxx17" },
  { label: "Ralph Macchio", value: "xxxx18" },
  { label: "Rob Lowe", value: "xxxx19" },
  { label: "Jennifer Grey", value: "xxxx20" },
  { label: "Mickey Rourke", value: "xxxx21" },
  { label: "John Cusack", value: "xxxx22" },
  { label: "Matthew Broderick", value: "xxxx23" },
  { label: "Justine Bateman", value: "xxxx24" },
  { label: "Lisa Bonet", value: "xxxx25" }
];

const classes = {
  textEditorMenu: css({
    bottom: 70
  })
};

export const problemSchema = z.object({
  description: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
});

type IProblemInput = z.infer<typeof problemSchema>;

const Home = () => {
  const theme = useTheme();

  const currentUser = getTextEditorInitialUser(theme); // simulate user from db

  const form = useForm<IProblemInput>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      description: "<p>hello</p>"
    }
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
            className="flexColumn stretchSelf flex1"
            name="description"
            label="Description"
            placeholder="Provide as much information as possible. This field has only one limit, yours."
            mentions={mentions}
            menuClassName={classes.textEditorMenu}
            user={currentUser}
          />
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
