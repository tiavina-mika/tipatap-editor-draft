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

const mainColors = ["success", "info", "warning", "error"];

const defaultTypographyStyles = {
  lineHeight: 1,
  fontWeight: 400,
  fontStyle: "normal",
  fontFamily: "Product Sans Regular"
};

const titleTypographyStyles = {
  ...defaultTypographyStyles,
  color: palette.grey[800]
};

export const theme = createTheme({
  palette,
  components: {
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: "flex",
          alignItems: "center",
          minHeight: 40,
          backgroundColor: theme.palette.grey[100],
          borderRadius: 100,
          paddingLeft: 3,
          paddingRight: 3
        })
      }
    },
    MuiTab: {
      defaultProps: {
        // useFlexGap: true
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 100,
          minHeight: 32,
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1,
          textTransform: "initial",
          color: theme.palette.grey[600],
          letterSpacing: 0.12,
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: "#fff"
          }
        })
      }
    },
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
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 100,
          paddingLeft: 8,
          paddingRight: 8,
          // outline
          ...(ownerState.variant === "outlined" && {
            borderColor: theme.palette.grey[100]
          }),
          // label style for outline and default color
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "default" && {
              "& .MuiChip-label": {
                color: theme.palette.grey[800]
              }
            }),
          // custom semifilled variant
          ...(ownerState.variant === "semifilled" &&
            ownerState.color &&
            mainColors.includes(ownerState.color) && {
              backgroundColor: ((theme.palette as any)[
                ownerState.color as any
              ] as any).light,
              color: ((theme.palette as any)[ownerState.color as any] as any)
                .main
            }),
          // label style if there is an icon
          "& .MuiChip-label": {
            paddingLeft: ownerState.icon ? 8 : 0,
            paddingRight: ownerState.icon ? 8 : 0
          }
        }),
        label: {
          fontSize: 12,
          fontWeight: 400,
          lineHeight: 1.5
        }
      },
      variants: [
        {
          // custom variants
          props: { variant: "semifilled" },
          style: {}
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
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          background: "#00A368",
          boxShadow: "0px 0px 8px rgba(31, 31, 31, 0.05)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center"
        },
        message: {
          color: palette.success.light,
          fontSize: 12,
          lineHeight: 1,
          fontWeight: 400
        },
        icon: {
          color: palette.success.light
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
    h1: {
      ...titleTypographyStyles,
      fontSize: 32,
      fontWeight: 500
    },
    h2: {
      ...titleTypographyStyles,
      fontSize: 22,
      lineHeight: 1.3,
      letterSpacing: "0.01em"
    },
    h3: {
      ...titleTypographyStyles,
      fontSize: 14,
      fontWeight: 700
    },
    h4: {
      ...titleTypographyStyles,
      fontSize: 14,
      lineHeight: 1.5
    },
    h5: {
      ...titleTypographyStyles,
      fontSize: 12
    },
    h6: {
      ...titleTypographyStyles,
      fontSize: 10
    },
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
