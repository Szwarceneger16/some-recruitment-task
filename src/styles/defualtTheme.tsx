import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          margin: 0,
          minHeight: "100vh",
          background: "linear-gradient(45deg, #344ceb 10%,#ffffff 60%)",
          "& div#root": {
            display: "flex",
            flexDirection: "row",
            minHeight: "inherit",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        a: {
          textDecoration: "none",
          color: "black",
        },
      },
    },
  },
});
