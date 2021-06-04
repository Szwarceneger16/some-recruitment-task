import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { ReactChild, ReactElement, useEffect, useState } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { HistoryStyles, HistoryStylesProps, useStyles } from "./styles/history";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { HistoryData, myUrlParams } from "src/myTypes";
import {
  HistoryDataManager,
  ToggleHistoryPageState,
} from "src/components/customHooks";

export function HistoryPage({
  historyStateManager,
}: {
  historyStateManager: HistoryDataManager;
}): ReactElement {
  const { isHistoryPageShowed, toggleHistoryPage } = ToggleHistoryPageState();
  const stylesProps: HistoryStylesProps = { isOpen: isHistoryPageShowed };
  const classes = useStyles(stylesProps) as HistoryStyles;

  useEffect(() => {}, [historyStateManager.get()]);

  return (
    // <Link
    //   to={stylesProps.isOpen ? url.replace("/history", "") : "/history" + url}
    // >
    <div className={classes.root} onClick={() => toggleHistoryPage()}>
      {stylesProps.isOpen && (
        <HistoryDataTable classes={classes} data={historyStateManager.get()} />
      )}
      <HistoryHeading classes={classes} isOpened={stylesProps.isOpen} />
    </div>
    // </Link>
  );
}

function HistoryDataTable({
  classes,
  data,
}: {
  classes: HistoryStyles;
  data: Array<HistoryData>;
}): ReactElement {
  return (
    <div className={classes.historyContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "50%" }}>Data Konwersji</TableCell>
              <TableCell style={{ width: "20%" }} align="center">
                Przed
              </TableCell>
              <TableCell style={{ width: "10%" }} align="center"></TableCell>
              <TableCell style={{ width: "20%" }} align="center">
                Po
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: HistoryData) => (
              <TableRow
                key={
                  row.dateOfConversion.toString() +
                  row.inCurrencyValue.toString() +
                  row.inCurrencyType.toString()
                }
              >
                <TableCell
                  style={{ width: "50%" }}
                  /* component="th" */ scope="row"
                >
                  {row.dateOfConversion
                    .toISOString()
                    .replace("T", " ")
                    .replace(/.\d\d\dZ/, "")}
                </TableCell>
                <TableCell style={{ width: "20%" }} align="center">
                  {(row.inCurrencyValue as number).toFixed(2) +
                    " " +
                    row.inCurrencyType}
                </TableCell>
                <TableCell style={{ width: "5%" }} align="center">
                  <ArrowRightAltIcon />
                </TableCell>
                <TableCell style={{ width: "20%" }} align="center">
                  {(row.outCurrencyValue as number).toFixed(2) +
                    " " +
                    row.outCurrencyType}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
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
