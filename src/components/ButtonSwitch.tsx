/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { IProjectProductOption } from "../types/app.type";

const classes = {
  switch: (theme: Theme) => ({
    borderRadius: 100,
    border: "1px solid " + theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light
  }),
  icon: (checked: boolean) => (theme: Theme) => ({
    borderRadius: "100%",
    backgroundColor: theme.palette.primary.main,
    height: 34,
    width: 34,
    order: checked ? -1 : 1,
  }),
  button: (theme: Theme) => {
    return {
      borderRadius: 100,
      border: "1px solid " + theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      fontSize: 12,
      lineHeight: 1,
      width: 101,
      minWidth: 0,
      padding: 3,
    };
  },
  right: {
    order: -1,
    transition: 'order 20s ease-in 10s'
  }
};

type Props = {
  onSelect: (value: IProjectProductOption) => void;
  selectedOption: IProjectProductOption;
  options: IProjectProductOption[];
  checked: boolean;
};

const ButtonSwitch = ({ onSelect, selectedOption, options, checked }: Props) => {
  const handleSelect = (selectedOption: IProjectProductOption) => {
    const notSelectProduct = options.find((option: IProjectProductOption) => option.value !== selectedOption.value);
    if (!notSelectProduct) return;
    onSelect(notSelectProduct)
  }
  
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        disableRipple
        variant="text"
        onClick={() => handleSelect(selectedOption)}
        css={classes.button}
        className="flexRow"
      >
        <div className="flexCenter" css={classes.icon(checked)}>
          <img alt="" src="/icons/light-bulb.svg" />
        </div>
        <span className="flexCenter flex1 stretchSelf">
          {selectedOption.label}
        </span>
      </Button>
    </Box>
  );
};

export default ButtonSwitch;
