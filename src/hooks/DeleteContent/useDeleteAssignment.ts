import { getAssignments } from '@/app/actions/getAssignmnets';
import useSWR from 'swr';
import { deleteAssignment } from '../../lib/deleteRequests';

export const useDeleteAssignment = async () => {
  const { data: assignments, mutate } = useSWR('getAssignments', getAssignments);
  const handleDeleteAssignment = async (assignmentId: string) => {
    const optimisticData = assignments?.filter((assignment) => assignment.id !== assignmentId);
    try {
      await mutate(
        async () => {
          await deleteAssignment(assignmentId);
          return optimisticData;
        },
        {
          optimisticData,
        },
      );
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  return handleDeleteAssignment;
};
