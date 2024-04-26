/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { Theme, jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { IconButton, useTheme } from "@mui/material";
import { Editor } from "@tiptap/react";
import { useState, MouseEvent, useCallback, useMemo } from "react";

import { useToggle } from "../../../../hooks/useToggle";
import {
  showTextEditorToolbarMenu,
  textEditorIAFeatureOptions
} from "../../../../utils/textEditor.utils";
import { IEditorToolbar } from "../../../../types/app.type";
import Tabs from "../../../Tabs";
import AIButton from "./AIButton";
import TableMenuDialog from "./TableMenuDialog";
import LinkDialog from "./LinkDialog";
import HeadingMenu from "./HeadingMenu";
import ColorPicker from "./ColorPicker";
import YoutubeDialog from "./YoutubeDialog";

const classes = {
  menu: (theme: Theme) => ({
    border: "1px solid " + theme.palette.grey[100],
    flex: 1,
    alignSelf: "stretch",
    width: "100%"
  }),
  button: (isActive: boolean, split: boolean) => (theme: Theme) => ({
    borderRadius: 0,
    border: "none",
    borderRight: split ? `1px solid ${theme.palette.grey[100]}` : "none",
    cursor: "pointer",
    height: 24,
    width: 24,
    padding: 18,
    backgroundColor: isActive ? theme.palette.primary.light : "#fff",
    "&.Mui-disabled": {
      opacity: 0.4
    }
  }),
  splittedBorder: (theme: Theme) => {
    const borderColor = theme.palette.grey[100];
    return {
      borderRight: "1px solid " + borderColor
    };
  },
  tabsContainer: {
    height: "auto",
    borderBottom: "none"
  },
  tabs: (theme: Theme) =>
    css({
      "& .MuiTabs-flexContainer": {
        gap: 8,
        paddingLeft: 16,
        paddingRight: 16
      },
      backgroundColor: theme.palette.primary.light,
      borderRadius: 0,
      paddingLeft: 0,
      paddingRight: 0,
      height: 48
    }),
  tab: (theme: Theme) =>
    css({
      color: theme.palette.grey[800],
      backgroundColor: "#fff",
      fontSize: 14,
      lineHeight: 1,
      minHeight: "initial",
      flex: "none !important",
      padding: "9px 12px"
    })
};

type Props = {
  editor: Editor;
  className: string;
  selectedIAFeature: string;
  onSelectIAFeature: (feature: string) => void;
  enableAI?: boolean;
  toolbar?: IEditorToolbar[];
  openAIOptions?: boolean;
};

const MenuBar = ({
  editor,
  selectedIAFeature,
  onSelectIAFeature,
  className,
  enableAI,
  toolbar,
  openAIOptions
}: Props) => {
  const theme = useTheme();

  const { open: openIAFeatures, toggle: toggleIAFeatures } = useToggle();
  const { open: openLinkDialog, toggle: toggleLinkDialog } = useToggle();
  const { open: openYoutubeDialog, toggle: toggleYoutubeDialog } = useToggle();
  const [tableAnchorEl, setTableAnchorEl] = useState<null | HTMLElement>(null);
  const [headingAnchorEl, setHeadingAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleOpenTableMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setTableAnchorEl(event.currentTarget);
  }, []);

  const handleCloseTableMenu = () => {
    setTableAnchorEl(null);
  };

  const handleOpenHeadingMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setHeadingAnchorEl(event.currentTarget);
    },
    []
  );

  const handleCloseHeadingMenu = () => {
    setHeadingAnchorEl(null);
  };

  const handleSelectTab = (tab: string) => {
    onSelectIAFeature(tab);
    toggleIAFeatures();
  };

  const menus = useMemo(
    () => [
      {
        name: "heading",
        icon: "title",
        onClick: handleOpenHeadingMenu,
        isActive:
          editor.isActive("heading", { level: 1 }) ||
          editor.isActive("heading", { level: 2 }) ||
          editor.isActive("heading", { level: 3 }) ||
          editor.isActive("heading", { level: 4 }) ||
          editor.isActive("heading", { level: 5 }) ||
          editor.isActive("heading", { level: 6 }),
        disabled: false,
        split: true
      },
      {
        name: "bold",
        onClick: () => editor.chain().focus().toggleBold().run(),
        disabled: !editor.can().chain().focus().toggleBold().run()
      },
      {
        name: "italic",
        onClick: () => editor.chain().focus().toggleItalic().run(),
        disabled: !editor.can().chain().focus().toggleItalic().run()
      },
      {
        name: "strike",
        onClick: () => editor.chain().focus().toggleStrike().run(),
        disabled: !editor.can().chain().focus().toggleStrike().run()
      },
      {
        name: "underline",
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        disabled: !editor.can().chain().focus().toggleUnderline().run()
      },
      {
        name: "link",
        onClick: toggleLinkDialog,
        disabled: false,
        split: true
      },
      // order
      {
        name: "bulletList",
        icon: "bullet-list",
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        disabled: !editor.can().chain().focus().toggleBulletList().run()
      },
      {
        name: "orderedList",
        icon: "ordered-list",
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
        split: true
      },
      // alignment
      {
        name: "align-left",
        icon: "align-left",
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        disabled: false,
        active: { textAlign: "left" },
        group: "align"
      },
      {
        name: "align-center",
        icon: "align-center",
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        disabled: false,
        active: { textAlign: "center" },
        group: "align"
      },
      {
        name: "align-right",
        icon: "align-right",
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        disabled: false,
        active: { textAlign: "right" },
        group: "align"
      },
      {
        name: "align-justify",
        icon: "align-justify",
        onClick: () => editor.chain().focus().setTextAlign("justify").run(),
        disabled: false,
        active: { textAlign: "justify" },
        split: true,
        group: "align"
      },
      {
        name: "blockquote",
        icon: "quote",
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        disabled: false
      },
      {
        name: "codeBlock",
        icon: "code",
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        disabled: false,
        split: true
      },
      {
        name: "table",
        onClick: () => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
        },
        onMouseEnter: (event: MouseEvent<HTMLElement>) => {
          handleOpenTableMenu(event);
        },
        disabled: false,
        split: true
      },
      {
        name: "youtube",
        onClick: toggleYoutubeDialog,
        disabled: false,
        split: true
      },
      {
        name: "undo",
        onClick: () => editor.chain().focus().undo().run(),
        disabled: !editor.can().undo(),
        default: true // always displayed
      },
      {
        name: "redo",
        onClick: () => editor.chain().focus().redo().run(),
        disabled: !editor.can().redo(),
        split: true,
        default: true // always displayed
      }
    ],
    [
      editor,
      toggleLinkDialog,
      toggleYoutubeDialog,
      handleOpenTableMenu,
      handleOpenHeadingMenu
    ]
  );

  return (
    <div className="flexRow flex1 stretchSelf">
      {openIAFeatures && (
        <Tabs
          options={textEditorIAFeatureOptions}
          tab={selectedIAFeature}
          onTabChange={handleSelectTab}
          tabsClassName={classes.tabs(theme)}
          tabClassName={classes.tab(theme)}
          css={classes.tabsContainer}
        />
      )}

      <div className={className} css={classes.menu}>
        {/* ai button */}
        {enableAI && showTextEditorToolbarMenu(toolbar, "ai") && (
          <AIButton onClick={toggleIAFeatures} disabled={!openAIOptions} />
        )}
        {/* other options */}
        {menus.map(
          (menu, index) =>
            showTextEditorToolbarMenu(toolbar, menu) && (
              <IconButton
                key={menu.name + index}
                onClick={menu.onClick}
                onMouseEnter={menu.onMouseEnter}
                disabled={menu.disabled}
                css={classes.button(
                  // the oreder is important
                  editor.isActive(menu.isActive || menu.active || menu.name),
                  menu.split
                )}
              >
                <img
                  alt={menu.name}
                  src={`/icons/${menu.icon || menu.name}.svg`}
                />
              </IconButton>
            )
        )}

        {/* mention */}
        {showTextEditorToolbarMenu(toolbar, "mention") && (
          <IconButton
            onClick={() => {
              editor.chain().focus().insertContent("@").run();
            }}
          >
            <img alt="mention" src="/icons/mention.svg" />
          </IconButton>
        )}

        {/* youtube dialog */}
        {showTextEditorToolbarMenu(toolbar, "link") && (
          <LinkDialog
            editor={editor}
            open={openLinkDialog}
            onClose={toggleLinkDialog}
          />
        )}

        {/* youtube dialog */}
        {showTextEditorToolbarMenu(toolbar, "youtube") && (
          <YoutubeDialog
            editor={editor}
            open={openYoutubeDialog}
            onClose={toggleYoutubeDialog}
          />
        )}

        {/* color picker */}
        {showTextEditorToolbarMenu(toolbar, "color") && (
          <ColorPicker editor={editor} />
        )}

        {/* table menu to be opened */}
        {showTextEditorToolbarMenu(toolbar, "table") && (
          <TableMenuDialog
            editor={editor}
            anchorEl={tableAnchorEl}
            onClose={handleCloseTableMenu}
          />
        )}

        {/* table menu to be opened */}
        {showTextEditorToolbarMenu(toolbar, "heading") && (
          <HeadingMenu
            editor={editor}
            anchorEl={headingAnchorEl}
            onClose={handleCloseHeadingMenu}
          />
        )}
      </div>
    </div>
  );
};

export default MenuBar;
