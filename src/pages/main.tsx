import {
  Button,
  CircularProgress,
  InputAdornment,
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

function MainPage({
  historyStateManager,
}: {
  historyStateManager: HistoryDataManager;
}): ReactElement {
  const params = useParams() as myUrlParams;
  // console.log(params);
  const classes: MainStyles = useStyles();

  return (
    <div className={classes.root}>
      {/* MainPage 1:{params.inCurrency} 2:{params.outCurrency} */}
      <Typography variant="h6" className={classes.label}>
        Konwerter walut
      </Typography>
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
  const { toggleHistoryPage } = ToggleHistoryPageState();

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
    return GetExchangeRate(data.inCurrencyType, data.outCurrencyType).then(
      (rate) => {
        const outCurrencyValue = (data.inCurrencyValue as number) * rate;
        setValue("outCurrencyValue", outCurrencyValue, { shouldDirty: true });

        historyStateManager.push({ ...data, outCurrencyValue });

        toggleHistoryPage();
      }
    );
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.form}>
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
      </div>
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

// const currencyTypesArray: Array<CurrencyType> = useMemo(
//   (): Array<CurrencyType> =>
//     Object.entries(currencyTypes).map(([key, value]) => value),
//   [currencyTypes]
// );
// const getSelectedCurrencySymbol: Function = (fieldName: string): string =>
//   (currencyTypes &&
//     control.fieldsRef.current[fieldName]?._f.value &&
//     currencyTypes[control.fieldsRef.current[fieldName]?._f.value]
//       .currencySymbol) ||
//   "";
