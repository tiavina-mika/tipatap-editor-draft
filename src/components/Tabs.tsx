/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { cx } from "@emotion/css";
import { Tab, Tabs as MUITabs } from "@mui/material";
import { SyntheticEvent, useEffect, useRef } from "react";

import { ISelectOption } from "../types/app.type";

const LAYOUT_CONTENT_PADDING = 24;

const classes = {
  tabsContainer: (theme: Theme) => ({
    height: "calc(72px - 12px)",
    backgroundColor: "#fff",
    borderBottom: "1px solid " + theme.palette.grey[100]
  }),
  tabsContent: (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
      maxWidth: `calc(100vw - ${LAYOUT_CONTENT_PADDING * 2}px)`
    }
  })
};

type Props = {
  onTabChange: (tab: any) => void;
  tab: any;
  options: ISelectOption[];
  className?: string;
  tabsClassName?: string;
  tabClassName?: string;
  tabsContainerClassName?: string;
  noBackgroundColor?: boolean;
};
const Tabs = ({
  options,
  tab,
  onTabChange,
  className,
  tabsClassName,
  tabClassName,
  tabsContainerClassName,
  noBackgroundColor = false
}: Props) => {
  const currentTabRef = useRef(null);

  useEffect(() => {
    if (!currentTabRef.current) return;
    // the selected tab should always be into the view
    (currentTabRef.current as any)?.scrollIntoView({
      behavior: "auto",
      block: "end"
    });
  }, []);

  const handleTabChange = (_: SyntheticEvent, value: any) => {
    onTabChange(value);
    currentTabRef.current = null;
  };

  return (
    <div className={cx("stretchSelf", className)} css={classes.tabsContainer}>
      <div css={classes.tabsContent} className={tabsContainerClassName}>
        <MUITabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable-setting-tabs"
          className={tabsClassName}
          css={noBackgroundColor ? { backgroundColor: "#fff" } : null}
          TabIndicatorProps={{ sx: { display: "none" } }}
        >
          {options.map((option: ISelectOption, index: number) => (
            <Tab
              key={index}
              label={option.label}
              value={option.value}
              className={cx("flex1", tabClassName)}
              // to get current tab position
              ref={option.value === tab ? currentTabRef : null}
            />
          ))}
        </MUITabs>
      </div>
    </div>
  );
};

export default Tabs;
