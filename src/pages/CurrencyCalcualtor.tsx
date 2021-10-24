import { FC, useContext, useState } from 'react';
import { Stack, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { FormProvider, useForm } from 'react-hook-form';
import { Snackbar, Alert } from '@mui/material';
import { ICurrencyFormFields, TCurrencyTypes } from 'shared/globalTypes';
import {
  RootStyle,
  Heading,
  CustomStyledButton,
  MainFormButtonsWrapper,
  CurrencyTypesWrapper,
  SubHeading
} from 'styles/CurrencyCalcualtorStyles';
import { CurrencyValueInput } from 'components/formFields/CurrencyValueInput';
import { CurrencyTypeInput } from 'components/formFields/CurrencyTypeInput';
import { HistoryDataContext } from 'components/historyData/historyDataContext';
import { FormLayoutWrapper } from 'styles/app';
import { CurrencyValueResult } from 'components/formFields/CurrencyValueResult';
import { getExchangeRate } from 'api/currencyExchangeRate';
import { useCurrencyTypesQuery } from 'api/currencyTypes';
import { schema } from 'shared/currencyFormYupShema';
import { dictionary } from 'dictionary';

const { currencyCalculatorDict } = dictionary;

type ICurrencyExchangeFormProps =
  | {
      currencyTypes: TCurrencyTypes;
      errorCallback: () => void;
      submitCallback: (data: ICurrencyFormFields) => void;
      disabled?: false;
      disabledMessage?: never;
    }
  | {
      currencyTypes?: never;
      errorCallback?: never;
      submitCallback?: never;
      disabled: true;
      disabledMessage: string;
    };

export const CurrencyCalcualtor: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: currencyTypesData, status } = useCurrencyTypesQuery();

  const historyDataContext = useContext(HistoryDataContext);

  const showErrorAlert = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <RootStyle>
      <Heading>{currencyCalculatorDict.mainHeading}</Heading>
      <FormLayoutWrapper>
        {status === 'loading' && (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress />
          </Stack>
        )}
        {status === 'error' && (
          <SubHeading>
            {currencyCalculatorDict.currencyTypesLoadingError}
          </SubHeading>
        )}
        {status === 'success' && currencyTypesData && (
          <CurrencyExchangeForm
            currencyTypes={currencyTypesData}
            errorCallback={showErrorAlert}
            submitCallback={(data: ICurrencyFormFields) =>
              historyDataContext.push(data)
            }
          />
        )}
      </FormLayoutWrapper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {currencyCalculatorDict.conversionError}
        </Alert>
      </Snackbar>
    </RootStyle>
  );
};

const CurrencyExchangeForm: FC<ICurrencyExchangeFormProps> = ({
  currencyTypes = {},
  errorCallback,
  submitCallback,
  disabled
}) => {
  const methods = useForm<ICurrencyFormFields>({
    defaultValues: {
      inCurrencyValue: 0,
      outCurrencyValue: 0,
      inCurrencyType: '',
      outCurrencyType: ''
    },
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues
  } = methods;

  const onSubmit = (data: ICurrencyFormFields) => {
    if (!data.inCurrencyValue) return false;
    getExchangeRate({
      inCurrencyType: data.inCurrencyType,
      outCurrencyType: data.outCurrencyType
    })
      .then((rate) => {
        const outCurrencyValue = data.inCurrencyValue * rate;
        setValue('outCurrencyValue', outCurrencyValue, { shouldDirty: false });

        submitCallback && submitCallback({ ...data, outCurrencyValue });
      })
      .catch(() => errorCallback && errorCallback());
  };

  const swapCurrencyTypes = () => {
    const CurrencyTypeIn = getValues('inCurrencyType');
    const CurrencyTypeOut = getValues('outCurrencyType');

    setValue('inCurrencyType', CurrencyTypeOut, { shouldDirty: true });
    setValue('outCurrencyType', CurrencyTypeIn, { shouldDirty: true });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CurrencyValueInput
          name="inCurrencyValue"
          adormentFieldName="inCurrencyType"
          placeholder="Wpisz kwote"
          fullWidth
          disabled={disabled}
        />
        <CurrencyTypesWrapper>
          <CurrencyTypeInput
            autoComplete={true}
            autoSelect={true}
            data={currencyTypes}
            placeholder="z"
            name="inCurrencyType"
            disabled={disabled}
          />
          <div onClick={swapCurrencyTypes}>
            <SwapHorizIcon />
          </div>
          <CurrencyTypeInput
            autoComplete={true}
            autoSelect={true}
            data={currencyTypes}
            placeholder="do"
            name="outCurrencyType"
            disabled={disabled}
          />
        </CurrencyTypesWrapper>
        <MainFormButtonsWrapper>
          <CustomStyledButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {currencyCalculatorDict.convertButton}
          </CustomStyledButton>
        </MainFormButtonsWrapper>
        <CurrencyValueResult
          name="outCurrencyValue"
          disabled
          adormentFieldName="outCurrencyType"
          placeholder="Wynik"
        />
      </form>
    </FormProvider>
  );
};
