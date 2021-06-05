import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid grey",
    boxShadow: "0px 0px 5px grey",
    borderRadius: "10px",
    width: "400px",
    height: "400px",
    [theme.breakpoints.up("md")]: {
      width: "500px",
      height: "500px",
    },
    margin: 4,
    padding: 8,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
  }, // a style rule
  label: {
    textAlign: "center",
    color: theme.palette.primary.main,
    textShadow: "1px 1px grey",
    fontWeight: "bold",
    fontSize: "1.4rem",
    fontFamily: "'Lora', serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.8rem",
    },
  }, // a nested style rule
  textField: {
    margin: 1,
    padding: 0,
    width: "auto",
    "& .MuiAutocomplete-input": {
      minWidth: "30px !important",
    },
    "& .MuiFormLabel-root": {
      fontStyle: "italic",
      fontSize: "0.8rem",
    },
    "& .MuiInputBase-input": {
      fontStyle: "italic",
      fontSize: "0.8rem",
    },

    [theme.breakpoints.up("sm")]: {
      padding: 1,
      "& .MuiAutocomplete-input": {
        minWidth: "35px !important",
      },
      "& .MuiFormLabel-root": {
        fontStyle: "italic",
        fontSize: "1rem",
      },
      "& .MuiInputBase-input": {
        fontStyle: "italic",
        fontSize: "1rem",
      },
    },
  },
  form: {
    height: "100%",
    display: "flex",
    justifyContent: "center",

    flexDirection: "column",
    "& > *": {
      marginBottom: 10,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
    },
    [theme.breakpoints.up("sm")]: {
      "& > *": {
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
      },
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
    width: "100%",
    // color: theme.palette.primary.main,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  buttonWrapperProgress: {
    color: theme.palette.primary.dark,
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
