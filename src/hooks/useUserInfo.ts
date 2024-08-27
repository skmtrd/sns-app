import useSWR from 'swr';
import { ZodError, ZodType } from 'zod';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useUserInfo = <T>(clerkId: any, schema: ZodType<T>) => {
  const { data, error, isLoading } = useSWR(`/api/profile/${clerkId}`, fetcher);

  let parsedData: T | undefined;
  let parseError: Error | undefined;

  console.log('data:', data);

  if (data) {
    try {
      const dataToValidate = data.data !== undefined ? data.data : data;
      parsedData = schema.parse(dataToValidate);
    } catch (e) {
      if (data.data.status === 429) {
        return {
          userInfo: null,
          IsError: { status: 429 },
          isLoading,
        };
      } else if (e instanceof ZodError) {
        console.error('Zod parsing error:', e.errors);
        parseError = new Error(
          `Data validation failed: ${e.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ')}`,
        );
      } else {
        console.error('Unexpected error during parsing:', e);
        parseError = new Error('An unexpected error occurred while parsing the data');
      }
    }
  }

  return {
    userInfo: parsedData,
    isError: error || parseError,
    isLoading,
  };
};

export default useUserInfo;
