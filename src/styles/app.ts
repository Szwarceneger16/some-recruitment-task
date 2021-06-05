import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    height: "inherit",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    minHeight: "inherit",
    justifyContent: "center",
    alignItems: "center",
  },
}));
