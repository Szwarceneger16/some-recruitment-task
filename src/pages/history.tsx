import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
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
    <div className={classes.root}>
      {stylesProps.isOpen && (
        <HistoryDataTable
          classes={classes}
          data={historyStateManager.get()}
          clearCallback={() => historyStateManager.clear()}
        />
      )}
      <HistoryHeadings
        classes={classes}
        isOpened={isHistoryPageShowed}
        toggleHistoryPageCallback={() => toggleHistoryPage()}
      />
    </div>
    // </Link>
  );
}

function HistoryDataTable({
  classes,
  data,
  clearCallback,
}: {
  classes: HistoryStyles;
  clearCallback: VoidFunction;

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
      <div className={classes.labelSmallerWrapper} onClick={clearCallback}>
        <Typography className={classes.labelSmaller}>
          Wyczysc Historie
        </Typography>
      </div>
    </div>
  );
}

function HistoryHeadings({
  classes,
  isOpened,

  toggleHistoryPageCallback,
}: {
  classes: HistoryStyles;
  isOpened: boolean;
  toggleHistoryPageCallback: VoidFunction;
}): ReactElement {
  return (
    <div className={classes.labelContainer}>
      <div className={classes.labelWrapper} onClick={toggleHistoryPageCallback}>
        {isOpened ? <CloseIcon /> : null}
        <Typography className={classes.label}>Historia</Typography>
      </div>
    </div>
  );
}
