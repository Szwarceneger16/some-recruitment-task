import { TextField, InputAdornment } from "@material-ui/core";
import { ReactElement, useMemo } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { CurrencyType, CurrencyTypes, IFormInput } from "src/myTypes";
import { MainStyles } from "src/pages/styles/main";
import Autocomplete from "@material-ui/lab/Autocomplete";

export function CurrencyValueField({
  classes,
  name,
  adormentFieldName,
  control,
  placeholder,
  disabled = false,
}: {
  classes: MainStyles;
  control: Control<IFormInput>;
  placeholder: string;
  name: keyof IFormInput;
  disabled?: boolean;
  adormentFieldName: keyof IFormInput;
}): ReactElement {
  const firstName = useWatch({
    control,
    name: adormentFieldName,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <TextField
            placeholder={placeholder}
            className={classes.textField}
            fullWidth
            disabled={disabled}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {control.fieldsRef.current[adormentFieldName]?._f.value ?? ""}
                </InputAdornment>
              ),
            }}
            {...field}
            {...fieldState.isTouched}
            helperText={!disabled && (fieldState.error?.message ?? " ")}
          />
        );
      }}
    />
  );
}

export function CurrencyTypeField({
  classes,
  name,
  control,
  data,
  placeholder,
}: {
  classes: MainStyles;
  control: Control<IFormInput>;
  placeholder: string;
  data: CurrencyTypes;
  name: keyof IFormInput;
}): ReactElement {
  const optonsData = useMemo(() => Object.values(data), [data]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete
            id={name}
            fullWidth={false}
            autoComplete={true}
            options={optonsData}
            className={classes.textField}
            value={data[field.value] ?? null}
            onChange={(event: any, newValue: CurrencyType | null): void => {
              field.onChange(newValue?.id ?? "");
            }}
            inputValue={(field.value as string) ?? ""}
            onInputChange={(event: any, newValue: string | null): void => {
              field.onChange(newValue);
            }}
            getOptionLabel={(option: CurrencyType): string => option.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={placeholder}
                variant="outlined"
                helperText={fieldState.error?.message ?? " "}
              />
            )}
          />
        );
      }}
    />
  );
}
