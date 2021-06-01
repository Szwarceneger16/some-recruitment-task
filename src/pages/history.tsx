import { Button, Typography } from "@material-ui/core";
import { ReactChild, ReactElement, useState } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { HistoryStyles, HistoryStylesProps, useStyles } from "./styles/history";
import CloseIcon from "@material-ui/icons/Close";
import { myUrlParams } from "src/myTypes";

export function HistoryPage(): ReactElement {
  console.log(useRouteMatch());
  const { params, url }: { params: myUrlParams; url: string } = useRouteMatch();
  console.log(url);
  const stylesProps: HistoryStylesProps = { isOpen: url.includes("/history") };

  const classes = useStyles(stylesProps) as HistoryStyles;

  return (
    <Link
      to={stylesProps.isOpen ? url.replace("/history", "") : "/history" + url}
    >
      <div className={classes.root}>
        {stylesProps.isOpen && <HistoryContent classes={classes} />}
        <HistoryHeading classes={classes} isOpened={stylesProps.isOpen} />
      </div>
    </Link>
  );
}

function HistoryContent({ classes }: { classes: HistoryStyles }): ReactElement {
  return <div className={classes.historyContainer}>a</div>;
}

function HistoryHeading({
  classes,
  isOpened,
}: {
  classes: HistoryStyles;
  isOpened: boolean;
}): ReactElement {
  return (
    <div className={classes.labelWrapper}>
      {isOpened ? <CloseIcon /> : null}
      <Typography variant="h6" className={classes.label}>
        HistoryPage
      </Typography>
    </div>
  );
}
