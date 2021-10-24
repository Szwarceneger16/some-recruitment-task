export interface IApiErrorObject {
  readonly error: string;
  readonly status: number;
}

export interface IHistoryData extends ICurrencyFormFields {
  dateOfConversion: Date;
}

export interface ICurrencyFormFields {
  inCurrencyValue: number;
  outCurrencyValue: number;
  inCurrencyType: string;
  outCurrencyType: string;
}

export interface ICurrencyType {
  currencyName: string;
  currencySymbol: string;
  id: string;
}

export type TCurrencyTypes = Record<string, ICurrencyType>;
