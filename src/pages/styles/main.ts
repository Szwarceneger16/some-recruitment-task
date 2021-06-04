import { colors, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
  textField: {
    margin: 1,
    width: "auto",
    "& .MuiAutocomplete-input": {
      minWidth: "35px !important",
    },
    "& .MuiFormLabel-root": {
      fontStyle: "italic",
      fontSize: "0.8rem",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: 15,
      marginTop: 15,
      marginLeft: 10,
      marginRight: 10,
    },
    "& > .currencyTypeSelectors": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    width: "min-content",
    alignSelf: "center",
  },
  buttonWrapperButton: {
    width: "300px",
    color: "red",
  },
  buttonWrapperProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

type MainStyles = ReturnType<typeof useStyles>;

export { useStyles };
export type { MainStyles };
