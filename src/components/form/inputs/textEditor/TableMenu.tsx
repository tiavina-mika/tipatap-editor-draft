import { Editor } from "@tiptap/react";
import { Menu, MenuItem, Fade } from "@mui/material";

const getTableMenus = (editor: Editor) => [
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
  anchorEl: null | HTMLElement;
  onClose: () => void;
};
const TableMenu = ({ editor, anchorEl, onClose }: Props) => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleClick = (event: MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      {/* <IconButton
        key={menu.name + index}
        onClick={menu.onClick}
        disabled={menu.disabled}
        css={classes.button(
          editor.isActive(menu.active || menu.name),
          menu.split
        )}
      >
        <img alt={menu.name} src={`/icons/${menu.icon || menu.name}.svg`} />
      </IconButton> */}
      <Menu
        id="select-table-menu"
        MenuListProps={{
          "aria-labelledby": "select-table-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        TransitionComponent={Fade}
      >
        {getTableMenus(editor).map((menu, index) => (
          <MenuItem value={index} key={index} onClick={menu.action}>
            {menu.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TableMenu;
