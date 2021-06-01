import { makeStyles } from "@material-ui/core";

export interface HistoryStylesProps {
  isOpen: boolean;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid grey",
    boxShadow: "0px 0px 5px grey",
    borderRadius: "10px",
    width: (props: HistoryStylesProps): string => {
      return props.isOpen ? "400px" : "60px";
    },
    height: "400px",
    margin: 4,
    padding: 8,
    paddingLeft: 30,
    transform: "translateX(-30px)",
    display: "flex",
    flexDirection: "row",
  }, // a style rule
  label: {
    textOrientation: "sideways",
    writingMode: "vertical-rl",
  },
  labelWrapper: {
    width: "min-content",
    "& .MuiSvgIcon-root": {
      margin: "auto",
      display: "block",
    },
  },
  historyContainer: {
    width: "100%",
    height: "100%",
  },
});

type HistoryStyles = ReturnType<typeof useStyles>;

export { useStyles };
export type { HistoryStyles };
