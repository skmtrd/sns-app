import { getQuestions } from '@/app/actions/getQuestions';
import { Question } from '@/lib/types';
import useSWR from 'swr';

export const useGetQuestions = (shouldPolling: boolean, initialQuestions: Question[]) => {
  const { data, error, isLoading } = useSWR(shouldPolling ? 'getQuestions' : null, getQuestions, {
    refreshInterval: 10000,
    fallback: initialQuestions,
    revalidateOnFocus: true,
  });
  return { data, error, isLoading };
};
