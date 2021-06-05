import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          background: "linear-gradient(45deg, #2196f3 10%,#ffffff 60%)",
          "& div#root": {
            minHeight: "inherit",
          },
        },
        a: {
          textDecoration: "none",
          color: "black",
        },
        ".MuiAutocomplete-option": {
          fontSize: "1rem",
        },
      },
    },
  },
});
