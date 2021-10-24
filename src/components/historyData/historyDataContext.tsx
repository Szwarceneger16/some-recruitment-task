import { createContext } from 'react';
import { IHistoryData, ICurrencyFormFields } from 'shared/globalTypes';

export interface IHistoryDataContext {
  get: () => Array<IHistoryData>;
  push: (data: ICurrencyFormFields) => void;
  clear: () => void;
}

export const HistoryDataContext = createContext<IHistoryDataContext>({
  get: () => {
    return [];
  },
  push: (data: ICurrencyFormFields) => {
    return;
  },
  clear: () => {
    return null;
  }
});
