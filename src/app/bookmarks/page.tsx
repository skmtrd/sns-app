'use client';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPage from '@/components/question/QuestionPage';
import useData from '@/hooks/useData';
import { QuestionSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

const Bookmarks = () => {
  const { mutate } = useSWRConfig();
  const { data: session, status } = useSession();
  const { data: questions, error, isLoading } = useData(`/api/question`, z.array(QuestionSchema));

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions || !session?.user?.id) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  }

  const filteredQuestions = questions.filter((question) =>
    question.likes.some((like) => like.user.id === session?.user?.id),
  );

  return (
    <QuestionPage
      questions={filteredQuestions}
      currentUserId={session?.user?.id}
      title={'ブックマークした質問'}
      target={null}
    />
  );
};

export default Bookmarks;
