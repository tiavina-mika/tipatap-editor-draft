import { Editor } from "@tiptap/react";
import { useState } from "react";
import {
  Select,
  MenuItem,
} from "@mui/material";

const getTableMenus = ({ editor }: any) => [
  {
    // id: 1,
    name: "Insert Table",
    action: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run()
  },
  {
    // id: 2,
    name: "Add Column Before",
    action: () => editor.chain().focus().addColumnBefore().run()
  },
  {
    // id: 3,
    name: "Add Column After",
    action: () => editor.chain().focus().addColumnAfter().run()
  },
  {
    // id: 4,
    name: "Delete Column",
    action: () => editor.chain().focus().deleteColumn().run()
  },
  {
    // id: 5,
    name: "Add Row Before",
    action: () => editor.chain().focus().addRowBefore().run()
  },
  {
    // id: 6,
    name: "Add Row After",
    action: () => editor.chain().focus().addRowAfter().run()
  },
  {
    // id: 7,
    name: "Delete Row",
    action: () => editor.chain().focus().deleteRow().run()
  },
  {
    // id: 8,
    name: "Delete Table",
    action: () => editor.chain().focus().deleteTable().run()
  },
  {
    // id: 9,
    name: "Merge Cells",
    action: () => editor.chain().focus().mergeCells().run()
  },
  {
    // id: 11,
    name: "Toggle Header Column",
    action: () => editor.chain().focus().toggleHeaderColumn().run()
  },
  {
    // id: 12,
    name: "Toggle Header Row",
    action: () => editor.chain().focus().toggleHeaderRow().run()
  },
  {
    // id: 13,
    name: "Toggle Header Cell",
    action: () => editor.chain().focus().toggleHeaderCell().run()
  },
  {
    // id: 14,
    name: "Merge Or Split",
    action: () => editor.chain().focus().mergeOrSplit().run()
  },
  {
    // id: 15,
    name: "Set Cell Attribute",
    action: () => editor.chain().focus().setCellAttribute("colspan", 2).run()
  }
];

type Props = {
  editor: Editor;
  className?: string;
};
const TableButton = ({ editor, className }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectIndex = (value) => {
    setSelectedIndex(value);
    const currentOption = getTableMenus(editor).find((_, index) => index === value);
    if (!currentOption) return;
    currentOption.action();
  };

  return (
    <Select
      labelId="table-button-label-id"
      id="table-button"
      value={selectedIndex}
      onChange={handleSelectIndex}
      // label="Age"
    >
      {getTableMenus(editor).map((menu, index) => (
        <MenuItem value={index} key={index}>{menu.name}</MenuItem>
      ))}
    </Select>
  );
}

export default TableButton;