import { ReactElement, useMemo } from 'react';
import { TextField, Autocomplete, AutocompleteProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import { ICurrencyType, TCurrencyTypes } from 'shared/globalTypes';

interface IProps<T>
  extends Omit<
    AutocompleteProps<ICurrencyType, undefined, undefined, undefined>,
    | 'name'
    | 'options'
    | 'value'
    | 'onChange'
    | 'inputValue'
    | 'onInputChange'
    | 'getOptionLabel'
    | 'renderInput'
  > {
  placeholder: string;
  data: TCurrencyTypes;
  name: Extract<keyof T, string>;
}

export function CurrencyTypeInput<T>({
  name,
  data,
  placeholder,
  ...rest
}: IProps<T>): ReactElement {
  const optonsData = useMemo(() => data && Object.values(data), [data]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete<ICurrencyType, undefined, undefined, undefined>
            {...rest}
            options={optonsData}
            value={data[field.value] ?? null}
            onChange={(
              _event: unknown,
              newValue: ICurrencyType | null
            ): void => {
              field.onChange(newValue?.id ?? '');
            }}
            inputValue={(field.value as string) ?? ''}
            onInputChange={(_event: unknown, newValue: string | null): void => {
              field.onChange(newValue);
            }}
            getOptionLabel={(option: ICurrencyType): string => option.id}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label={placeholder}
                variant="outlined"
                helperText={fieldState.error?.message ?? ' '}
              />
            )}
          />
        );
      }}
    />
  );
}
