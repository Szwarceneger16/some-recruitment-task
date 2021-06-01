import { ReactElement } from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";
import { myUrlParams } from "src/myTypes";
import { useStyles } from "./styles/main";

function MainPage(): ReactElement {
  const params = useParams() as myUrlParams;
  console.log(params);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      MainPage 1:{params.inCurrency} 2:{params.outCurrency}
    </div>
  );
}

export { MainPage };
