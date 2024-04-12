import { Editor } from "@tiptap/react";
import { Menu, MenuItem, Fade } from "@mui/material";

type IOption = {
  label: string;
  action: () => void;
};
const getTableMenus = (editor: Editor): IOption[] => [
  {
    label: "Insert Table",
    action: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()
  },
  {
    label: "Add Column Before",
    action: () => editor.chain().focus().addColumnBefore().run()
  },
  {
    label: "Add Column After",
    action: () => editor.chain().focus().addColumnAfter().run()
  },
  {
    label: "Delete Column",
    action: () => editor.chain().focus().deleteColumn().run()
  },
  {
    label: "Add Row Before",
    action: () => editor.chain().focus().addRowBefore().run()
  },
  {
    label: "Add Row After",
    action: () => editor.chain().focus().addRowAfter().run()
  },
  {
    label: "Delete Row",
    action: () => editor.chain().focus().deleteRow().run()
  },
  {
    label: "Delete Table",
    action: () => editor.chain().focus().deleteTable().run()
  },
  {
    label: "Merge Cells",
    action: () => editor.chain().focus().mergeCells().run()
  },
  {
    label: "Toggle Header Column",
    action: () => editor.chain().focus().toggleHeaderColumn().run()
  },
  {
    label: "Toggle Header Row",
    action: () => editor.chain().focus().toggleHeaderRow().run()
  },
  {
    label: "Toggle Header Cell",
    action: () => editor.chain().focus().toggleHeaderCell().run()
  },
  {
    label: "Merge Or Split",
    action: () => editor.chain().focus().mergeOrSplit().run()
  },
  {
    label: "Set Cell Attribute",
    action: () => editor.chain().focus().setCellAttribute("colspan", 2).run()
  }
];

type Props = {
  editor: Editor;
  className?: string;
  anchorEl: null | HTMLElement;
  onClose: () => void;
};
const TableMenuDialog = ({ editor, anchorEl, onClose }: Props) => {
  const handleClick = (menu: IOption) => {
    menu.action();
    onClose();
  };

  return (
    <Menu
      id="select-table-menu"
      MenuListProps={{
        "aria-labelledby": "select-table-button"
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      TransitionComponent={Fade}
    >
      {getTableMenus(editor).map((menu, index) => (
        <MenuItem value={index} key={index} onClick={() => handleClick(menu)}>
          {menu.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TableMenuDialog;
