import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "src/styles/defualtTheme";
import { BrowserRouter as Router } from "react-router-dom";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
