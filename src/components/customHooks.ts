import { ContactsOutlined } from "@material-ui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { HistoryData, IFormInput, myUrlParams } from "src/myTypes";

export function ToggleHistoryPageState() {
  const { url }: { url: string } = useRouteMatch();
  const history = useHistory();

  const isHistoryPageShowed = url.includes("/history");

  return {
    isHistoryPageShowed,
    toggleHistoryPage: (setViewed?: boolean): void => {
      if (
        typeof setViewed === "undefined" ||
        isHistoryPageShowed !== setViewed
      ) {
        history.push(
          isHistoryPageShowed ? url.replace("/history", "") : "/history" + url
        );
      }
    },
  };
}

export function UseHistoryDataManager() {
  const [historyData, setHistoryData] = useState<Array<HistoryData>>([]);

  useEffect(() => {
    const localData: string | null = localStorage.getItem(
      "currencyConversionHistoryData"
    );

    if (localData) {
      const currencyConversionHistoryData: Array<HistoryData> = JSON!.parse(
        localData,
        function (key: string, value: string) {
          if (key === "dateOfConversion") return new Date(value);
          return value;
        }
      );
      setHistoryData(currencyConversionHistoryData);
    }

    // window.addEventListener("beforeunload", () => {
    //   debugger;
    //   const actualHistoryData = get();

    // });
  }, []);

  const get = useCallback((): Array<HistoryData> => {
    return historyData;
  }, [historyData]);

  const push = useCallback(
    (data: IFormInput): void => {
      const newHistoryDataEntity: HistoryData = {
        ...data,
        dateOfConversion: new Date(),
      };

      const newHistoryData: Array<HistoryData> = [
        ...historyData,
        newHistoryDataEntity,
      ];
      setHistoryData(newHistoryData);
      localStorage.setItem(
        "currencyConversionHistoryData",
        JSON.stringify(newHistoryData)
      );
    },
    [historyData]
  );

  const clear = useCallback((): void => {
    setHistoryData([]);
  }, []);

  return { get, push, clear };
}

type HistoryDataManager = ReturnType<typeof UseHistoryDataManager>;

export type { HistoryDataManager };
