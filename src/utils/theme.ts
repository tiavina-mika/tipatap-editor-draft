import { createTheme, PaletteColor } from "@mui/material";
import { LAYOUT_CONTENT_PADDING_X } from "./constants";
import { generateRandomNumber } from "./utils";

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    semifilled: true;
  }
}

const palette = {
  primary: {
    main: "#3d5af1",
    light: "#e8ebff",
    dark: "#9eadfa",
    contrastText: "#fff"
  },
  error: {
    main: "#ff3b5f",
    light: "#fff2f5",
    dark: "#ff869c",
    contrastText: "#fff"
  },
  warning: {
    main: "#ff8246",
    light: "#fff5e7",
    dark: "#fdb44b",
    contrastText: "#fff"
  },
  info: {
    main: "#3dc4d0",
    light: "#eafcff",
    dark: "#a4e7ed",
    contrastText: "#fff"
  },
  success: {
    main: "#00ed98",
    light: "#dbfff2",
    dark: "#78ffcf",
    contrastText: "#fff"
  },
  grey: {
    50: "#ffffff",
    100: "#f3f3f3",
    300: "#c4c4c4",
    600: "#a0a0a0",
    800: "#303030",
    900: "#1f1f1f"
  }
};

const defaultTypographyStyles = {
  lineHeight: 1,
  fontWeight: 400,
  fontStyle: "normal",
  fontFamily: "Product Sans Regular"
};

export const theme = createTheme({
  palette,
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true
      },
      variants: [
        {
          props: {},
          style: {
            flexWrap: "wrap"
          }
        }
      ]
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          fontStyle: "normal",
          fontSize: 16,
          textTransform: "initial",
          padding: "12px 24px",
          borderRadius: 60,
          border: "none"
        },
        contained: {
          backgroundColor: palette.primary.main,
          color: "white",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)"
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          paddingTop: LAYOUT_CONTENT_PADDING_X,
          paddingBottom: LAYOUT_CONTENT_PADDING_X
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: "Product Sans Bold",
          fontWeight: 700,
          fontSize: 22,
          lineHeight: 1.3,
          letterSpacing: "0.01em",
          color: palette.grey[800],
          padding: 0
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingLeft: LAYOUT_CONTENT_PADDING_X,
          paddingRight: LAYOUT_CONTENT_PADDING_X
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontFamily: "Product Sans Regular",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.5,
          letterSpacing: "0.01em",
          color: palette.grey[600]
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: LAYOUT_CONTENT_PADDING_X,
          paddingRight: LAYOUT_CONTENT_PADDING_X
        }
      }
    }
  },
  typography: {
    fontFamily: [
      "Product Sans Regular",
      "Product Sans Medium",
      "Product Sans Bold",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    body1: {
      ...defaultTypographyStyles,
      fontSize: 12,
      color: palette.grey[600]
    },
    body2: {
      ...defaultTypographyStyles,
      fontSize: 10,
      color: palette.grey[600]
    },
    caption: {
      ...defaultTypographyStyles,
      fontSize: 10,
      color: palette.grey[300]
    }
  }
});

/**
 * get random palette from an array
 */
export const getRandomPalette = (max: number): PaletteColor => {
  const paletteKeys = Object.keys(palette).filter(
    (key: string) => key !== "grey"
  );
  const randomIndex = generateRandomNumber(0, max);
  const selectedPaletteKey = paletteKeys[randomIndex];

  if (!selectedPaletteKey) return palette.info;
  return (palette as any)[selectedPaletteKey];
};
