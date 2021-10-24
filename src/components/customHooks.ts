import { useRouteMatch, useHistory } from 'react-router-dom';

interface NewType {
  isHistoryPageShowed: boolean;
  toggleHistoryPage: any;
}

export function ToggleHistoryPageState(): NewType {
  const { url }: { url: string } = useRouteMatch();
  const history = useHistory();

  const isHistoryPageShowed = url.includes('/history');

  return {
    isHistoryPageShowed,
    toggleHistoryPage: (setViewed: boolean) => {
      if (
        typeof setViewed === 'undefined' ||
        isHistoryPageShowed !== setViewed
      ) {
        history.push(
          isHistoryPageShowed ? url.replace('/history', '') : '/history' + url
        );
      }
    }
  };
}
