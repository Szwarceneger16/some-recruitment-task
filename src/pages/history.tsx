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

export function HistoryPage(): ReactElement {
  const { params, url }: { params: myUrlParams; url: string } = useRouteMatch();
  const stylesProps: HistoryStylesProps = { isOpen: url.includes("/history") };
  const classes = useStyles(stylesProps) as HistoryStyles;
  const historyStateManager = LocalStorageHistoryData();

  return (
    <Link
      to={stylesProps.isOpen ? url.replace("/history", "") : "/history" + url}
    >
      <div className={classes.root}>
        {stylesProps.isOpen && (
          <HistoryDataTable
            classes={classes}
            data={historyStateManager.get()}
          />
        )}
        <HistoryHeading classes={classes} isOpened={stylesProps.isOpen} />
      </div>
    </Link>
  );
}

function LocalStorageHistoryData() {
  const [historyData, setHistoryData] = useState<Array<HistoryData>>([]);

  useEffect(() => {
    const localData: string | null = localStorage.getItem(
      "currencyConversionHistoryData"
    );

    if (localData) {
      const currencyConversionHistoryData: Array<HistoryData> =
        JSON!.parse(localData);
      setHistoryData(currencyConversionHistoryData);
    }
  }, [historyData]);

  return {
    get: (): Array<HistoryData> => {
      return historyData;
    },
    push: (data: HistoryData): void => {
      const newHistoryData: Array<HistoryData> = [...historyData, data];
      setHistoryData(newHistoryData);
    },
    clear: (): void => {
      setHistoryData([]);
    },
  };
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
              <TableCell>Data Konwersji</TableCell>
              <TableCell align="right">Przed</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Po</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: HistoryData) => (
              <TableRow
                key={
                  row.dateOfConversion.toString() +
                  row.valueBeforeConversion.toString() +
                  row.valueAfterConversion.toString()
                }
              >
                <TableCell component="th" scope="row">
                  {row.dateOfConversion}
                </TableCell>
                <TableCell align="center">
                  {row.valueBeforeConversion}
                </TableCell>
                <TableCell align="center">
                  <ArrowRightAltIcon />
                </TableCell>
                <TableCell align="center">{row.valueAfterConversion}</TableCell>
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
