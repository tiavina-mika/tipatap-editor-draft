/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import TextEditor from "../components/inputs/textEditor/TextEditor";

const Home = () => {
  return (
    <div>
      <div css={{ paddingLeft: 12, paddingRight: 12 }}>
        <TextEditor
          label="Description"
          placeholder="Provide as much information as possible. This field has only one limit, yours."
        />
      </div>
    </div>
  );
};

export default Home;
