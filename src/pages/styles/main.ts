import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid grey",
    boxShadow: "0px 0px 5px grey",
    borderRadius: "10px",
    width: "400px",
    height: "400px",
    margin: 4,
    padding: 8,
    zIndex: 100,
  }, // a style rule
  label: {}, // a nested style rule
});
