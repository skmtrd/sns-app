import { getAssignments } from '@/app/actions/getAssignments';
import { Assignment } from '@/lib/types';
import useSWR from 'swr';

export const useGetAssignment = (shouldPolling: boolean, initialAssignments: Assignment[]) => {
  const { data, error, isLoading } = useSWR(
    shouldPolling ? 'getAssignments' : null,
    getAssignments,
    {
      refreshInterval: 10000,
      fallback: initialAssignments,
      revalidateOnFocus: true,
    },
  );
  return { data, error, isLoading };
};
