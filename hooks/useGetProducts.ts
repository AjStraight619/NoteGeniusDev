import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export const useGetProduct = (id: string) => {
  const { data, error } = useSWR(`/api/fetch-note?id=${id}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
