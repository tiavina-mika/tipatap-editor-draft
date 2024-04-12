import { Editor } from "@tiptap/react";
import { Menu, MenuItem, Fade } from "@mui/material";

const options = [
  {
    value: 1,
    label: "H1"
  },
  {
    value: 2,
    label: "H2"
  },
  {
    value: 3,
    label: "H3"
  },
  {
    value: 4,
    label: "H3"
  },
  {
    value: 5,
    label: "H3"
  }
];

type Props = {
  editor: Editor;
  anchorEl: null | HTMLElement;
  onClose: () => void;
};
const HeadingMenu = ({ editor, anchorEl, onClose }: Props) => {
  const handleSelectHeading = (heading: number) => {
    editor.chain().focus().toggleHeading({ level: heading }).run();
    onClose();
  };

  return (
    <Menu
      id="select-heading-menu"
      MenuListProps={{
        "aria-labelledby": "select-heading-button"
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      TransitionComponent={Fade}
    >
      {options.map((option, index) => (
        <MenuItem
          key={index}
          onClick={() => handleSelectHeading(option.value)}
          css={{
            backgroundColor: editor.isActive("heading", { level: option.value })
              ? "gray"
              : "transparent"
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HeadingMenu;
