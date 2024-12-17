import { deleteQuestion } from '@/lib/deleteRequests';
import { useGetQuestions } from '../SWR/useGetQuestions';

export const useDeleteQuestion = async () => {
  const { data: questions, mutate } = useGetQuestions(true, []);
  const handleDeleteQuestion = async (questionId: string) => {
    if (!questions) return;
    const optimisticData = questions.filter((question) => question.id !== questionId);
    try {
      await mutate(
        async () => {
          await deleteQuestion(questionId);
          return optimisticData;
        },
        {
          optimisticData,
        },
      );
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };
  return handleDeleteQuestion;
};
