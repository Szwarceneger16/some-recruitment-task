import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { IHistoryData, ICurrencyFormFields } from 'shared/globalTypes';
import { HistoryDataContext } from 'components/historyData/historyDataContext';

interface IHistoryDataProviderProps {
  loader?: ReactElement;
}

export const HistoryDataProvider: FC<IHistoryDataProviderProps> = ({
  children
}) => {
  const [historyData, setHistoryData] = useState<Array<IHistoryData>>([]);

  useEffect(() => {
    const localData: string | null = localStorage.getItem(
      'currencyConversionHistoryData'
    );

    if (localData) {
      const currencyConversionHistoryData: Array<IHistoryData> = JSON.parse(
        localData,
        function (key: string, value: string) {
          if (key === 'dateOfConversion') return new Date(value);
          return value;
        }
      );
      setHistoryData(currencyConversionHistoryData);
    }
  }, []);

  const get = useCallback((): Array<IHistoryData> => {
    return historyData;
  }, [historyData]);

  const push = useCallback(
    (data: ICurrencyFormFields): void => {
      const newHistoryDataEntity: IHistoryData = {
        ...data,
        dateOfConversion: new Date()
      };

      const newHistoryData: Array<IHistoryData> = [
        newHistoryDataEntity,
        ...historyData
      ];
      setHistoryData(newHistoryData);
      localStorage.setItem(
        'currencyConversionHistoryData',
        JSON.stringify(newHistoryData)
      );
    },
    [historyData]
  );

  const clear = useCallback((): void => {
    setHistoryData([]);
    localStorage.removeItem('currencyConversionHistoryData');
  }, []);

  return (
    <HistoryDataContext.Provider value={{ get, push, clear }}>
      {children}
    </HistoryDataContext.Provider>
  );
};
