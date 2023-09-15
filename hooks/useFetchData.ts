import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

// this custom hook will fetch data for all of my current data

export const useFetchData = (
  item: 'Folder' | 'Note' | 'RefinedNote' | null,
  id: string
) => {
  let route = '';

  switch (item) {
    case 'Folder':
      route = `/api/fetch-folder?id=${id}`;
      break;
    case 'Note':
      route = `/api/fetch-note?id=${id}`;
      break;
    case 'RefinedNote':
      route = `/api/fetch-refined-note?id=${id}`;
      break;
    default:
      console.warn('Undefined or unexpected item type:', item);
      // You could return an error, null, or some default behavior here
      break;
  }

  // If the route is empty, SWR won't make the fetch call
  const { data, error } = useSWR(route || null, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
