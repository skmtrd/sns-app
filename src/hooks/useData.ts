import useSWR from 'swr';
import { ZodType } from 'zod';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useData = <T>(url: string, schema: ZodType<T>) => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
  });

  let parsedData: T | undefined;
  if (data) {
    try {
      parsedData = schema.parse(data.data);
    } catch (e) {
      console.error('Parsing error', e);
    }
  }

  return {
    data: parsedData,
    error,
    isLoading,
  };
};

export default useData;
