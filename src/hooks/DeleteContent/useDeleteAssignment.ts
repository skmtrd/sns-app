import { useSWRConfig } from 'swr';
import { deleteAssignment } from '../../lib/deleteRequests';
import { Assignment } from '../../lib/types';

export const useDeleteAssignmnet = async (assignments: Assignment[]) => {
  const { mutate } = useSWRConfig();
  const handleDeleteAssignment = async (assignmentId: string) => {
    const optimisticData = assignments.filter((assignment) => assignment.id !== assignmentId);
    try {
      await mutate(
        '/api/assignment',
        async () => {
          await deleteAssignment(assignmentId);
          return optimisticData;
        },
        {
          optimisticData,
          revalidate: false,
          populateCache: true,
          rollbackOnError: true,
        },
      );
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  return handleDeleteAssignment;
};
