import { useState, useEffect } from "react";
import { CurrencyTypes } from "src/myTypes";

const _API_KEY = "315d28fc0699e3be74db";

export function GetExchangeRate(
  inCurrencyType: string,
  outCurrencyType: string
) {
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

export function GetCurrencyTypes() {
  const [currencyTypes, setCurrencyTypes] = useState<CurrencyTypes>({});

  useEffect(() => {
    fetch("https://free.currconv.com/api/v7/currencies?apiKey=" + _API_KEY)
      .then((res) => res.json())
      .then((res) => setCurrencyTypes(res.results))
      .catch(() => setCurrencyTypes({}));
  }, []);

  return currencyTypes;
}
