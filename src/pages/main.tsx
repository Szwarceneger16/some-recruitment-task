import {
  Button,
  CircularProgress,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { Route, useHistory, useParams, useRouteMatch } from "react-router-dom";
import {
  CurrencyType,
  CurrencyTypes,
  IFormInput,
  myUrlParams,
  schema,
} from "src/myTypes";
import { MainStyles, useStyles } from "./styles/main";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CurrencyTypeField,
  CurrencyValueField,
} from "src/components/formFields";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import {
  HistoryDataManager,
  ToggleHistoryPageState,
} from "src/components/customHooks";
import { Alert } from "@material-ui/lab";

function MainPage({
  historyStateManager,
}: {
  historyStateManager: HistoryDataManager;
}): ReactElement {
  const params = useParams() as myUrlParams;
  const classes: MainStyles = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>Konwerter walut</Typography>
      <FormLayout historyStateManager={historyStateManager} classes={classes} />
    </div>
  );
}

function FormLayout({
  historyStateManager,
  classes,
}: {
  historyStateManager: HistoryDataManager;
  classes: MainStyles;
}): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const showErrorAlert = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      inCurrencyValue: "",
      outCurrencyValue: "",
      inCurrencyType: "",
      outCurrencyType: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const currencyTypes = GetCurrencyTypes();

  useEffect(() => {}, [control.fieldsRef.current["inCurrencyType"]?._f.value]);

  const onSubmit = (data: IFormInput) => {
    if (data.inCurrencyValue === "") return false;
    return GetExchangeRate(data.inCurrencyType, data.outCurrencyType)
      .then((rate) => {
        const outCurrencyValue = (data.inCurrencyValue as number) * rate;
        setValue("outCurrencyValue", outCurrencyValue, { shouldDirty: true });

        historyStateManager.push({ ...data, outCurrencyValue });
        history.push("/history");
      })
      .catch((e) => showErrorAlert());
  };

  const swapCurrencyTypes = () => {
    const CurrencyTypeIn =
      control.fieldsRef.current["inCurrencyType"]?._f.value;
    const CurrencyTypeOut =
      control.fieldsRef.current["outCurrencyType"]?._f.value;

    setValue("inCurrencyType", CurrencyTypeOut, { shouldDirty: true });
    setValue("outCurrencyType", CurrencyTypeIn, { shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <CurrencyValueField
        classes={classes}
        control={control}
        name="inCurrencyValue"
        adormentFieldName="inCurrencyType"
        placeholder="Wpisz kwote"
      />
      <CurrencyValueField
        classes={classes}
        control={control}
        name="outCurrencyValue"
        disabled
        adormentFieldName="outCurrencyType"
        placeholder="Konwertuj do"
      />
      <div className={"currencyTypeSelectors"}>
        <CurrencyTypeField
          classes={classes}
          control={control}
          data={currencyTypes}
          placeholder="z"
          name="inCurrencyType"
        />
        <div onClick={swapCurrencyTypes}>
          <SwapHorizIcon />
        </div>
        <CurrencyTypeField
          classes={classes}
          control={control}
          data={currencyTypes}
          placeholder="do"
          name="outCurrencyType"
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          type="submit"
          variant="contained"
          className={classes.buttonWrapperButton}
        >
          Konwertuj
        </Button>
        {isSubmitting && (
          <CircularProgress
            size={24}
            className={classes.buttonWrapperProgress}
          />
        )}
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Nie udało wykonać się żadanej operacji
        </Alert>
      </Snackbar>
    </form>
  );
}

const _API_KEY = "315d28fc0699e3be74db";

function GetExchangeRate(inCurrencyType: string, outCurrencyType: string) {
  return fetch(
    "https://free.currconv.com/api/v7/convert?apiKey=" +
      _API_KEY +
      "&q=" +
      inCurrencyType +
      "_" +
      outCurrencyType +
      "&compact=y"
  )
    .then((res) => res.json())
    .then((res) => res[inCurrencyType + "_" + outCurrencyType].val)
    .catch(() => {});
}

function GetCurrencyTypes() {
  const [currencyTypes, setCurrencyTypes] = useState<CurrencyTypes>({});

  useEffect(() => {
    fetch("https://free.currconv.com/api/v7/currencies?apiKey=" + _API_KEY)
      .then((res) => res.json())
      .then((res) => setCurrencyTypes(res.results))
      .catch(() => setCurrencyTypes({}));
  }, []);

  return currencyTypes;
}

export { MainPage };

//   const { toggleHistoryPage } = ToggleHistoryPageState();
