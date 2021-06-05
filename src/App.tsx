import React from "react";
import { MainPage, HistoryPage } from "src/pages";
import { Switch, Route } from "react-router-dom";
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
        <Route path="/history">
          <MainPage historyStateManager={historyStateManager} />
          <HistoryPage
            isHistoryPageShowed={true}
            historyStateManager={historyStateManager}
          />
        </Route>
        {/*  */}
        <Route path="/">
          <MainPage historyStateManager={historyStateManager} />
          <HistoryPage
            isHistoryPageShowed={false}
            historyStateManager={historyStateManager}
          />
        </Route>
      </Switch>
    </div>
  );
}

/* <Route path="/:inCurrency?/:outCurrency?">
<Route path="/history/:inCurrency?/:outCurrency?"> */

export default App;
