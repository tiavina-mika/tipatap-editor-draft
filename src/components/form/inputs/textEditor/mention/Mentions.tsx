/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ReactRendererOptions } from "@tiptap/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { IUserMention } from "../../../../../types/user.type";
import { ISelectOption } from "../../../../../types/app.type";

const classes = {
  list: (theme: Theme) => ({
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative" as const,
    overflow: "auto",
    maxHeight: 300,
    "& ul": { padding: 0 }
  }),
  item: (theme: Theme) => ({
    "& .MuiTypography-root": {
      color: theme.palette.grey[800]
    }
  })
};
type Props = {
  items: ISelectOption[];
  command: any;
} & ReactRendererOptions;
const Mentions = forwardRef<any, Props>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = items[index];

    if (item) {
      command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [items]);

  useImperativeHandle(ref, (): {
    onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean;
  } => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }): boolean => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    }
  }));

  return (
    <List css={classes.list}>
      {items.length ? (
        items.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              onClick={() => selectItem(index)}
              className={`item ${index === selectedIndex ? "is-selected" : ""}`}
            >
              <ListItemText primary={item.label} css={classes.item} />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="No results" />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
});

export default Mentions;
