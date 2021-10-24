import * as yup from 'yup';

const currencyValueSchema = yup
  .number()
  .typeError('Musi byc liczba')
  .min(0, 'Musi byc wieksza od 0');

const currencyTypeSchema = yup.string().required('Waluta jest wymagana');

export const schema = yup.object({
  inCurrencyValue: currencyValueSchema,
  outCurrencyValue: currencyValueSchema,
  inCurrencyType: currencyTypeSchema,
  outCurrencyType: currencyTypeSchema
});
