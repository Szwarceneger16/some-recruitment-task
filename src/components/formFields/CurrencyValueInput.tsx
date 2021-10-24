import { ReactElement } from 'react';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';
import { Controller, useWatch } from 'react-hook-form';

interface IProps<T> extends Omit<TextFieldProps, 'name'> {
  name: Extract<keyof T, string>;
  adormentFieldName: Extract<keyof T, string>;
}

export function CurrencyValueInput<T>({
  name,
  adormentFieldName,
  ...rest
}: IProps<T>): ReactElement {
  const adormentFieldValue = useWatch({
    name: adormentFieldName
  });

  return (
    <Controller
      name={name}
      rules={{ required: rest.disabled }}
      render={({ field, fieldState }) => {
        return (
          <TextField
            {...rest}
            InputProps={{
              readOnly: rest.disabled,
              endAdornment: (
                <InputAdornment position="end">
                  {adormentFieldValue}
                </InputAdornment>
              )
            }}
            {...field}
            helperText={fieldState.error?.message ?? ' '}
          />
        );
      }}
    />
  );
}
