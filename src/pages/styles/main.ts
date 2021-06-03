import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
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
});

type MainStyles = ReturnType<typeof useStyles>;

export { useStyles };
export type { MainStyles };
