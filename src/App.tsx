import React, { ReactChild, ReactChildren, ReactElement } from "react";
import { MainPage, HistoryPage } from "src/pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  HistoryDataManager,
  UseHistoryDataManager,
} from "./components/customHooks";
import { useStyles } from "./styles/app";

function App(): React.ReactElement {
  const historyStateManager: HistoryDataManager = UseHistoryDataManager();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/history/:inCurrency?/:outCurrency?">
          <MainPage historyStateManager={historyStateManager} />
          <HistoryPage historyStateManager={historyStateManager} />
        </Route>
        {/*  */}
        <Route path="/:inCurrency?/:outCurrency?">
          <MainPage historyStateManager={historyStateManager} />
          <HistoryPage historyStateManager={historyStateManager} />
        </Route>
      </Switch>
    </div>
  );
}

// function SelectCurrencyWrapper({ children }: { children: ReactElement }) {
//   let { path, url } = useRouteMatch();

//   console.log("path", path);
//   console.log("url", url);
//   console.log(`${path === "/" ? "" : url}/:inCurrency?/:outCurrency?`);

//   return (
//     <Switch>
//       <Route path={`${url}/:inCurrency?/:outCurrency?`}>{children}</Route>
//     </Switch>
//   );
// }

export default App;
