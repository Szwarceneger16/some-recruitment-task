import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { TCurrencyTypes, IApiErrorObject } from 'shared/globalTypes';

interface IApiCurrencyTypes {
  results: TCurrencyTypes;
}

export const useCurrencyTypesQuery = (
  options?: Omit<
    UseQueryOptions<TCurrencyTypes, IApiErrorObject>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TCurrencyTypes, IApiErrorObject> => {
  return useQuery('/getCurrencyTypes', () => getCurrencyTypes(), options);
};

async function getCurrencyTypes(): Promise<TCurrencyTypes | never> {
  const data: IApiCurrencyTypes = await (
    await fetch(
      'https://free.currconv.com/api/v7/currencies?apiKey=' +
        process.env.REACT_APP_CURRCONV_API_KEY
    )
  ).json();

  return data.results;
}
