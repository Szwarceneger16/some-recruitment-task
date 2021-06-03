import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { Route, useParams, useRouteMatch } from "react-router-dom";
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

function MainPage(): ReactElement {
  const params = useParams() as myUrlParams;
  // console.log(params);
  const classes: MainStyles = useStyles();

  return (
    <div className={classes.root}>
      {/* MainPage 1:{params.inCurrency} 2:{params.outCurrency} */}
      <Typography variant="h6" className={classes.label}>
        Konwerter walut
      </Typography>
      <FormLayout classes={classes} />
    </div>
  );
}

function FormLayout({ classes }: { classes: MainStyles }): ReactElement {
  const {
    control,
    handleSubmit,
    formState: { errors },
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

  console.log(control.fieldsRef.current["inCurrencyType"]?._f.value);
  useEffect(() => {}, [control.fieldsRef.current["inCurrencyType"]?._f.value]);

  const onSubmit = (data: IFormInput) => console.log("submit", data);

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
          <SwapHorizIcon />
          <CurrencyTypeField
            classes={classes}
            control={control}
            data={currencyTypes}
            placeholder="do"
            name="outCurrencyType"
          />
        </div>

        <Button variant="outlined"> Konwertuj</Button>
      </div>
    </form>
  );
}

const _API_KEY = "315d28fc0699e3be74db";
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
