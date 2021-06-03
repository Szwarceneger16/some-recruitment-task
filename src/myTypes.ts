import * as yup from "yup";

export interface myUrlParams {
  inCurrency: string;
  outCurrency: string;
}

export interface HistoryData {
  dateOfConversion: Date;
  valueBeforeConversion: number;
  valueAfterConversion: number;
}

export interface IFormInput {
  inCurrencyValue: number | "";
  outCurrencyValue: number | "";
  inCurrencyType: string;
  outCurrencyType: string;
}

export interface CurrencyType {
  currencyName: string;
  currencySymbol: string;
  id: string;
}
export interface CurrencyTypes {
  [key: string]: CurrencyType;
}

const currencyValueSchema = yup
  .number()
  .typeError("Musi byc liczba")
  .positive("Musi byc wieksza od 0");
const currencyTypeSchema = yup.string().required("Waluta jest wymagana");
export const schema = yup.object({
  inCurrencyValue: currencyValueSchema,
  //   outCurrencyValue: currencyValueSchema,
  inCurrencyType: currencyTypeSchema,
  outCurrencyType: currencyTypeSchema,
});
