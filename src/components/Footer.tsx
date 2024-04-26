/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Link, Stack, Typography } from "@mui/material";
import { LAYOUT_CONTENT_PADDING_X } from "../utils/constants";
import { Theme } from "@emotion/react";

const links = [
  {
    label: "GitHub",
    url: "https://github.com/tiavina-mika"
  },
  {
    label: "LInkedIn",
    url: "https://www.linkedin.com/in/tiavina-michael-ralainirina/"
  },
  {
    label: "Youtube",
    url: "https://www.youtube.com/channel/UC0CfOprE7AOXQqeFhS2XUIQ"
  }
];

const classes = {
  footer: (theme: Theme) => ({
    borderTop: "1px solid " + theme.palette.grey[200],
    padding: `8px ${LAYOUT_CONTENT_PADDING_X}px`,
    backgroundColor: theme.palette.grey[800]
  })
};

const Footer = () => {
  return (
    <div className="flexRow spaceBetween stretchSelf" css={classes.footer}>
      <Stack spacing={1} direction="row" justifyContent="center">
        {links.map((link, index) => (
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            key={link.label + index}
          >
            <Link
              href={link.url}
              variant="h4"
              css={{ color: "#fff", textDecoration: "underline", fontSize: 14 }}
            >
              {link.label}
            </Link>
            {links.length - 1 !== index && <Typography>|</Typography>}
          </Stack>
        ))}
      </Stack>
      <div className="stretchSelf flexCenter flex1">
        <Typography variant="h4" className="grey100" css={{ fontSize: 14 }}>
          By Tiavina Michael Ralainirina
        </Typography>
      </div>
      <div className="flexCenter stretchSelf">
        <Typography className="flexRow center grey100">
          <span css={{ marginRight: 2 }}>©</span>
          <span>{new Date().getFullYear()}</span>
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
