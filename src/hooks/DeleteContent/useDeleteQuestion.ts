import { useSWRConfig } from 'swr';
import { deleteQuestion } from '../../lib/deleteRequests';
import { Question } from '../../lib/types';

export const useDeleteQuestion = async (questions: Question[]) => {
  const { mutate } = useSWRConfig();
  const handleDeleteQuestion = async (questionId: string) => {
    const optimisticData = questions.filter((question) => question.id !== questionId);
    try {
      await mutate(
        '/api/question',
        async () => {
          await deleteQuestion(questionId);
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
  return handleDeleteQuestion;
};
