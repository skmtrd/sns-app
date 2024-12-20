import { deleteAssignment } from '@/app/actions/delete/delete';
import { useGetAssignment } from '../SWR/useGetAssignment';

export const useDeleteAssignment = async () => {
  const { data: assignments, mutate } = useGetAssignment(true, []);
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
