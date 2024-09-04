'use client';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPage from '@/components/question/QuestionPage';
import useData from '@/hooks/useData';
import { QuestionSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

const Bookmarks = () => {
  const { mutate } = useSWRConfig();
  const { userId: currentClerkId } = useAuth();
  const { data: questions, error, isLoading } = useData(`/api/question`, z.array(QuestionSchema));

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions || !currentClerkId) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  }

  const filteredQuestions = questions.filter((question) =>
    question.likes.some((like) => like.user.clerkId === currentClerkId),
  );

  return (
    <QuestionPage
      questions={filteredQuestions}
      currentClerkId={currentClerkId}
      title={'ブックマークした質問'}
      target={null}
    />
  );
};

export default Bookmarks;
