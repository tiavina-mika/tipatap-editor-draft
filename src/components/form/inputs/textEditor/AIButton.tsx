/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import { IconButton, IconButtonProps, Typography } from "@mui/material";

const classes = {
  advancedFeaturesButtonContainer: {
    width: 56
  },
  advancedFeaturesButton: (theme: Theme) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: 0,
    paddingLeft: 16,
    paddingRight: 16
  }),
  badge: (theme: Theme) => ({
    backgroundColor: theme.palette.error.dark,
    top: -4,
    borderRadius: 6,
    padding: 6,
    zIndex: 1000
  }),
  defaultBadge: {
    right: -8
  },
  isWrittingBadge: {
    right: -48
  },
  badgeText: {
    color: "#fff",
    fontWeight: 600
  }
};

type Props = {
  isWritting?: boolean;
} & IconButtonProps;

const AIButton = ({ isWritting, ...props }: Props) => {
  return (
    <div
      css={classes.advancedFeaturesButtonContainer}
      className="flexCenter positionRelative"
    >
      <IconButton css={classes.advancedFeaturesButton} {...props}>
        <img alt="sparkles" src="/icons/sparkles.svg" />
      </IconButton>

      {!props.disabled && (
        <div
          css={[
            classes.badge,
            isWritting ? classes.isWrittingBadge : classes.defaultBadge
          ]}
          className="positionAbsolute"
        >
          <Typography css={classes.badgeText}>
            {isWritting ? "Writting..." : "AI"}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default AIButton;
