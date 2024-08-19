import useSWR from 'swr';

const profileFetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.data);

export const useUserInfo = (clerkId: any) => {
  const { data, error, isLoading } = useSWR(`/api/profile/${clerkId}`, profileFetcher);

  return {
    userInfo: data,
    isLoading,
    isError: error,
  };
};
