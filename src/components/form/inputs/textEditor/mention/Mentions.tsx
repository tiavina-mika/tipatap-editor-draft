/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

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
const Mentions = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
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
      {props.items.length ? (
        props.items.map((item, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              onClick={() => selectItem(index)}
              className={`item ${index === selectedIndex ? "is-selected" : ""}`}
            >
              <ListItemText primary={item} css={classes.item} />
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
