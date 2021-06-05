import { makeStyles } from "@material-ui/core";

export interface HistoryStylesProps {
  isOpen: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    border: "1px solid grey",
    boxShadow: "0px 0px 5px grey",
    borderRadius: "10px",
    width: (props: HistoryStylesProps): string => {
      return props.isOpen ? "400px" : "70px";
    },
    height: "400px",
    [theme.breakpoints.up("md")]: {
      width: (props: HistoryStylesProps): string => {
        return props.isOpen ? "500px" : "70px";
      },
      height: "500px",
    },
    margin: 4,
    padding: 8,
    paddingLeft: 30,
    transform: "translateX(-30px)",
    [theme.breakpoints.down("sm")]: {
      transform: "translateY(-30px)",
      paddingTop: "30px",
    },
    display: "flex",
    flexDirection: "row",
  }, // a style rule
  label: {
    textOrientation: "sideways",
    writingMode: "vertical-rl",
    fontSize: "1.4rem",
    fontFamily: "'Lora', serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.8rem",
    },
  },
  labelSmaller: {
    fontSize: "0.8rem",
    fontFamily: "'Lora', serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1rem",
    },
    textDecoration: "und",
  },
  labelSmallerWrapper: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.common.white,
    "&:hover": {
      cursor: "pointer",
    },
    "& .MuiSvgIcon-root": {
      margin: "auto",
      display: "block",
    },
  },
  labelWrapper: {
    color: theme.palette.common.white,
    width: "min-content",
    "&:hover": {
      cursor: "pointer",
    },
    "& .MuiSvgIcon-root": {
      margin: "auto",
      display: "block",
    },
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
  },
  historyContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100%",
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 1,
    padding: 1,
    "& .MuiPaper-root": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  },
  table: {
    border: "1px solid white",
    backgroundColor: "rgba(0, 0, 0, 0)",
    "& .MuiTableCell-body,.MuiTableCell-head": {
      color: theme.palette.common.white,
    },

    // minWidth: 650,
  },
}));

type HistoryStyles = ReturnType<typeof useStyles>;

export { useStyles };
export type { HistoryStyles };
